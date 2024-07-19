import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
}

class AuthAPI {
    login = (params) => {
        var url = "auth/signin";
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }

    register = (params) => {
        var url = "auth/signup";
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }

    logout = () => {
        var url = "auth/logout";
        return axiosClient.post(url) as Promise<APIResponse>
    }

    checkAuthenticate = () => {
        var url = "auth/checkAuthenticate";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    getAllAccount = () => {
        var url = "auth/getAllUser";
        return axiosClient.get(url) as Promise<APIResponse>;
    }

    updateUserInformation = (params) => {
        var url = "auth/UpdateUserInformation"
        return axiosClient.put(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }

    deleteUser = (params) => {
        var url = "auth"
        return axiosClient.delete(url + `/${params}`) as Promise<APIResponse>;
    }

    updateUserImage = (params) => {
        var url = "auth/UpdateUserImage";
        return axiosClient.put(url, params, { headers: { "Content-Type": "multipart/form-data" } }) as Promise<APIResponse>;
    }
}

const authAPI = new AuthAPI();
export default authAPI;