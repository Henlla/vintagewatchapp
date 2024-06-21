/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const ProductCards = ({ GridList, products }) => {
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${GridList ? "grid" : "list"
        }`}
    >
      {products.map((product, i) => (
        <div key={i} className="col-lg-4 col-md-6 col-12">
          <div className="product-item">
            {/*product image*/}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.mainImage?.imageUrl} alt="" />
              </div>
              {/*product action links*/}
              <div className="product-action-link">
                <Link to={`/shop/${product.timepiece.timepieceId}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to="/shop/card-page">
                  <i className="icofont-cart-alt"></i>
                </Link>
              </div>
            </div>
            {/* product content*/}
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.timepiece.timepieceId}`}>{product.timepiece.timepieceName}</Link>
              </h5>
              <p className="productRating">
                <Rating />
              </p>
              <h6>
                <NumericFormat className="text-center border border-0" value={product.timepiece.price} thousandSeparator="," suffix=" vnd" />
              </h6>
            </div>
          </div>

          {/* list style */}
          <div className="product-list-item">
            {/*product image*/}
            <div className="product-thumb">
              <div className="pro-thumb">
                <img src={product.mainImage?.imageUrl} alt="" />
              </div>
              {/*product action links*/}
              <div className="product-action-link">
                <Link to={`/shop/${product.timepiece.timepieceId}`}>
                  <i className="icofont-eye"></i>
                </Link>
                <a href="#">
                  <i className="icofont-heart"></i>
                </a>
                <Link to={`/shop/cart-page`}>
                  <i className="icofont-cart-alt"></i>
                </Link>
              </div>
            </div>
            {/* product content*/}
            <div className="product-content">
              <h5>
                <Link to={`shop/${product.timepiece.timepieceId}`}>{product.timepiece.timepieceName}</Link>
              </h5>
              <p className="productRating">
                <Rating />
              </p>
              <h6>
                <NumericFormat value={product.timepiece.price} thousandSeparator="," type="text" suffix=" vnd" />
              </h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
