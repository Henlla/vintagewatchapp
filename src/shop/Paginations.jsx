import { Stack, Pagination } from "@mui/material";
import { useState } from "react";

const Paginations = ({ productPerPage, totalProducts, paginate, activePage }) => {
    const totalPage = Math.ceil(totalProducts / productPerPage);
    return (
        <Stack spacing={2}>
            <Pagination className="d-flex justify-content-center" color="primary" size="large" count={totalPage} page={activePage} onChange={paginate} />
        </Stack>
    );
};

export default Paginations;
