import {toast} from "react-hot-toast"
import { setProgress } from "../../slices/loadingBarSlice";
import { apiconnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogaPageData = async(categoryId,dispatch) => {
  // const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try{
        const response = await apiconnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        console.log("CATALOG PAGE DATA API RESPONSE....", response);
        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data error",
            response);

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // toast.error("Any category not found");
    result = error.response?.data;
  }

  // toast.dismiss(toastId);
  dispatch(setProgress(100));
  return result;
}

