import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean,
    message: string,
    data: any,
}

class CategoryAPI {
    getCategory = () => {
        var url = "categories";
        return axiosClient.get(url) as Promise<APIResponse>;

    }
}

const categoryApi = new CategoryAPI()
export default categoryApi