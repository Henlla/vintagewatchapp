import axiosClient from "./axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
    accessToken: string
}

class ProductAPI {
    getAllProductWithPaging = async (params: any) => {
        var url = "timepiece/GetAllProductWithPaging";
        var queryString = new URLSearchParams(params);
        return await axiosClient.get(url + "?" + queryString) as APIResponse;
    }

    getAllProduct = async () => {
        var url = "timepiece/GetAllProduct";
        return await axiosClient.get(url) as APIResponse;
    }
}
const productAPI = new ProductAPI()
export default productAPI