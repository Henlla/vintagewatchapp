import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

const showResult = "Showing 01-12 of 139 Results";
import Data from "D:/Front-end/pay/advanced-reactjs-ecommerce-website-starter-files/src/products.json";
import ProductCards from "./ProductCards";
import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setproducts] = useState(Data);
  //console.log(products);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // function to chang the current page
  const paginate = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  //filter products based on category
  const[selectedCategory, setSelectedCategory] = useState("All");
  const menuItems = [...new Set(Data.map((val)=>val.category))];
  const filterItem = (curcat)=>{
    const newItem = Data.filter((newVal)=>{
      return newVal.category === curcat;
    })
    setSelectedCategory(curcat);
    setproducts(newItem);
  }

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
                  <ProductCards GridList={GridList} products={currentProducts} />
                </div>

                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList}/>
                <ShopCategory
                filterItem={filterItem}
                setItem={setproducts}
                menuItems={menuItems}
                setProducts={setproducts}
                selectedCategory={selectedCategory}/>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
