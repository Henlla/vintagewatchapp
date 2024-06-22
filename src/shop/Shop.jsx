import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const showResult = "Showing 01-12 of 139 Results";
import Data from "../products.json";
import ProductCards from "./ProductCards";
import Pagination from "./Paginations";
import productAPI from "../api/product/productAPI";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import categoryApi from "../api/category/categoryAPI";
const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  // paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productPerPage = 9;

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const getProducts = async () => {
    var response = await productAPI.getProduct();
    if (response.isSuccess) {
      setProducts(response.data)
      setData(response.data);
    }
  }

  const getCategory = async () => {
    var response = await categoryApi.getCategory();
    if (response.isSuccess) {
      setCategory(response.data);
    }
  }

  useEffect(() => {
    getCategory()
    getProducts()
  }, [])

  const menuItems = [...new Set(category.map((val) => val.categoryName))];
  const filterItem = (curcat) => {
    let newItem = [];
    if (curcat === "All") {
      newItem = [...data];
    } else {
      newItem = data.filter((item) => {
        return item.category?.some((cate) => cate.category.categoryName === curcat)
      })
    }
    setSelectedCategory(curcat);
    setProducts(newItem);
  }

  // function change page
  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                    className={`product-view-more ${GridList ? "gridActive" : "listActive"
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
                  productPerPage={productPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  menuItems={menuItems}
                  selectedCategory={selectedCategory} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
