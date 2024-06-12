import axiosClient from "./axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
    accessToken: string
}

class ProductAPI {
    getAllProductWithPaging = (params: any) => {
        var url = "timepiece/GetAllProductWithPaging";
        var queryString = new URLSearchParams(params);
        return axiosClient.get(url + "?" + queryString) as Promise<APIResponse>;
    }

    getAllProduct = () => {
        var url = "timepiece/GetAllProduct";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getProductExceptUser = (params: any) => {
        var url = "timepiece/GetAllProductExeptUser";
        var queryString = new URLSearchParams(params);
        return axiosClient.get(url + "?" + queryString) as Promise<APIResponse>;
    }

    getAllProductExceptUserWithPaging = (tokenData: any, pageData: any) => {
        var url = "timepiece/GetAllProductExceptUserWithPaging"
        var tokenQuery = new URLSearchParams(tokenData);
        var pageQuery = new URLSearchParams(pageData);
        return axiosClient.get(url + "?" + tokenQuery + "&" + pageQuery) as Promise<APIResponse>;

    }

    postTimepiece = (params: any) => {
        var url = "timepiece"
        return axiosClient.post(url, params) as Promise<APIResponse>
    }
}
const productAPI = new ProductAPI()
export default productAPI