import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ColorComboBox from "./ColorCombobox";
import SizeComboBox from "./SizeComboBox";

const CartPage = () => {
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        const storedCartItem = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(storedCartItem)
        setCartItem(storedCartItem)
    }, [])

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity
    }

    // increase quantity 
    const handleIncrease = (item) => {
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

    // changeColor
    const handleChange = (item, event) => {
        console.log(item)
        console.log(event.target)
    }

    // cart subtotal
    const cartSubtotal = cartItem.reduce((total, item) => {
        return total + calculateTotalPrice(item)
    }, 0)

    // order total
    const orderTotal = cartSubtotal

    return (
        <div>
            <PageHeader title={"Shop Cart"} curPage={"CartPage"} />

            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="cat-product">Product</th>
                                        <th className="cat-price">Price</th>
                                        <th className="cat-quantity">Color</th>
                                        <th className="cat-quantity">Quantity</th>
                                        <th className="cat-toprice">Total</th>
                                        <th className="cat-quantity">Size</th>
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
                                                <td className="cat-toprice">
                                                    {
                                                        <NumericFormat className="border border-0" thousandSeparator="," suffix=" vnd" value={calculateTotalPrice(item)} />
                                                    }
                                                </td>
                                                <td className="cat-quantity">
                                                    <SizeComboBox item={item} handleChange={handleChange} />
                                                </td>
                                                <td className="cat-edit">
                                                    <button onClick={handleRemoveItem}>
                                                        <i className="icofont-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;