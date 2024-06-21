import { useState, createContext, useEffect } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser)
            setUser(storedUser)
    })

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData.userId));
        localStorage.setItem("avatar", JSON.stringify(userData.avatar));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user")
        localStorage.removeItem("avatar");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };