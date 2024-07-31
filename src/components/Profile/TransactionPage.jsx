import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Rating, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import productAPI from "../../api/product/productAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cancel, Visibility } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ConfirmMessage from "../ConfirmMessage";
import AlertSnackBar from "../AlertSnackBar";
import { useAuth } from "../../utilis/AuthProvider";
const style = {
    height: "70%",
    position: 'absolute',
    width: "50%",
    top: '50%',
    left: '50%',
    overflow: "scroll",
    overflowX: "hidden",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

const delay = ms => new Promise(resovle => setTimeout(ms, resovle));

const TransactionPage = () => {
    const { user } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [timeRemining, setTimeRemining] = useState(false);
    const [filterValue, setFilterValue] = useState("all");
    const { register, handleSubmit, reset, setValue, formState: { errors }, clearErrors } = useForm();

    // const [fullName, setFullName] = useState("");
    // const [email, setEmail] = useState("");
    const [ratingValue, setRatingValue] = useState(5);

    // Model
    const [modalOpen, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState([]);

    // Confirm
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");
    const [confirmContent, setConfirmContent] = useState("");

    // Alert
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("");

    // useEffect(() => {
    //     setFullName(`${user.firstName} ${user.lastName}`);
    //     setEmail(`${user.email}`);
    // }, [])

    useEffect(() => {
        fetchOrder();
    }, [filterValue]);

    const fetchOrder = async () => {
        var response = await productAPI.getAllOrderOfUser(filterValue);
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

    const cancelOrder = async (value) => {
        var response = await productAPI.cancelOrder(value);
        if (response.isSuccess) {
            setSnackBarMessage("Cancel order successfull");
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else {
            setSnackBarMessage(response.data.message);
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        setOpenConfirm(false);
        fetchOrder();
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
                var transaction = await getTransactionOfOrder(row["order"].orderId);
                modalColumns.map((item, index) => {
                    setValue(item.key, item.format ? item.format(transaction[item.key]) : transaction[item.key]);
                });
                setModalData(modalColumns);
                setTimeRemining(row.timeRemining);
                setOrderDetails(row.orderDetail);
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
        clearErrors();
        reset();
        setOpenModal(false);
    }

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    }

    const onSubmit = async (data, productId) => {
        const { message } = data;
        if (ratingValue == null) {
            setSnackBarMessage("Please choose rating star");
            setSnackBarType("error");
            setOpenSnackBar(true);
            return;
        }
        var ratingData = {
            ratingStar: ratingValue,
            timepieceId: productId,
            feedbackContent: message
        }
        // console.log(ratingData);
        var formData = new FormData();
        formData.append("ratingString", JSON.stringify(ratingData));
        var response = await productAPI.postRating(formData);
        if (response.isSuccess) {
            setSnackBarMessage(response.message);
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else if (response.status === 401) {
            setSnackBarMessage("Please login before rating");
            setSnackBarType("warning");
            setOpenSnackBar(true);
            await delay(2000);
            navigate('/login', { replace: true });
            return;
        } else {
            setSnackBarMessage(response.data.message);
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        reset();
        setOpenModal(false);
    }

    return <>
        <AlertSnackBar openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} snackBarMessage={snackBarMessage} snackBarType={snackBarType} />
        <ConfirmMessage
            openConfirm={openConfirm}
            handleCloseConfirm={handleCloseConfirm}
            confirmValue={confirmValue}
            deleteFunction={cancelOrder}
            confirmContent={confirmContent}
        />

        <Modal
            open={modalOpen}
            onClose={() => handleCloseModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h5>{modalTitle}</h5>
                <Grid container sx={{ mt: 1 }} spacing={2}>
                    {
                        modalData.map((item, index) => (
                            !item.hidden &&
                            <Grid item xs={12} md={item.column} key={index}>
                                <TextField
                                    name={item.key}
                                    {...register(item.key, item.validation)}
                                    error={errors[item.key]?.message != null}
                                    helperText={errors[item.key]?.message}
                                    fullWidth
                                    label={item.label}
                                    disabled={!item.canEdit}
                                    multiline={item.multiline}
                                    rows={item.rows}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                {
                    !timeRemining && orderDetails.map((item, index) => {
                        return <Box className="mt-4" component={"form"} key={index} onSubmit={handleSubmit((data) => onSubmit(data, item.timepiece.timepieceId))}>
                            <Grid container spacing={2}>
                                <Grid item >
                                    <div className="review-title">
                                        <h5>Review Product</h5>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div className="client-review">
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        name="timepieceName"
                                                        size="small"
                                                        label={"Watch Name"}
                                                        value={item.timepiece.timepieceName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        name="email"
                                                        size="small"
                                                        label={"Seller"}
                                                        value={`${item.timepiece.user.firstName} ${item.timepiece.user.lastName}`}
                                                    />
                                                </Grid>
                                                <Grid display={"flex"} alignItems={"center"} item xs={12} md={4}>
                                                    <Typography>Your rating</Typography>
                                                    <Rating
                                                        name="rating"
                                                        value={ratingValue}
                                                        onChange={(event, newValue) => {
                                                            setRatingValue(newValue);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TextField
                                                        {...register("message", { required: "Please enter message" })}
                                                        error={!!errors.message}
                                                        helperText={errors["message"]?.message}
                                                        multiline
                                                        rows={3}
                                                        fullWidth
                                                        size="small"
                                                        name="message"
                                                        label={"Type Here Message"}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={12}>
                                    <Button type='submit' fullWidth variant='contained'>Send Review</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    })
                }
            </Box>
        </Modal >
        <FormControl fullWidth >
            <InputLabel id="demo-select-small-label">Select Status</InputLabel>
            <Select
                className="text-start mb-2"
                labelId="demo-select-small-label"
                label="Select Status"
                defaultValue={""}
                onChange={(event) => setFilterValue(event.target.value)}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="fail">Fail</MenuItem>
                <MenuItem value="canceled">Canceled</MenuItem>
            </Select>
        </FormControl>
        {/* <TextField label="Search..." onChange={(event) => setFilterValue(event.target.value)} fullWidth sx={{ mb: 2 }} /> */}
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
                                                        case "canceled":
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
                                                {
                                                    (row.order["status"] == "success" || row.order["status"] != "success")
                                                    &&
                                                    <Link name="view" onClick={(event) => row.order["status"] == "success" && iconClick(event, row)}>
                                                        <Visibility className="me-2" color={`${row.order["status"] != "success" && "disabled" || "primary"}`} />
                                                    </Link>
                                                }
                                                {
                                                    (row.order["status"] == "success"
                                                        && row.transaction != null
                                                        && row.refundTransaction == null
                                                        && row.timeRemining)
                                                    &&
                                                    <Link name="cancel" onClick={(event) => iconClick(event, row)}>
                                                        <Cancel color='error' />
                                                    </Link>
                                                }
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
        </Box >
    </>;
}

export default TransactionPage;