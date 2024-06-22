import React, { useState } from "react";
import authApi from "../../api/authAPI";
import { Alert, Snackbar } from "@mui/material";
function SignUpComponents() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const [message, setMessage] = useState("");

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleClose = () => {
        if (isSuccess)
            setIsSuccess(false)
        else
            setIsFail(false)
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();
        var data = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword
        };
        try {
            var response = await authApi.signUp(data);
            if (response.isSuccess) {
                setIsSuccess(true)
                setMessage(response.message)
            } else {
                setIsFail(true)
                setMessage(response.message)
            }
        } catch (error) {
        }
    };

    return (
        <section className="bg-gray-50 md:h-screen pt-12 dark:bg-gray-900">
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={isFail || isSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    severity={isFail ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                            <div className="flex md:space-x-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input onChange={handleChange} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input onChange={handleChange} type="text" name="lastName" id="lastName" placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onChange={handleChange} type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div> */}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUpComponents;