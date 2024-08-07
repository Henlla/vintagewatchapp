import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productAPI from "../api/product/productAPI";

const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";

const categoryList = [
  {
    imgUrl: "src/assets/images/category/01.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Rolex",
  },
  {
    imgUrl: "src/assets/images/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Omega",
  },
  {
    imgUrl: "src/assets/images/category/03.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Patek Philippe",
  },
  {
    imgUrl: "src/assets/images/category/04.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "IWC",
  },
  {
    imgUrl: "src/assets/images/category/05.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Cartier",
  },
  {
    imgUrl: "src/assets/images/category/06.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Vintage",
  },
];

const HomeCategory = () => {

  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, [])

  const getAllCategory = async () => {
    var response = await productAPI.getBrand();
    if (response.isSuccess) {
      setBrandData(response.data);
    }
  }

  const filterData = () => {
    var categoryCurrent = []
    brandData.slice(0, 6).forEach((item, index) => {
      categoryCurrent.push({
        imgUrl: `src/assets/images/category/0${index + 1}.jpg`,
        imgAlt: `${item.brandName}`,
        iconName: "icofont-brand-windows",
        title: `${item.brandName}`,
      })
    });
    return categoryCurrent;
  }

  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        {/*section header*/}
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        {/* section card*/}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {
              filterData().slice(0, 6).map((val, i) => (
                <div key={i} className="col">
                  <Link to="/shop" className="category-item">
                    <div className="category-inner">
                      {/* image thumbnail */}
                      <div className="category-thumb">
                        <img src={val.imgUrl} alt="" />
                      </div>

                      {/* content */}
                      <div className="category-content">
                        <div className="cate-icon">
                          <i className={val.iconName}></i>
                        </div>
                        <h6>{val.title}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="lab-btn"><span>{btnText}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
