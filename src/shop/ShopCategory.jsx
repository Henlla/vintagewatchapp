import React from "react";
const ShopCategory = ({
    onChangeCategory,
    menuItems,
    selectedCategory,
}) => {
    return (
        <>
            <div className="widget-header">
                <h5 className="ms-2"> All Categories</h5>
            </div>
            <div>
                <button onClick={() => onChangeCategory("All")} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""
                    }`}>All</button>
                {menuItems.map((Val, id) => {
                    return (
                        <button
                            className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""
                                }`}
                            key={id}
                            onClick={() => onChangeCategory(Val)}
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