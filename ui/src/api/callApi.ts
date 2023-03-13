import axios from "axios";
import { METHOD } from "../utils/constants";

const apiUrl = import.meta.env.VITE_API_URL;

export const callApi = async (
  method: METHOD,
  url: string,
  data?: any
): Promise<any> => {
  try {
    return await axios({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      method,
      url: apiUrl + url,
      data,
    });
  } catch (error) {
    return error;
  }
};
