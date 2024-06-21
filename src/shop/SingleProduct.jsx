import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productAPI from "../api/product/productAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";

const SingleProduct = () => {
    const [products, setProducts] = useState([]);
    const { productId } = useParams();

    const getProduct = async () => {
        var response = await productAPI.getOneProduct(productId);
        if (response.isSuccess) {
            setProducts(response.data)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (<>
        <div>
            <PageHeader title={"SINGLE PRODUCT"} curPage="Shop / Single Product" />
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
                                                    <Swiper
                                                        spaceBetween={30}
                                                        slidesPerView={1}
                                                        loop="true"
                                                        autoplay={{
                                                            delay: 2000,
                                                            disableOnInteraction: false
                                                        }}
                                                        modules={[Autoplay]}
                                                        navigation={{
                                                            prevE1: ".pro-single-prev",
                                                            nextE1: ".pro-single-next"
                                                        }}
                                                        className="mySwiper">
                                                        {
                                                            products && products.images?.map((item, index) => (
                                                                <SwiperSlide key={index}>
                                                                    <div className="single-thumb">
                                                                        <img src={item.imageUrl} alt={item.timepiece.timepieceName} />
                                                                    </div>
                                                                </SwiperSlide>
                                                            ))
                                                        }
                                                    </Swiper>
                                                    {/* <div className="pro-single-prev">
                                                        <i className="icofont-rounded-right"></i>
                                                    </div>
                                                    <div className="pro-single-next">
                                                        <i className="icofont-rounded-left"></i>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="post-content">
                                                <div>
                                                    <ProductDisplay item={products} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="review">
                                    <Review item={products} id={productId} />
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 col-12">
                            <aside className="ps-lg-4">
                                right side
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SingleProduct;