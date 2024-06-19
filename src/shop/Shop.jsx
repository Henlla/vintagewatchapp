import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

const showResult = "Showing 01-12 of 139 Results";
import Data from "../products.json"
import ProductCards from "./ProductCards";
const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, seproducts] = useState(Data);
  console.log(products)

  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />
      {/*shop page*/}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row fustify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                {/* Layout and title here*/}
                <div className="shop-title d-flex flex-warm justify-content-between">
                  <p>{showResult}</p>
                  <div
                    className={`product-view-more ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                {/*Product cards*/}
                <div>
                    <ProductCards GridList={GridList} products={products}/>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">Right side</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
