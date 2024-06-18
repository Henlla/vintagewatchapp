import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewComponents from "../Product/ReviewComponents";

const ProductBrowserRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/detailDescription" element={<ReviewComponents />} />
                <Route path="/detailReview" element={<ReviewComponents />} />
            </Routes>
        </BrowserRouter>
    );
}

export default ProductBrowserRouter;