import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthenticateRoute = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
    useEffect(() => {
        setToken(localStorage.getItem("access_token"))
    }, [])
    return token ? children : <Navigate to={"/signin"} />;
}

export default AuthenticateRoute;