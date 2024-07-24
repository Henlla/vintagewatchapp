import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import productAPI from "../api/product/productAPI";
import { useAuth } from "../utilis/AuthProvider";
import AlertSnackBar from "../components/AlertSnackBar";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const columns = [
    { key: "userId", label: "User Id", grid: 6, hidden: true, multiline: false, rows: 1 },
    { key: "firstName", label: "First Name", grid: 6, hidden: false, multiline: false, rows: 1, validate: { required: "Please enter first name" } },
    { key: "lastName", label: "Last Name", grid: 6, hidden: false, multiline: false, rows: 1, validate: { required: "Please enter last name" } },
    { key: "email", label: "Email", grid: 6, hidden: false, multiline: false, rows: 1, validate: { required: "Please enter email" } },
    { key: "phoneNumber", label: "Phone Number", grid: 6, hidden: false, multiline: false, rows: 1, validate: { required: "Please enter phone number" } },
    { key: "address", label: "Address", grid: 12, hidden: false, multiline: true, rows: 3, validate: { required: "Please enter address" } },
    { key: "description", label: "Order Description", grid: 12, hidden: false, multiline: true, rows: 3, validate: { required: "Please enter description" } },
]

const CheckoutPage = () => {
    const { user } = useAuth();
    const { timepieceId } = useParams();
    const [product, setProduct] = useState(null);
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, reset } = useForm();
    const { paymentInfomation, setPaymentInformation } = useState("");
    // const [checked, setChecked] = useState(false);
    // snack bar
    const [snackBarType, setSnackBarType] = useState("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
        renderInformation();
    }, []);

    const getProductById = async () => {
        var response = await productAPI.getOneProduct(timepieceId);
        if (response.isSuccess) {
            setProduct(response.data);
        }
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const renderInformation = () => {
        setValue("userId", user.userId);
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("phoneNumber", user.phoneNumber);
        setValue("address", user.address);
    }

    const changePaymentMethod = (e) => {
        const { value } = e.target;
        setValue("method", value);
    }

    const onSubmit = async (data) => {
        const { userId, method } = data;
        var formValue = { ...data, userId, timepieceId, method };
        var formData = new FormData();
        formData.append("paymentInformation", JSON.stringify(formValue));
        var response = await productAPI.checkoutProduct(formValue);
        window.location.href = response;
        // if (response.isSuccess) {
        //     setSnackBarMessage("Buy successful");
        //     setSnackBarType("success");
        //     setOpenSnackBar(true);
        // } else if (response.status == 400) {
        //     setSnackBarMessage(response.data.message);
        //     setSnackBarType("error");
        //     setOpenSnackBar(true);
        // }
        // await delay(2000);
        // navigate("/shop", { replace: true });
    }

    return (
        <div>
            <AlertSnackBar openSnackBar={openSnackBar} snackBarType={snackBarType} snackBarMessage={snackBarMessage} handleSnackBarClose={handleSnackBarClose} />
            <PageHeader title={"Checkout Page"} curPage={"Checkout"} />
            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        {/* cart top */}
                        <div className="cart-top">
                            <Grid container spacing={2} sx={{ p: 3 }}>
                                <Grid item md={6}>
                                    <Paper elevation={1} style={{ padding: '20px' }}>
                                        <Typography variant="h6" gutterBottom>
                                            Checkout information
                                        </Typography>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Grid container spacing={2}>
                                                {columns.map((item, index) => (
                                                    !item.hidden &&
                                                    <Grid item xs={12} md={item.grid} key={index}>
                                                        <TextField
                                                            {...register(item.key, item.validate)}
                                                            error={errors[item.key]?.message != null}
                                                            helperText={errors[item.key]?.message}
                                                            name={item.key}
                                                            label={item.label}
                                                            fullWidth
                                                            multiline={item.multiline}
                                                            rows={item.rows}
                                                        />
                                                    </Grid>
                                                ))}
                                                <Grid item textAlign={"end"} xs={12} md={12}>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Continue
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>
                                </Grid>
                                <Grid item md={6}>
                                    <Paper elevation={1} sx={{ p: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={12}>
                                                <Typography variant="h6" gutterBottom>
                                                    Product
                                                </Typography>
                                            </Grid>
                                            <Grid item md={12} display={"flex"} alignItems={"center"} justifyContent={"space-between"} padding={2}>
                                                <Typography width={100} height={100}>
                                                    <img src={product?.mainImage.imageUrl} alt={product?.timepiece.timepieceName} />
                                                </Typography>
                                                <Typography fontWeight={"bolder"}>
                                                    {product?.timepiece.timepieceName}
                                                </Typography>
                                                <Typography fontWeight={"bolder"}>
                                                    {product?.timepiece.brand.brandName}
                                                </Typography>
                                                <Typography fontWeight={"bolder"}>
                                                    <NumericFormat value={product?.timepiece.price} thousandSeparator="," displayType="text" suffix=" vnd" />
                                                </Typography>
                                            </Grid>
                                            <Grid item md={12}>
                                                <Typography variant="h6">
                                                    Checkout Method
                                                </Typography>
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={changePaymentMethod}
                                                        defaultValue={"VNPAY"}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="method"
                                                        {...register("method")}
                                                    >
                                                        {/* <FormControlLabel value="CASH" control={<Radio />} label="Cash" /> */}
                                                        <FormControlLabel value="VNPAY" control={<Radio />} label="VNPAY" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} textAlign={"end"}>
                                                <form onSubmit={handleSubmit(onSubmit)}>

                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>

                        {/* cart bottom */}
                        <div className="cart-bottom">
                            {/* shopping box */}
                            <div className="shipping-box">
                                <div className="row">
                                    <Grid container>
                                        <Grid item md={6}></Grid>
                                        <Grid item md={6}>
                                            <Paper elevation={2} sx={{ p: 2, m: 2 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h4" gutterBottom>
                                                            Totals
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"}>
                                                        <Typography>
                                                            Subtotal
                                                        </Typography>
                                                        <Typography>
                                                            <NumericFormat value={product?.timepiece.price} thousandSeparator="," suffix=" vnd" displayType="text" />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"}>
                                                        <Typography>
                                                            Discount
                                                        </Typography>
                                                        <Typography>
                                                            <NumericFormat value={0} thousandSeparator="," suffix=" vnd" displayType="text" />
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={12} display={"flex"} justifyContent={"space-between"}>
                                                        <Typography>
                                                            Order total
                                                        </Typography>
                                                        <Typography>
                                                            <NumericFormat value={product?.timepiece.price} thousandSeparator="," suffix=" vnd" displayType="text" />
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;