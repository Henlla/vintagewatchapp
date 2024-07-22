import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import productAPI from "../api/product/productAPI";
import { useAuth } from "../utilis/AuthProvider";
import AlertSnackBar from "../components/AlertSnackBar";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const CheckoutPage = () => {
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const { register, handleSubmit, setValue, clearErrors, formState: { errors }, reset } = useForm();
    const [checked, setChecked] = useState(false);
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
        var response = await productAPI.getOneProduct(productId);
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
        setValue("fullName", `${user.firstName} ${user.lastName}`);
        setValue("email", user.email);
        setValue("phoneNumber", user.phoneNumber);
        setValue("address", user.address);
    }

    const handleChange = (e) => {
        var { name, value } = e.target
        setValue(name, value);
    }


    const changePaymentMethod = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        });
        if (value == "card") {
            setChecked(true);
        } else {
            setChecked(false);
            setPaymentInfo({
                ...paymentInfo,
                method: value,
                cardNumber: "",
                cardHolder: "",
                expiredDate: "",
                cvv: "",
                billingAddress: ""
            });
            reset({
                cardNumber: "",
                cardHolder: "",
                expiredDate: "",
                cvv: "",
                billingAddress: ""
            });
        }
    }

    const onSubmit = async () => {
        var formData = new FormData();
        formData.append("timepieceId", productId);
        formData.append("userId", user.userId);
        var response = await productAPI.checkoutProduct(formData);
        if (response.isSuccess) {
            setSnackBarMessage("Buy successful");
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else if (response.status == 400) {
            setSnackBarMessage(response.data.message);
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        await delay(2000);
        navigate("/shop", { replace: true });
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
                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        {...register("fullName", { required: "This is required" })}
                                                        error={errors.fullName?.message != null}
                                                        helperText={errors.fullName?.message}
                                                        id="fullName"
                                                        name="fullName"
                                                        label="Full Name*"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        {...register("phoneNumber", { required: "This is required" })}
                                                        error={errors.phoneNumber?.message != null}
                                                        helperText={errors.phoneNumber?.message}
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        label="Phone Number*"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        {...register("email", { required: "This is required" })}
                                                        error={errors.email?.message != null}
                                                        helperText={errors.email?.message}
                                                        id="email"
                                                        name="email"
                                                        label="Email*"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TextField
                                                        {...register("address", { required: "This is required" })}
                                                        error={errors.address?.message != null}
                                                        helperText={errors.address?.message}
                                                        multiline
                                                        rows={3}
                                                        id="address"
                                                        name="address"
                                                        label="Address*"
                                                        fullWidth
                                                        onChange={handleChange}
                                                    />
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
                                            <Grid item md={12} display={"flex"} justifyContent={"space-between"} marginBottom={2}>
                                                <Typography>
                                                    {product?.timepiece.timepieceName}
                                                </Typography>
                                                <Typography>
                                                    {product?.timepiece.brand.brandName}
                                                </Typography>
                                                <Typography>
                                                    <NumericFormat value={product?.timepiece.price} thousandSeparator="," displayType="text" suffix=" vnd" />
                                                </Typography>
                                            </Grid>
                                            {/* <Grid item md={12}>
                                                <Typography variant="h6">
                                                    Checkout Method
                                                </Typography>
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        onChange={changePaymentMethod}
                                                        defaultValue={"cash"}
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="method"
                                                    >
                                                        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                                        <FormControlLabel value="card" control={<Radio />} label="Card" />
                                                        <FormControlLabel value="momo" control={<Radio />} label="MoMo" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid> */}
                                            {/* <Grid item md={12}>
                                                <Collapse orientation="vertical" in={checked}>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                {...register("cardNumber", { required: paymentInfo.method === "card" })}
                                                                error={errors.cardNumber?.message != null}
                                                                helperText={errors.cardNumber && "This is required"}
                                                                onChange={handleChange}
                                                                id="cardNumber"
                                                                name="cardNumber"
                                                                label="Card Number"
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                {...register("cardHolder", { required: paymentInfo.method === "card" })}
                                                                error={errors.cardHolder?.message != null}
                                                                helperText={errors.cardHolder && "This is required"}
                                                                onChange={handleChange}
                                                                id="cardHolder"
                                                                name="cardHolder"
                                                                label="Card Holder"
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                {...register("expiredDate", { required: paymentInfo.method === "card" })}
                                                                error={errors.expiredDate?.message != null}
                                                                helperText={errors.expiredDate && "This is required"}
                                                                onChange={handleChange}
                                                                id="expiredDate"
                                                                name="expiredDate"
                                                                label="Expired Date"
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            <TextField
                                                                {...register("cvv", { required: paymentInfo.method === "card" })}
                                                                error={errors.cvv?.message != null}
                                                                helperText={errors.cvv && "This is required"}
                                                                onChange={handleChange}
                                                                id="cvv"
                                                                name="cvv"
                                                                label="CVV"
                                                                fullWidth />
                                                        </Grid>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                {...register("billingAddress", { required: paymentInfo.method === "card" })}
                                                                error={errors.billingAddress?.message != null}
                                                                helperText={errors.billingAddress && "This is required"}
                                                                onChange={handleChange}
                                                                id="billingAddress"
                                                                name="billingAddress"
                                                                multiline
                                                                rows={3}
                                                                label="Billing Address"
                                                                fullWidth />
                                                        </Grid>
                                                    </Grid>
                                                </Collapse>
                                            </Grid> */}
                                            <Grid item xs={12} textAlign={"end"}>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <Button type="submit" variant="contained" color="primary">
                                                        Continue
                                                    </Button>
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