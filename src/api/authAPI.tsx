import axiosClient from "./axiosClient";

interface APIResponse {
  isSuccess: boolean;
  message: string;
  data: any;
  accessToken: string
}

class AuthAPI {
  loginByUserName = (params: any) => {
    var url = "auth/signin";
    return axiosClient.post(url, params) as Promise<APIResponse>;
  };

  logOut = () => {
    var url = "auth/logout";
    return axiosClient.post(url) as Promise<APIResponse>;
  };

  loginWithGoogle = () => {
    var url = "auth/signinWithGoogle"
    return axiosClient.get(url) as Promise<APIResponse>;
  }

  signUp = (params: any) => {
    var url = "auth/signup";
    return axiosClient.post(url, params) as Promise<APIResponse>;
  };

  getUserFromToken = (params: any) => {
    var url = "auth/getUserFromToken";
    var queryString = new URLSearchParams(params);
    return axiosClient.get(url + "?" + queryString) as Promise<APIResponse>;
  }

}
const authApi = new AuthAPI();
export default authApi;
