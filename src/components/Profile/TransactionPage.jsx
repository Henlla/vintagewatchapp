import { Box, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import productAPI from "../../api/product/productAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cancel, Visibility } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ModalPopup from "../ModalPopup";
import ConfirmMessage from "../ConfirmMessage";

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
    // { id: "totalPrice", label: "Total Price", hidden: false, align: "left", minWidth: 100, format: (value) => `${new Intl.NumberFormat('vi-VN').format(value)} vnd` },
    { id: "status", label: "Status", hidden: false, align: "left", minWidth: 100 },
]

const TransactionPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orders, setOrders] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const { register, handleSubmit, reset, setValue, formState: { errors }, clearErrors } = useForm();

    // Model
    const [modalOpen, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState([]);
    const [modalButtonName, setModalButtonName] = useState("");
    const [modalButton, setModalButton] = useState(false);

    // Confirm
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");
    const [confirmContent, setConfirmContent] = useState("");

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        var response = await productAPI.getAllOrderOfUser();
        setOrders(response.data);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const cancelOrder = (value) => {
        setOpenConfirm(false);
    }

    const getTransactionOfOrder = async (id) => {
        var response = await productAPI.getTransactionOfOrder(id);
        return response.data;
    }

    const iconClick = async (event, row) => {
        var buttonName = event.currentTarget.name;
        let modalColumns = {};
        switch (buttonName) {
            case "view":
                modalColumns = [
                    { key: "transactionId", label: "Transaction Id", hidden: true, canEdit: false, multiline: false, rows: 1, column: 6 },
                    { key: "transactionDate", label: "Transaction Date", hidden: false, canEdit: false, multiline: false, rows: 1, column: 6, format: (value) => new Date(value).toLocaleDateString("vi-VN") },
                    { key: "paymentMethod", label: "Transaction Method", hidden: false, canEdit: false, multiline: false, rows: 1, column: 6 },
                    { key: "bankCode", label: "Bank Code", hidden: false, canEdit: false, multiline: false, rows: 1, column: 6 },
                    { key: "amount", label: "Amount", hidden: false, canEdit: false, multiline: false, rows: 1, column: 6, format: (value) => `${new Intl.NumberFormat('vi-VN').format(value)} vnd` },
                    { key: "transactionStatus", label: "Status", hidden: false, canEdit: false, multiline: false, rows: 1, column: 6 },
                    { key: "description", label: "Description", hidden: false, canEdit: false, multiline: true, rows: 3, column: 12 },
                ]
                setModalTitle("View Transaction");
                setModalButton(true);
                var transaction = await getTransactionOfOrder(row["order"].orderId);
                modalColumns.map((item, index) => {
                    setValue(item.key, item.format ? item.format(transaction[item.key]) : transaction[item.key]);
                });
                setModalData(modalColumns);
                setOpenModal(true);
                break;
            case "edit":
                break;
            case "cancel":
                setConfirmValue(row["order"].orderId);
                setConfirmContent("Are you want cancel this order?");
                setOpenConfirm(true);
                break;
            default:
                break;
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }



    const onSubmit = () => {

    }

    return <>
        <ConfirmMessage
            openConfirm={openConfirm}
            handleCloseConfirm={handleCloseConfirm}
            confirmValue={confirmValue}
            deleteFunction={cancelOrder}
            confirmContent={confirmContent}
        />
        <ModalPopup
            modalOpen={modalOpen}
            modalTitle={modalTitle}
            modalData={modalData}
            modalButtonName={modalButtonName}
            modalButton={modalButton}
            handleCloseModal={handleCloseModal}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register} />
        <TextField label="Search..." onChange={(event) => setFilterValue(event.target.value)} fullWidth sx={{ mb: 2 }} />
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
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id == "index") {
                                                    value = orders.indexOf(row) + 1;
                                                } else if (column.id == "status") {
                                                    switch (row.order[column.id]) {
                                                        case "success":
                                                            value = <span style={{ textTransform: "capitalize" }} className="text-success">{row.order[column.id]}</span>
                                                            break;
                                                        case "cancled":
                                                            value = <span style={{ textTransform: "capitalize" }} className="text-danger">{row.order[column.id]}</span>
                                                            break;
                                                        case "fail":
                                                            value = <span style={{ textTransform: "capitalize" }} className="text-danger">{row.order[column.id]}</span>
                                                            break;
                                                        case "pending":
                                                            value = <span style={{ textTransform: "capitalize" }} className="text-warning">{row.order[column.id]}</span>
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }
                                                else {
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
                                                <Link name="view" onClick={(event) => row.order["status"] == "success" && iconClick(event, row)}>
                                                    <Visibility sx={{ mr: 1 }} color={`${row.order["status"] != "success" && "disabled" || "primary"}`} />
                                                </Link>
                                                {/* {
                                                    row.order["status"] == "success" &&
                                                    <Link name="cancel" onClick={(event) => iconClick(event, row)}>
                                                        <Cancel color='error' />
                                                    </Link>
                                                } */}
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