import React, { useEffect, useState } from "react";
import productAPI from "../api/product/productAPI";
const ShopCategory = ({
    filterItem,
    menuItems,
    setProducts,
    selectedCategory,
}) => {
    const [products, setproducts] = useState([]);

    const getProducts = async () => {
        var response = await productAPI.getProduct();
        if (response.isSuccess) {
            setproducts(response.data)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className="widget-header">
                <h5 className="ms-2"> All Categories</h5>
            </div>
            <div>
                <button onClick={() => setProducts(products)} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""
                    }`}>All</button>
                {menuItems.map((Val, id) => {
                    return (
                        <button
                            className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""
                                }`}
                            key={id}
                            onClick={() => filterItem(Val)}
                        >
                            {Val}
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default ShopCategory;