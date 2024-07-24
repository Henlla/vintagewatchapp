import { Box, Button, Typography } from "@mui/material";
import backGroundImage from "../assets/images/401.jpg";

const UnAuthorize = () => {
    return <>
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                textAlign: "center",
                paddingTop: "25vh",
                backgroundImage: `url(${backGroundImage})`,
                backgroundSize: "fill",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Typography variant="h3">401</Typography>
            <Typography variant="h6">You don't have permission to access this page</Typography>
            <Button
                href="/"
                sx={{ mt: 2 }}
                variant={"contained"}>
                <Typography color={"white"}>Go back</Typography>
            </Button>
        </Box>
    </>;
}

export default UnAuthorize;