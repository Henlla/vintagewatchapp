import { Box, FormControl, InputLabel, MenuItem, Rating, Select, TextField } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const ProductDisplay = (props) => {
    const { category, images, mainImage, timepiece } = props.item
    const [quantity, setQuantity] = useState(1);
    const [coupon, setCoupon] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const handleChange = (event) => {
        var data = event.target
        if (data.name == "size") {
            setSize(data.value)
        } else {
            setColor(data.value)
        }
    };

    const handleDecrease = () => {
        if (quantity > 1)
            setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const product = {
            id: timepiece?.timepieceId,
            image: mainImage?.imageUrl,
            name: timepiece?.timepieceName,
            price: timepiece?.price,
            quantity: quantity,
            size: size,
            color: color,
            coupon: coupon
        }
        const existsCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existsProductIndex = existsCart.findIndex((item) => item.id === timepiece?.timepieceId);
        const existsProductSize = existsCart.findIndex((item) => item.size === size);
        const existsProductColor = existsCart.findIndex((item) => item.color === color);

        if (existsProductIndex !== -1 && existsProductSize !== -1 && existsProductColor !== -1) {
            existsCart[existsProductIndex].quantity += quantity;
        } else {
            existsCart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(existsCart));
        // reset form
        setQuantity(1)
        setSize("");
        setColor("");
        setCoupon("")
    }

    return (
        <div>
            <h4>{timepiece?.timepieceName}</h4>
            <p className="d-flex rating">
                <Rating size="normal" />
                <span>2000 review</span>
            </p>
            <h4>
                <NumericFormat className="border border-0 p-0" type="text" value={timepiece?.price}
                    thousandSeparator="," suffix=" vnd" />
            </h4>
            <h6>{timepiece?.user.firstName + " " + timepiece?.user.lastName}</h6>
            <p>{timepiece?.description}</p>
            <form onSubmit={handleSubmit}>
                <FormControl className="select-product" fullWidth size="small">
                    <InputLabel id="size-label">Select Size</InputLabel>
                    <Select
                        labelId="size-label"
                        id="size"
                        name="size"
                        value={size}
                        label="Select Size"
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Select Size</MenuItem>
                        <MenuItem value={36}>36mm</MenuItem>
                        <MenuItem value={38}>38mm</MenuItem>
                        <MenuItem value={42}>42mm</MenuItem>
                        <MenuItem value={44}>44mm</MenuItem>
                        <MenuItem value={46}>46mm</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="select-product" fullWidth size="small">
                    <InputLabel id="color-label">Select Color</InputLabel>
                    <Select
                        labelId="color-label"
                        id="color"
                        name="color"
                        label="Select Color"
                        value={color}
                        onChange={handleChange}
                    >
                        <MenuItem value={""}>Select Color</MenuItem>
                        <MenuItem value={"Yellow"}>Yellow</MenuItem>
                        <MenuItem value={"Red"}>Red</MenuItem>
                        <MenuItem value={"White"}>White</MenuItem>
                        <MenuItem value={"Black"}>Black</MenuItem>
                        <MenuItem value={"Pink"}>Pink</MenuItem>
                    </Select>
                </FormControl>
                <div className="cart-plus-minus">
                    <div className="dec qtybutton" onClick={handleDecrease}>-</div>
                    <input className="cart-plus-minus-box"
                        type="text" name="qtybutton" id="qtybutton"
                        value={quantity}
                        onChange={(e) => { setQuantity(parseInt(e.target.value, 10)) }}
                    />
                    <div className="inc qtybutton" onClick={handleIncrease}>+</div>
                </div>

                <div className="discount-code">
                    <TextField size="small" value={coupon} type="text" label="Enter Discount Code"
                        onChange={(e) => setCoupon(e.target.value)} />
                </div>

                <button type="submit" className="lab-btn">
                    <span>Add to Cart</span>
                </button>

                <Link to={"/cart-page"} className="lab-btn bg-primary">
                    <span>Check out</span>
                </Link>
            </form>
        </div>
    );
}

export default ProductDisplay;