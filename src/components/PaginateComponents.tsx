import { Pagination, Stack } from "@mui/material";

type ProductType = {
    numbersPage: any,
    changePage: any,
    currentPage: any,
}

const PaginateComponents = ({ numbersPage, changePage, currentPage }: ProductType) => {
    return <>
        <Stack spacing={2}>
            <Pagination className="pt-10 flex justify-center" count={numbersPage} size="large" page={currentPage} onChange={changePage} color="primary" />
        </Stack>
    </>;
}

export default PaginateComponents;