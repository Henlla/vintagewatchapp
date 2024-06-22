import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
}

class ProductAPI {
    getProduct = () => {
        var url = "timepiece/GetAllProduct";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getOneProduct = (params) => {
        var url = "timepiece/GetProductById";
        return axiosClient.get(url + `/${params}`) as Promise<APIResponse>;
    }

    getRating = (params) => {
        var url = "rating";
        return axiosClient.get(url + `/${params}`) as Promise<APIResponse>;
    }
    uploadImage = (params) => {
        var url = "timepiece/uploadTimepiece";
        return axiosClient.post(url, params,{headers:{"Content-Type":"multipart/form-data"}}) as Promise<APIResponse>;
    }
}

const productAPI = new ProductAPI();
export default productAPI;