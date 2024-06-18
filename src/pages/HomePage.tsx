import { useEffect, useState } from "react";
import HeaderProductComponents from "../components/HeaderProductComponents";
import FooterComponents from "../components/FooterComponents";
import NavbarComponents from "../components/NavbarComponents";
import ScrollToTop from "../components/ScrollToTopComponents";
import CaroselComponent from "../components/CaroselComponent";
import HeaderVideo from "../components/HeaderVideo";

const HomePage = () => {
    const [token, setToken] = useState("")

    useEffect(() => {
        var tokenAccess = localStorage.getItem("access_token")
        if (tokenAccess) {
            setToken(tokenAccess)
        }
    })
    return <>
    <NavbarComponents/>
    
{/* <HeaderVideo/> */}
        <HeaderProductComponents />
        <HeaderProductComponents />
         <CaroselComponent/>
        <HeaderVideo/>
        <ScrollToTop/>
        <FooterComponents/>
        
    </>;
}

export default HomePage;