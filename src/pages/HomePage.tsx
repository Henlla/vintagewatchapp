import {useState } from "react";
import HeaderProductComponents from "../components/Layouts/HeaderProductComponents";

const HomePage = () => {
    const [token, setToken] = useState(localStorage.getItem("access_token"))

    return <>
        <HeaderProductComponents />
        <HeaderProductComponents />
        <HeaderProductComponents />
    </>;
}

export default HomePage;