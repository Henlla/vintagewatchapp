import { useState, createContext, useEffect, useContext } from "react"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const existsCart = JSON.parse(localStorage.getItem("cart")) || [];
    // const [cartCount, setCartCount] = useState(existsCart.length)
    const [isAuthenticate, setAuthenticate] = useState(localStorage.getItem("isAuthenticate") || false);
    // const location = useLocation();
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user")
    //     if (storedUser)
    //         setUser(storedUser)
    // }, [])

    // const setItemInCart = () => {
    //     const existsCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     setCartCount(existsCart.length)
    // }

    // const addToCard = (product) => {
    //     const existsCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     const existsProductIndex = existsCart.findIndex((item) => item.id === product.id);
    //     const existsProductSize = existsCart.findIndex((item) => item.size == product.size);
    //     const existsProductColor = existsCart.findIndex((item) => item.color == product.color);

    //     if (existsProductIndex !== -1 && existsProductSize !== -1 && existsProductColor !== -1) {
    //         if (existsCart[existsProductIndex].quantity >= 5)
    //             return;
    //         existsCart[existsProductIndex].quantity += 1;
    //     } else {
    //         existsCart.push(product);
    //     }
    //     localStorage.setItem("cart", JSON.stringify(existsCart));
    //     setItemInCart()
    // }

    useEffect(() => {
        checkAuthenticate();
    }, [])

    const checkAuthenticate = (value) => {
        if (value) {
            setAuthenticate(value || false)
            localStorage.setItem("isAuthenticate", value || false)
        }
    }

    const saveLoggedUserData = (isLogged, avatar) => {
        localStorage.setItem("avatar", JSON.stringify(avatar));
        localStorage.setItem("isAuthenticate", isLogged);
        setAuthenticate(isLogged);
    };

    const logout = () => {
        // setUser(null);
        setAuthenticate(false)
        // localStorage.removeItem("cart");
        localStorage.removeItem("isAuthenticate");
        localStorage.removeItem("avatar");
    };

    return (
        <AuthContext.Provider value={{ saveLoggedUserData, logout, checkAuthenticate, isAuthenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };