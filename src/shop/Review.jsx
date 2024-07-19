import { useEffect, useState } from "react";
import productAPI from "../api/product/productAPI";
import { Box, Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import AlertSnackBar from "../components/AlertSnackBar"
import authAPI from "../api/auth/authAPI"
import { useLocation, useNavigate } from "react-router-dom";

const reviewTitle = "Add review"

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const Review = (props) => {
    const product = props.item;
    const productId = props.id;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [ratings, setRatings] = useState([]);
    const [reviewShow, setReviewShow] = useState(false);
    const [ratingValue, setRatingValue] = useState(5);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState("success");
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const { register, setValue, reset, clearErrors, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getRating();
        getUser();
    }, []);

    const getRating = async () => {
        var response = await productAPI.getRating(productId);
        if (response.isSuccess) {
            setRatings(response.data);
        }
    }

    const getUser = async () => {
        var response = await authAPI.checkAuthenticate();
        if (response.isSuccess) {
            const name = `${response.data.firstName} ${response.data.lastName}`;
            setFullName(name);
            setEmail(response.data.email);
        } else {
            setFullName("");
            setEmail("");
        }
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const onReview = async (data) => {
        if (ratingValue == null) {
            setSnackBarMessage("Please choose rating star");
            setSnackBarType("error");
            setOpenSnackBar(true);
            return;
        }
        var ratingData = {
            ratingStar: ratingValue,
            timepieceId: productId,
            feedbackContent: data.message
        }
        var formData = new FormData();
        formData.append("ratingString", JSON.stringify(ratingData));
        var response = await productAPI.postRating(formData);
        if (response.isSuccess) {
            setSnackBarMessage(response.message);
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else if (response.status === 401) {
            setSnackBarMessage("Please login before rating");
            setSnackBarType("warning");
            setOpenSnackBar(true);
            await delay(2000);
            navigate('/login', { replace: true });
            return;
        } else {
            setSnackBarMessage(response.data.message);
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        getRating();
        props.onRefresh();
    }


    return (
        <>
            <AlertSnackBar openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} snackBarMessage={snackBarMessage} snackBarType={snackBarType} />
            <ul
                className={`review-nav lab-ui ${reviewShow ? "RevActive" : "DescActive"
                    }`}
            >
                <li onClick={() => setReviewShow(!reviewShow)} className="desc">
                    Description
                </li>
                <li onClick={() => setReviewShow(!reviewShow)} className="rev">
                    Reviews ({ratings.length})
                </li>
            </ul>

            {/* desc content */}
            <div
                className={`review-content ${reviewShow ? "review-content-show" : "description-show"
                    }`}
            >
                <div className="review-showing">
                    <ul className="content lab-ui">
                        {ratings?.map((review, index) => (
                            <li key={index}>
                                <div className="post-thumb">
                                    <img src={review.user.avatar} alt="" />
                                </div>
                                <div className="post-content">
                                    <div className="entry-meta">
                                        <div className="posted-on">
                                            <a>{review.user.firstName + " " + review.user.lastName}</a>
                                            <Typography>{new Date(review.ratingDate).toLocaleDateString('vi-VN')}</Typography>
                                        </div>
                                    </div>
                                    <div className="entry-content">
                                        <p>{review.feedbackContent}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="client-review">
                        <div>
                            <div className="review-title">
                                <h5>{reviewTitle}</h5>
                            </div>
                            <Box component={"form"} onSubmit={handleSubmit(onReview)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            name="fullName"
                                            size="small"
                                            label={"Full Name*"}
                                            value={fullName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            name="email"
                                            size="small"
                                            label={"Email*"}
                                            value={email}
                                        />
                                    </Grid>
                                    <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
                                        <Typography>Your rating</Typography>
                                        <Rating
                                            name="rating"
                                            value={ratingValue}
                                            onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            {...register("message", { required: "This is required" })}
                                            error={errors["message"]?.message != null}
                                            helperText={errors["message"]?.message}
                                            multiline
                                            rows={7}
                                            fullWidth
                                            size="small"
                                            name="message"
                                            label={"Type Here Message"}
                                        />
                                    </Grid>
                                    <Grid display={"flex"} justifyContent={"flex-end"} item md={12} xs={12}>
                                        <Button type="submit" variant="contained">Submit Review</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </div>
                {/* description */}
                <div className="description">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
                        dolorum aliquam aliquid veniam, harum distinctio blanditiis
                        voluptatum quaerat assumenda nostrum, ab repellat provident quo
                        culpa optio iste voluptates minus labore magni aut sit? Laboriosam
                        a iste, nobis voluptatem recusandae animi eveniet est unde
                        adipisci architecto, eos voluptates tempora iusto mollitia.
                    </p>
                    <div className="post-item">
                        <div className="post-thumb">
                            <img src={product.mainImage?.imageUrl} alt={product.timepiece?.timepieceName} />
                        </div>
                        <div className="post-content">
                            <ul className="list-group">
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                                <li className="list-group-item border border-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, dignissimos!</li>
                            </ul>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
                        dolorum aliquam aliquid veniam, harum distinctio blanditiis
                        voluptatum quaerat assumenda nostrum, ab repellat provident quo
                        culpa optio iste voluptates minus labore magni aut sit? Laboriosam
                        a iste, nobis voluptatem recusandae animi eveniet est unde
                        adipisci architecto, eos voluptates tempora iusto mollitia.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Review;