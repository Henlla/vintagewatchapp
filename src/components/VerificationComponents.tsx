import { useState } from "react";
import authApi from "../api/authAPI";



function VerificationComponents() {
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
                          Enter Your Code
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <div className="flex gap-8 max-w-lg mx-auto justify-center font-[sans-serif]">
      <input type="text" placeholder="0" className="w-12 h-10 flex items-center text-center  text-black text-base border-b-2 border-gray-300 focus:border-[#007bff] outline-none" />
      <input type="text" placeholder="0" className="w-12 h-10 flex items-center text-center  text-black text-base border-b-2 border-gray-300 focus:border-[#007bff] outline-none" />
      <input type="text" placeholder="0" className="w-12 h-10 flex items-center text-center  text-black text-base border-b-2 border-gray-300 focus:border-[#007bff] outline-none" />
      <input type="text" placeholder="0" className="w-12 h-10 flex items-center text-center  text-black text-base border-b-2 border-gray-300 focus:border-[#007bff] outline-none" />
    </div>
                            </div>
                           
                            
                            <button type="submit" onClick={handleOnSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Change Password</button>
                            
                              
                           
                        </form>
                    </div>
                </div>
            </div>
        </section>
       
    );
}

export default VerificationComponents;



