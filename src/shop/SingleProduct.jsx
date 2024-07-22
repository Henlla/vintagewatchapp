import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productAPI from "../api/product/productAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import MakeOffer from "./MakeOffer";
import { Box, Grid, InputLabel } from "@mui/material";
import TradeIn from "./TradeIn";
import { NumericFormat } from "react-number-format";

const SingleProduct = () => {
    const [products, setProducts] = useState([]);
    const [offerForm, setOfferForm] = useState(false);
    const [tradeInForm, setTradeInForm] = useState(false);
    const { productId } = useParams();

    useEffect(() => {
        getProduct()
    }, []);


    const getProduct = async () => {
        var response = await productAPI.getOneProduct(productId);
        if (response.isSuccess) {
            setProducts(response.data)
        }
    }

    const onRefresh = () => {
        getProduct();
    }

    const handleClickOffer = () => {
        if (tradeInForm) {
            setTradeInForm(!tradeInForm)
        }
        setOfferForm(!offerForm)
    }

    const handleClickTradeIn = () => {
        if (offerForm) {
            setOfferForm(!offerForm)
        }
        setTradeInForm(!tradeInForm)
    }

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
                                    <Review item={products} onRefresh={onRefresh} id={productId} />
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 col-12">
                            <aside>
                                {/* <Box
                                    sx={{ mb: 1 }}
                                >
                                    <Button
                                        id="makeOffer"
                                        name="makeOffer"
                                        onClick={handleClickOffer}
                                        variant="outlined"
                                        fullWidth>
                                        Make A Deal
                                    </Button>
                                </Box>
                                <MakeOffer isClick={offerForm} />
                                <Box
                                    sx={{ mb: 1 }}
                                >
                                    <Button
                                        id="tradeIn"
                                        name="tradeIn"
                                        onClick={handleClickTradeIn}
                                        variant="outlined"
                                        fullWidth>
                                        Trade in
                                    </Button>
                                </Box>
                                <TradeIn isClick={tradeInForm} /> */}
                                <Box
                                    className={"border border-2 rounded-3 p-2"}
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    <InputLabel className="text-center fw-bold fs-5">Detail</InputLabel>
                                    <Grid
                                        container
                                        spacing={2}>
                                        <Grid item xs={6}>
                                            Movement
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.movement}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Case Material
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.caseMaterial}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Case Diameter
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.caseDiameter}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Case Thickness
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.caseThickness}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Crystal
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.crystal}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Water Resistance
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.waterResistance}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Strap Material
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.strapMaterial}
                                        </Grid>

                                        <Grid item xs={6}>
                                            Strap Size
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.strapWidth}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Style
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.timepiece?.style}
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box
                                    className={"border border-2 rounded-3 p-2"}
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    <InputLabel className="text-center fw-bold fs-5">Evaluation</InputLabel>
                                    <Grid
                                        container
                                        spacing={2}>
                                        <Grid item xs={6}>
                                            Movement
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.movementStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Case Material
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.caseMaterialStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Case Diameter
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.caseDiameterStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Crystal
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.crystalTypeStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Water Resistance
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.waterResistanceStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Strap Material
                                        </Grid>
                                        <Grid item xs={6}>
                                            {products.evaluation?.handsStatus}
                                        </Grid>
                                        <Grid item xs={6}>
                                            Value Estimate
                                        </Grid>
                                        <Grid item xs={6}>
                                            <NumericFormat
                                                suffix=" vnd"
                                                displayType="text"
                                                value={products.evaluation?.valueExtimatedStatus}
                                                thousandSeparator="," />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SingleProduct;