import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  //console.log(id)
  useEffect(() => {
    fetch("D:/Front-end/pay/advanced-reactjs-ecommerce-website-starter-files/src/products.json").then((res) => res.json()).then((data) => setProduct(data));
  }, []);
  const result = product.filter((p) => p.id === id);
  console.log(result);

  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop / Single Product"} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper className="mySwiper">
                            {
                                result.map((item,i)=>(
                                    <SwiperSlide key={i}>
                                        <div className="single-thumb">
                                            <img src={item.img} alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                          </Swiper>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">Details</div>
                  </div>
                </div>
                <div className="review">Review</div>
              </article>
            </div>

            {/*Right side*/}
            <div className="col-lg-4 col-12">Right Side</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
