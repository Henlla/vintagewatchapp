import { Stack, Pagination } from "@mui/material";

const Paginations = ({totalPages, paginate, activePage }) => {
    return (
        <Stack spacing={2}>
            <Pagination className="d-flex justify-content-center" color="primary" size="large" count={totalPages} page={activePage} onChange={paginate} />
        </Stack>
    );
};

export default Paginations;
