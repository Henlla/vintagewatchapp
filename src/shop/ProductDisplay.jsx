import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import CustomRating from "../components/CustomRating";
import { useAuth } from "../utilis/AuthProvider";

const ProductDisplay = (props) => {
    const { addItemToCart } = useAuth();
    const { category, images, mainImage, timepiece } = props.item;
    const [ratingCount, setRatingCount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [coupon, setCoupon] = useState("");
    const [size, setSize] = useState(36);
    const [color, setColor] = useState("Yellow");

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
        if (quantity >= 5)
            return;
        setQuantity(quantity + 1)
    }

    const addCart = () => {
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
        addItemToCart(product);

        // reset form
        setQuantity(1);
        setSize(36);
        setColor("Yellow");
        setCoupon("")
    }

    return (
        <div>
            <h4>{timepiece?.timepieceName}</h4>
            <p className="d-flex rating">
                <CustomRating ratingCount={setRatingCount} item={timepiece} />
                <span className="ms-2">{ratingCount} review</span>
            </p>
            <h4>
                <NumericFormat readOnly className="border border-0 p-0" type="text" value={timepiece?.price}
                    thousandSeparator="," suffix=" vnd" />
            </h4>
            <h6>{timepiece?.user.firstName + " " + timepiece?.user.lastName}</h6>
            <p>{timepiece?.description}</p>
            {/* <form> */}
                {/* <FormControl className="select-product" fullWidth size="small">
                    <InputLabel id="size-label">Select Size</InputLabel>
                    <Select
                        labelId="size-label"
                        id="size"
                        name="size"
                        value={size}
                        label="Select Size"
                        onChange={handleChange}
                    >
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
                        <MenuItem value={"Yellow"}>Yellow</MenuItem>
                        <MenuItem value={"Red"}>Red</MenuItem>
                        <MenuItem value={"White"}>White</MenuItem>
                        <MenuItem value={"Black"}>Black</MenuItem>
                        <MenuItem value={"Pink"}>Pink</MenuItem>
                    </Select>
                </FormControl>
                <div className="cart-plus-minus">
                    <div className="dec qtybutton" onClick={handleDecrease}>-</div>
                    <input
                        readOnly
                        className="cart-plus-minus-box"
                        type="text"
                        name="qtybutton"
                        id="qtybutton"
                        value={quantity}
                        onChange={(e) => { setQuantity(parseInt(e.target.value, 10)) }}
                    />
                    <div className="inc qtybutton" onClick={handleIncrease}>+</div>
                </div>

                <div className="discount-code">
                    <TextField size="small" value={coupon} type="text" label="Enter Discount Code"
                        onChange={(e) => setCoupon(e.target.value)} />
                </div>

                <a onClick={() => addCart()} className="lab-btn">
                    <span>Add to Cart</span>
                </a> */}

                <Link to={`/check-out/${timepiece?.timepieceId}`} className="lab-btn bg-primary">
                    <span>Check out</span>
                </Link>
            {/* </form> */}
        </div>
    );
}

export default ProductDisplay;