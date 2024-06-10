import axiosClient from "./axiosClient";

interface APIResponse {
  isSuccess: boolean;
  message: string;
  data: any;
  accessToken: string
}

class AuthAPI {
  loginByUserName = (params: any) => {
    const url = "auth/signin";
    return axiosClient.post(url, params) as Promise<APIResponse>;
  };

  logOut = () => {
    const url = "auth/logout";
    return axiosClient.post(url) as Promise<APIResponse>;
  };

  loginWithGoogle = () => {
    const url = "auth/signinWithGoogle"
    return axiosClient.get(url) as Promise<APIResponse>;
  }

  signUp = (params: any) => {
    const url = "auth/signup";
    return axiosClient.post(url, params) as Promise<APIResponse>;
  };

  getUserFromToken = (params: any) => {
    const url = "auth/getUserFromToken";
    return axiosClient.post(url, params) as Promise<APIResponse>;
  }

}
const authApi = new AuthAPI();
export default authApi;
