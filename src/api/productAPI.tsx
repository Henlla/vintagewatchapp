import axiosClient from "./axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
    accessToken: string
}

class ProductAPI {
    getAllProduct = async () => {
        var url = "timepiece";
        return await axiosClient.get(url) as APIResponse;
    }
}
const productAPI = new ProductAPI()
export default productAPI