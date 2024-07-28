import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean,
    message: string,
    data: any,
    totalCount: any,
    currentPage: any,
    totalPages: any,
    pageSize: any,
}

class CategoryAPI {
    createNewCategory = (params) => {
        var url = "/categories"
        return axiosClient.post(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>
    }

    deleteCategory = (params) => {
        var url = "/categories";
        return axiosClient.delete(url + `/${params}`) as Promise<APIResponse>
    }

    getCategory = () => {
        var url = "categories";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getCategoryByName = (params) => {
        var url = "/categories/GetCategoryByName"
        return axiosClient.get(url + `/${params}`) as Promise<APIResponse>;
    }
}

const categoryApi = new CategoryAPI()
export default categoryApi