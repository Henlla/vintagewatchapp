import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import ColorComboBox from "./ColorCombobox";
import SizeComboBox from "./SizeComboBox";
import { Box, Button, Collapse, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import productAPI from "../api/product/productAPI";

const CartPage = () => {
    const [product, setProduct] = useState(null);
    const [cartItem, setCartItem] = useState([]);
    const { productId } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [checked, setChecked] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        method: "",
        cardNumber: "",
        cardHolder: "",
        expiredDate: "",
        cvv: "",
        billingAddress: ""
    });

    useEffect(() => {
        getProductById();
        const storedCartItem = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(storedCartItem)
    }, []);

    const getProductById = async () => {
        var response = await productAPI.getOneProduct(productId);
        if (response.isSuccess) {
            setProduct(response.data);
        }
    }

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity
    }

    // increase quantity 
    const handleIncrease = (item) => {
        if (item.quantity >= 5)
            return;
        item.quantity += 1
        setCartItem([...cartItem]);
        localStorage.setItem("cart", JSON.stringify(cartItem));
    }

    // decrease quantity 
    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1
            setCartItem([...cartItem]);
            localStorage.setItem("cart", JSON.stringify(cartItem));
        } else {
            handleRemoveItem(item);
        }
    }

    const handleRemoveItem = (item) => {
        const updatedCart = cartItem.filter((cartItem) => cartItem.id !== item.id || cartItem.size !== item.size || cartItem.color !== item.color);
        setCartItem(updatedCart);
        updateLocalStored(updatedCart)
    }

    const updateLocalStored = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // cart subtotal
    const cartSubtotal = cartItem.reduce((total, item) => {
        return total + calculateTotalPrice(item)
    }, 0)

    // order total
    const orderTotal = cartSubtotal


    const handleChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    }


    const changePaymentMethod = (e) => {
        const method = e.target.value;
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        })
        if (method == "card") {
            setChecked(true);
        } else {
            setChecked(false);
            setPaymentInfo({
                ...paymentInfo,
                method: method,
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

    const onSubmit = () => {
        console.log(paymentInfo);
    }

    return (
        <div>
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
                                                        label="Full Name *"
                                                        fullWidth
                                                        value={paymentInfo.fullName}
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
                                                        label="Phone Number *"
                                                        fullWidth
                                                        value={paymentInfo.phoneNumber}
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
                                                        label="Email *"
                                                        fullWidth
                                                        value={paymentInfo.email}
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
                                                        label="Address *"
                                                        fullWidth
                                                        value={paymentInfo.address}
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
                                            <Grid item md={12}>
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
                                            </Grid>
                                            <Grid item md={12}>
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
                                            </Grid>
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
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th className="cat-product">Product</th>
                                        <th className="cat-price">Price</th>
                                        <th className="cat-quantity">Quantity</th>
                                        <th className="cat-quantity">Color</th>
                                        <th className="cat-quantity">Size</th>
                                        <th className="cat-toprice">Total</th>
                                        <th className="cat-edit">Edit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cartItem.map((item, index) => (
                                            <tr key={index}>
                                                <td className="product-item cat-product">
                                                    <div className="p-thumb">
                                                        <Link to={"/shop"}>
                                                            <img src={item.image} alt={item.name} />
                                                        </Link>
                                                    </div>
                                                    <div className="p-content">
                                                        <Link to={"/shop"}>{item.name}</Link>
                                                    </div>
                                                </td>
                                                <td className="cat-price">
                                                    <NumericFormat suffix=" vnd" className="border border-0" value={item.price} thousandSeparator="," />
                                                </td>
                                                <td className="cat-quantity">
                                                    <div className="cart-plus-minus">
                                                        <div className="dec qtybutton" onClick={() => handleDecrease(item)}>-</div>
                                                        <input readOnly type="text" className="cart-plus-minus-box" value={item.quantity} />
                                                        <div className="inc qtybutton" onClick={() => handleIncrease(item)}>+</div>
                                                    </div>
                                                </td>
                                                <td className="cat-quantity">
                                                    <ColorComboBox item={item} handleChange={handleChange} />
                                                </td>
                                                <td className="cat-quantity">
                                                    <SizeComboBox item={item} handleChange={handleChange} />
                                                </td>
                                                <td className="cat-toprice">
                                                    {
                                                        <NumericFormat className="border border-0" thousandSeparator="," suffix=" vnd" value={calculateTotalPrice(item)} />
                                                    }
                                                </td>
                                                <td className="cat-edit">
                                                    <button onClick={() => handleRemoveItem(item)}>
                                                        <i className="icofont-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table> */}
                        </div>

                        {/* cart bottom */}
                        <div className="cart-bottom">
                            {/* checkout box */}
                            {/* <div className="cart-checkout-box">
                                <form className="coupon">
                                    <input
                                        className="cart-page-input-text"
                                        placeholder="Coupon code ...."
                                        name="coupon"
                                        id="coupon"
                                        type="text" />
                                    <input
                                        value="Apply Coupon"
                                        type="submit" />
                                </form>
                                <form className="cart-checkout">
                                    <input
                                        value="Update Cart"
                                        type="submit" />
                                    <div>
                                        
                                    </div>
                                </form>
                            </div> */}


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

                                    {/* <div className="col-md-6 col-12"></div>
                                    <div className="col-md-6 col-12 my-2">
                                        <h3>Totals</h3>
                                        <ul className="d-flex flex-column lab-ul mx-3 mb-2">
                                            <li className="mb-2">
                                                <span className="float-start">Subtotal</span>
                                                <div className="float-end">
                                                    <NumericFormat
                                                        suffix=" vnd"
                                                        thousandSeparator=","
                                                        className="text-end border border-0 p-0"
                                                        value={cartSubtotal} />
                                                </div>
                                            </li>
                                            <li className="mb-2">
                                                <span className="float-start">Discount</span>
                                                <div className="float-end">
                                                    <NumericFormat
                                                        thousandSeparator=","
                                                        className="text-end border border-0 p-0"
                                                        value={0} />
                                                </div>
                                            </li>
                                            <li className="mb-2">
                                                <span className="float-start">Order Total</span>
                                                <div className="float-end">
                                                    <NumericFormat
                                                        suffix=" vnd"
                                                        thousandSeparator=","
                                                        className="text-end border border-0 p-0"
                                                        value={cartSubtotal} />
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;