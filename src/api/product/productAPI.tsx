import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
    totalCount: any;
    currentPage: any;
    totalPages: any;
    pageSize: any;
}

class ProductAPI {
    //Product
    getProduct = () => {
        var url = "timepiece/GetAllProduct";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getProductByNameAndCategory = (name, category) => {
        var url = "timepiece/GetProductByNameAndCategory";
        return axiosClient.get(url, { params: { name: name, categoryId: category } }) as Promise<APIResponse>;
    }

    getProductWithPaging = (params) => {
        var url = "timepiece/GetPageListProduct";
        return axiosClient.get(url, { params }) as Promise<APIResponse>;
    }

    getProductByCategoryWithPaging = (pagingModel, categoryName) => {
        var url = "timepiece/GetProductByCategory";
        return axiosClient.get(url, { params: { ...pagingModel, categoryName: categoryName } }) as Promise<APIResponse>;
    }

    getOneProduct = (params) => {
        var url = "timepiece/GetProductById";
        return axiosClient.get(url + `/${params}`) as Promise<APIResponse>;
    }

    getProductByName = (params) => {
        var url = "timepiece/GetAllProductByName";
        return axiosClient.get(url, { params }) as Promise<APIResponse>;
    }

    getAllTimepieceNotEvaluate = () => {
        var url = "timepiece/GetAllTimepieceNotEvaluate";
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

    updateTimepiecePrice = (params) => {
        var url = "timepiece/UpdateTimepiecePrice";
        return axiosClient.put(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    deleteTimepiece = (params) => {
        var url = "timepiece/DeleteTimepiece";
        return axiosClient.delete(url + `/${params}`) as Promise<APIResponse>;
    }

    // Rating
    getRating = (params) => {
        var url = "rating";
        return axiosClient.get(url + `/${params}`) as Promise<APIResponse>;
    }

    postRating = (params) => {
        var url = "rating";
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    // Brand

    getBrand = () => {
        var url = "brand";
        return axiosClient.get(url) as Promise<APIResponse>;
    }


    // payment
    checkoutProduct = (params) => {
        var url = "payment/RequestPayment";
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }

    responsePayment = (params) => {
        var url = "payment/callBackPayment";
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }


    // order
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

    // transaction
    getAllTransactionOfUser = () => {
        var url = "transaction/GetTransactionOfUser";
        return axiosClient.get(url) as Promise<APIResponse>;
    }
}

const productAPI = new ProductAPI();
export default productAPI;