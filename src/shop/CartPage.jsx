import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import ColorComboBox from "./ColorCombobox";
import SizeComboBox from "./SizeComboBox";

const CartPage = () => {
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        const storedCartItem = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(storedCartItem)
    }, [])

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity
    }

    // increase quantity 
    const handleIncrease = (item) => {
        if(item.quantity >= 5)
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

    // changeColor
    const handleChange = (e) => {
        console.log(e.target.value)
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
                        {/* cart top */}
                        <div className="cart-top">
                            <table>
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
                            </table>
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
                                    <div className="col-md-6 col-12"></div>
                                    <div className="col-md-6 col-12 my-2">
                                        <h3>Cart totals</h3>
                                        <ul className="d-flex flex-column lab-ul mx-3 mb-2">
                                            <li className="mb-2">
                                                <span className="float-start">Cart Subtotal</span>
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
                                    </div>
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