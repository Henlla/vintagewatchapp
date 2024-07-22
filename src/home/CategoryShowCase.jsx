import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productAPI from "../api/product/productAPI";
import categoryApi from "../api/category/categoryAPI";
import CustomRating from "../components/CustomRating";

const title = "Our Products";

const CategoryShowCase = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("ALL");
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  //category baded filtering 
  const filterItem = () => {
    if (filterValue == 'ALL') {
      return data;
    }
    return data.filter((product) => {
      return product.category?.some(cate => cate.category.categoryName === filterValue)
    });
  }

  const fetchData = async () => {
    var response = await productAPI.getProduct();
    if (response.isSuccess) {
      setData(response.data);
    }
  }

  const fetchCategory = async () => {
    var response = await categoryApi.getCategory();
    if (response.isSuccess) {
      setCategories(response.data);
    }
  }

  return (
    <div className="course-section style-3 padding-tb">
      {/* shapes */}
      <div className="course-shape one">
        <img
          src="https://raw.githubusercontent.com/mdalmamunit427/advanced-reactjs-ecommerce-website-starter-files/main/src/assets/images/shape-img/icon/01.png"
          alt=""
        />
      </div>
      <div className="course-shape two">
        <img
          src="https://raw.githubusercontent.com/mdalmamunit427/advanced-reactjs-ecommerce-website-starter-files/main/src/assets/images/shape-img/icon/02.png"
          alt=""
        />
      </div>

      {/* main section*/}
      <div className="container">
        {/*section header*/}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setFilterValue("ALL")}>All</li>
              {
                categories
                  .sort((a, b) => a.categoryId - b.categoryId)
                  .slice(0, 7).map((item, index) =>
                  (
                    <li key={index} onClick={() => setFilterValue(item.categoryName)}>{item.categoryName}</li>
                  ))
              }
            </ul>
          </div>
        </div>

        {/*section body*/}
        <div className="section-wrapper ">
          <div className="row g-4 justify-content-center row-cols-x1-4 row-cols-lg-3 row-cols-md-2 row-cols-1
          course-filter">
            {
              filterItem().slice(0, 9).map((product) =>
                <div key={product.timepiece.timepieceId} className="col">
                  <div className="course-item style-4">
                    <div className="course-inner">
                      <div className="course-thubm">
                        <img src={product.mainImage?.imageUrl} alt="" />
                        <div className="course-category">
                          <div className="course-cate">
                            <Link href="#">{product.cate}</Link>
                          </div>
                          <div className="course-review ms-2">
                            <CustomRating ratingCount={setRatingValue} item={product.timepiece} />
                          </div>
                        </div>
                      </div>

                      {/* content*/}
                      <div className="course-content">
                        <Link to={`/shop/${product.timepiece.timepieceId}`}><h6>{product.timepiece.timepieceName}</h6></Link>
                        <div className="course-footer">
                          <div className="course-author">
                            <Link to="/" className="ca-name">{product.timepiece.brand.brandName}</Link>
                          </div>
                          <div className="course-price">
                            {product.timepiece.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShowCase;
