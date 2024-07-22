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

    getAllTimepieceNotEvaluate = () => {
        var url = "timepiece/GetAllTimepieceNotEvaluate";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getBrand = () => {
        var url = "brand";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getProductEvaluation = (params) => {
        var url = "timepiece/GetEvaluationTimepiece";
        return axiosClient.get(url, params) as Promise<APIResponse>;
    }

    requestEvaluation = (params) => {
        var url = "timepiece/requestEvaluation"
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    createEvaluation = (params) => {
        var url = "evaluation/";
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    postRating = (params) => {
        var url = "rating";
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    checkoutProduct = (params) => {
        var url = "timepiece/checkout";
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    updateTimepiecePrice = (params) => {
        var url = "timepiece/UpdateTimepiecePrice";
        return axiosClient.put(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    deleteTimepiece = (params) => {
        var url = "timepiece/DeleteTimepiece";
        return axiosClient.delete(url + `/${params}`) as Promise<APIResponse>;
    }

    orderOfUser = () => {
        var url = "order";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    allOrder = () => {
        var url = "order/GetAllOrder";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    updateOrderStatus = (params) => {
        var url = "order/UpdateOrderStatus";
        return axiosClient.put(url, params, { headers: { "Content-Type": "multipart/data" } }) as Promise<APIResponse>;
    }
}

const productAPI = new ProductAPI();
export default productAPI;