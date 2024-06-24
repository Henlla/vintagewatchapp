import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import productAPI from "../api/product/productAPI";

const CustomRating = (props) => {
    const [avgRating, setAvgRating] = useState(0);
    useEffect(() => {
        props.item && getRating()
    }, [props.item])

    const calculateRating = (rating) => {
        const totalStar = rating.filter((item) => item.ratingStar)
            .map((item) => +item.ratingStar)
            .reduce((sum, current) => sum + current);
        setAvgRating(Math.ceil(totalStar / rating.length))
    }

    const getRating = async () => {
        var response = await productAPI.getRating(props.item?.timepieceId);
        if (response.isSuccess) {
            props.ratingCount(response.data.length)
            calculateRating(response.data)
        }
    }
    return (
        <Rating readOnly size="normal" value={avgRating} />
    );
}

export default CustomRating;