import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import productAPI from "../../api/product/productAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ModalPopup from "../ModalPopup";

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
    const [transactions, setTransaction] = useState([]);
    const { register, handleSubmit, reset, setValue, formState: { errors }, clearErrors } = useForm();

    // Model
    const [modalOpen, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState([]);
    const [modalButtonName, setModalButtonName] = useState("");
    const [modalButton, setModalButton] = useState(false);

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        var response = await productAPI.getAllTransactionOfUser();
        setTransaction(response.data);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handlOpenModal = (event, row) => {
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
                modalColumns.map((item, index) => {
                    setValue(item.key, item.format ? item.format(row[item.key]) : row[item.key]);
                })
                break;
            case "edit":
                break;
            default:
                break;
        }
        setModalData(modalColumns);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }



    const onSubmit = () => {

    }

    return <>
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
                            {transactions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id == "index") {
                                                    value = transactions.indexOf(row) + 1;
                                                } else if (column.id == "status") {
                                                    switch (row.order[column.id]) {
                                                        case "success":
                                                            value = <span style={{ textTransform: "capitalize" }} className="text-success">{row.order[column.id]}</span>
                                                            break;
                                                        case "cancled":
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
                                                <Link name="view" onClick={(event) => handlOpenModal(event, row)}>
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
                    count={transactions.length}
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