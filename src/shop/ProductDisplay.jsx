import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import CustomRating from "../components/CustomRating";

const ProductDisplay = (props) => {
    const {timepiece } = props.item;
    const [ratingCount, setRatingCount] = useState(0);

    return (
        <div>
            <h4>{timepiece?.timepieceName}</h4>
            <p className="d-flex rating">
                <CustomRating ratingCount={setRatingCount} item={timepiece} />
                <span className="ms-2">{ratingCount} review</span>
            </p>
            <h4>
                <NumericFormat readOnly className="border border-0 p-0" type="text" value={timepiece?.price}
                    thousandSeparator="," suffix=" vnd" />
            </h4>
            <h6>{timepiece?.user.firstName + " " + timepiece?.user.lastName}</h6>
            <p>{timepiece?.description}</p>
    
                <Link to={`/check-out/${timepiece?.timepieceId}`} className="lab-btn bg-primary">
                    <span>Check out</span>
                </Link>
            {/* </form> */}
        </div>
    );
}

export default ProductDisplay;