import axiosClient from "./axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
    accessToken: string
}

class ProductAPI {
    getAllProduct = () => {
        var url = "timepiece/GetAllProduct";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getProductExceptUser = (params: any) => {
        var url = "timepiece/GetAllProductExeptUser";
        var queryString = new URLSearchParams(params);
        return axiosClient.get(url + "?" + queryString) as Promise<APIResponse>;
    }

    getAllProductWithPaging = (params: any) => {
        var url = "timepiece/GetAllProductWithPaging";
        var queryString = new URLSearchParams(params);
        return axiosClient.get(url + "?" + queryString) as Promise<APIResponse>;
    }

    getAllProductExceptUserWithPaging = (tokenData: any, pageData: any) => {
        var url = "timepiece/GetAllProductExceptUserWithPaging"
        var tokenQuery = new URLSearchParams(tokenData);
        var pageQuery = new URLSearchParams(pageData);
        return axiosClient.get(url + "?" + tokenQuery + "&" + pageQuery) as Promise<APIResponse>;

    }

    postTimepiece = (token: any) => {
        var url = "timepiece/uploadTimepiece"
        var queryString = new URLSearchParams(token);
        return axiosClient.post(url + "?" + queryString) as Promise<APIResponse>
    }
}
const productAPI = new ProductAPI()
export default productAPI