import { useState } from "react";
import authApi from "../api/authAPI";
import { useNavigate } from 'react-router-dom';



function FogotPassWord() {
    const [state, setState] = useState({
        email: "",
       
    });

    const loginByUser = async () => {
        try {
            var data = {
                username: state.email,
               
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

  const navigate = useNavigate();

  const handleOnSubmit = () => {
    navigate('/verifycode'); // Đường dẫn nội bộ trong ứng dụng của bạn
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
                           Reset Your Password
                        </h1>


                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" />
                            </div>
                           
                           
                            <button type="submit" onClick={handleOnSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
                            
                              
                           
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

export default FogotPassWord;



