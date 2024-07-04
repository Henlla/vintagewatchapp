import { useEffect, useState } from "react";
import productAPI from "../api/product/productAPI";
import { Rating, TextField } from "@mui/material";

const reviewTitle = "Add review"

const Review = (props) => {
    const product = props.item;
    const productId = props.id;
    const [ratings, setRatings] = useState([]);
    const [reviewShow, setReviewShow] = useState(false);


    const getRating = async () => {
        var response = await productAPI.getRating(productId);
        if (response.isSuccess) {
            setRatings(response.data)
        }
    }

    useEffect(() => {
        getRating()
    }, [])


    return (
        <>
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
                                            <p>{review.ratingDate}</p>
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
                        <div className="review-form">
                            <div className="review-title">
                                <h5>{reviewTitle}</h5>
                            </div>
                            <form action="" className="row">
                                <div className="col-md-4 col-12">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Full Name *"
                                    />
                                </div>
                                <div className="col-md-4 col-12">
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email *"
                                    />
                                </div>
                                <div className="col-md-4 col-12">
                                    <div className="rating mt-2">
                                        <span className="me-1">Your rating</span>
                                        <Rating />
                                    </div>
                                </div>
                                <div className="col-md-12 col-12">
                                    <textarea
                                        style={{ resize: "none" }}
                                        name="message"
                                        id="message"
                                        rows="8"
                                        placeholder="Type Here Message"
                                    ></textarea>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="default-button">
                                        <span>Submit Review</span>
                                    </button>
                                </div>
                            </form>
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