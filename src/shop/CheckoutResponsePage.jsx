import { useEffect, useState } from "react";
import productAPI from "../api/product/productAPI";
import { Box, Button, Typography } from "@mui/material";
import failIcon from "../assets/images/icon/fail_icon.jpg";
import successIcon from "../assets/images/icon/success_icon.jpg";

const CheckoutResponsePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        callBackPayment();
    }, [])

    const callBackPayment = async () => {
        var queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const params = Object.fromEntries(urlParams.entries());
        var response = await productAPI.responsePayment(params);
        console.log(response);
        if (response.isSuccess) {
            setIcon(successIcon);
            setTitle("Payment success!");
            setContent(response.message);
        } else {
            setIcon(failIcon);
            setTitle("Payment fail!");
            setContent(response.data.message);
        }
    }

    return <>
        <Box
            sx={{
                textAlign: "center",
                padding: "20vh",
                width: "100vw",
                hieght: "100vh",
            }}
        >
            <Typography><img src={icon} alt="" width={"100"} /></Typography>
            <Typography
                marginTop={4}
                fontWeight={"bolder"}
                variant="h3">{title}</Typography>
            <Typography
                marginTop={4}
                variant="h5">{content}</Typography>
            <Button
                href="/shop"
                variant="contained"
                sx={{ mt: 6 }}
            >
                <Typography color={"white"}>Go back to shop</Typography>
            </Button>
        </Box>
    </>
}

export default CheckoutResponsePage;