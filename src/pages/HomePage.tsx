import { useEffect, useState } from "react";
import HeaderProductComponents from "../components/HeaderProductComponents";

const HomePage = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        var tokenAccess = localStorage.getItem("access_token")
        if (tokenAccess) {
            setToken(tokenAccess)
        }
    })
    return <>
        <HeaderProductComponents />
        <HeaderProductComponents />
        <HeaderProductComponents />
    </>;
}

export default HomePage;