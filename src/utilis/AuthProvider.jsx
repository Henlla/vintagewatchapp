import { useState, createContext, useEffect, useContext } from "react"
import authAPI from "../api/auth/authAPI";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [isAuthenticate, setAuthenticate] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        authenticate();
    }, []);


    const authenticate = async () => {
        var response = await authAPI.checkAuthenticate();
        if (response.isSuccess) {
            saveLoggedUserData(response.data, response.isSuccess)
        }
        setLoading(false);
    }


    const saveLoggedUserData = (data, isLogged) => {
        setUser(data)
        setAuthenticate(isLogged);
    };

    const logout = () => {
        setUser(null);
        setAuthenticate(false)
    };

    return (
        <AuthContext.Provider value={{ user, saveLoggedUserData, logout, isAuthenticate, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };