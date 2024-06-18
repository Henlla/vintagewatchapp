import { useState } from "react";
import authApi from "../api/authAPI";

function SignInComponents() {
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const loginByUser = async () => {
        try {
            var data = {
                username: state.email,
                password: state.password,
            };

            var response = await authApi.loginByUserName(data);
            if (response.isSuccess) {
                localStorage.setItem("access_token", response.accessToken)
                window.location.href = "/"
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loginByGoogle = async () => {
        try {
            var response = await authApi.loginWithGoogle();
            console.log(response);
            // localStorage.setItem("access_token", response.accessToken)
            // window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitGoogle = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        loginByGoogle()
        // window.location.href = "http://localhost:5009/auth/signinWithGoogle"
    };

    const handleOnSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        loginByUser();
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div style={{ height: "76vh" }} className="flex flex-col items-center justify-center px-6 py-8 mt-20 lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Vintage Timepiece
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>


                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex justify-end">
                                <a href="/fogotpw" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" onClick={handleOnSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <span className="text-xs text-center text-gray-500 uppercase">or login with google</span>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <button onClick={handleSubmitGoogle} className="flex items-center w-full justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                                <div className="px-4 py-3">
                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#FFC107" />
                                        <path
                                            d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                            fill="#FF3D00" />
                                        <path
                                            d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                            fill="#4CAF50" />
                                        <path
                                            d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                            fill="#1976D2" />
                                    </svg>
                                </div>
                                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
                            </button>
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
       
    );
}

export default SignInComponents;