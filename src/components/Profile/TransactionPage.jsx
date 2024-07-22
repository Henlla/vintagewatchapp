import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import productAPI from "../../api/product/productAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const columns = [
    { id: "orderId", label: "Order Id", hidden: true, align: "left", minWidth: 100 },
    { id: "index", label: "No", hidden: false, align: "left", minWidth: 100 },
    { id: "orderDate", label: "Order Date", hidden: false, align: "left", minWidth: 100, format: (value) => new Date(value).toLocaleDateString("vi-VN") },
    { id: "totalPrice", label: "Total Price", hidden: false, align: "left", minWidth: 100, format: (value) => `${new Intl.NumberFormat('vi-VN').format(value)} vnd` },
]

const TransactionPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orders, setOrders] = useState([]);
    const [filterValue, setFilterValue] = useState([]);

    useEffect(() => {
        getOrderOfUser();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handlOpenModal = (event, row) => {
    }

    const getOrderOfUser = async () => {
        var response = await productAPI.orderOfUser();
        if (response.isSuccess) {
            setOrders(response.data)
            setFilterValue(response.data);
        }
    }

    return <>
        <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 370 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        hidden={column.hidden}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell align='center'>
                                    Action
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterValue
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id == "index") {
                                                    value = filterValue.indexOf(row) + 1;
                                                } else {
                                                    value = row.order[column.id];
                                                }
                                                return (
                                                    <StyledTableCell
                                                        hidden={column.hidden}
                                                        key={column.id}
                                                        align={column.align}>
                                                        {column.format
                                                            ? column.format(value)
                                                            : value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            <TableCell align='center'>
                                                <Link name="view" className="me-2" onClick={(event) => handlOpenModal(event, row)}>
                                                    <Visibility color='primary' />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    </>;
}

export default TransactionPage;