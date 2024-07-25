import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const showResult = "Showing 01-12 of 139 Results";
import ProductCards from "./ProductCards";
import Pagination from "./Paginations";
import productAPI from "../api/product/productAPI";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import categoryApi from "../api/category/categoryAPI";
const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productPerPage = 9;

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    filterItem();
  }, [currentPage,selectedCategory]);

  const getProductWithPaging = async () => {
    var pagingModel = {
      PageNumber: currentPage,
      PageSize: productPerPage
    }
    var response = await productAPI.getProductWithPaging(pagingModel);
    if (response.isSuccess) {
      setProducts(response.data);
      setTotalPages(response.totalPages);
    }
  }

  const getCategory = async () => {
    var response = await categoryApi.getCategory();
    if (response.isSuccess) {
      setCategory(response.data);
    }
  }

  const getProductByCategory = async () => {
    var pagingModel = {
      PageNumber: currentPage,
      PageSize: productPerPage,
    }
    var response = await productAPI.getProductByCategoryWithPaging(pagingModel, selectedCategory);
    setProducts(response.data);
    setTotalPages(response.totalPages);
  }

  const menuItems = [...new Set(category.map((val) => val.categoryName))];

  const filterItem = () => {
    if (selectedCategory === "All") {
      getProductWithPaging();
    } else {
      getProductByCategory();
    }
  }

  const onChangeCategory = (value) => {
    setSelectedCategory(value);
  }

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
                  <ProductCards GridList={GridList} products={products} />
                </div>

                <Pagination
                  totalPages={totalPages}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} />
                <ShopCategory
                  onChangeCategory={onChangeCategory}
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
