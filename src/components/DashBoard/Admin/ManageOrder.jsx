import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Modal, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import productAPI from "../../../api/product/productAPI";
import { useForm } from "react-hook-form";
import ConfirmMessage from "../../ConfirmMessage";
import AlertSnackBar from "../../AlertSnackBar";

const columnsOrder = [
    { id: "orderId", label: "Order Id", hidden: true },
    { id: "index", label: "No", hidden: false },
    { id: "orderDate", label: "Order Date", hidden: false, format: (value) => new Date(value).toLocaleDateString("vi-VN") },
    { id: "firstName", label: "First Name", hidden: false },
    { id: "lastName", label: "Last Name", hidden: false },
    { id: "totalPrice", label: "Total Price", hidden: false, format: (value) => `${new Intl.NumberFormat("vi-VN").format(value)} vnd` },
    { id: "status", label: "Status", hidden: false },
];

const columnsOrderDetail = [
    { id: "orderDetailId", label: "Order Detail Id", hidden: true },
    { id: "index", label: "No", hidden: false },
    { id: "timepieceName", label: "Watch Name", hidden: false },
    { id: "quantity", label: "Quantity", hidden: false },
    { id: "unitPrice", label: "Unit Price", hidden: false, format: (value) => `${new Intl.NumberFormat("vi-VN").format(value)} vnd` },
];

const statusDropBox = [
    { value: "success", display: "Success" },
    { value: "cancled", display: "Cancel" },
]

const style = {
    height: "70%",
    width: "50%",
    top: '50%',
    left: '50%',
    overflow: "scroll",
    overflowX: "hidden",
    position: 'absolute',
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

const ManageOrder = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [modalPage, setModalPage] = useState(0);
    const [modalRowsPerPage, setModalRowsPerPage] = useState(5);
    const [orderData, setOrderData] = useState([]);
    const [orderDetailData, setOrderDetailData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [filterCombox, setFilterCombox] = useState("");

    const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm();
    // modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalButtonName, setModalButtonName] = useState("");
    const [statusValue, setStatusValue] = useState("pending");
    // snackbar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState("success");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    // confirm
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        var response = await productAPI.allOrder();
        setOrderData(response.data);
    }


    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleCloseModal = () => {
        clearErrors();
        reset();
        setModalOpen(false);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeModalPage = (event, newPage) => {
        setModalPage(newPage);
    };

    const handleChangeModalRowsPerPage = (event) => {
        setModalRowsPerPage(+event.target.value);
        setModalPage(0);
    };

    const buttonClick = (event, row) => {
        var buttonName = event.currentTarget.name;
        var { order, orderDetail } = row;
        switch (buttonName) {
            case "view":
                setModalTitle("View Order Detail");
                setModalButtonName("view");
                setStatusValue(order.status);
                setOrderDetailData(orderDetail);
                setModalOpen(true);
                break;
            case "edit":
                setModalTitle("Edit Order Detail");
                setModalButtonName("edit");
                setStatusValue(order.status);
                setOrderDetailData(orderDetail);
                setValue("orderId", order.orderId);
                setValue("orderDetail", orderDetail);
                setModalOpen(true);
                break;
            default:
                break;
        }
    }

    const filterData = () => {
        var data = orderData.filter(ord => ((ord.order.user.firstName.toLowerCase().includes(filterValue.toLowerCase()) || filterValue == "")
            || (ord.order.user.lastName.toLowerCase().includes(filterValue.toLowerCase()) || filterValue == ""))
            && (ord.order.status.toLowerCase() == filterCombox || filterCombox == "All" || filterCombox == "")
        );
        return data;
    }

    const onchangeData = (event) => {
        const { value } = event.target;
        setFilterCombox(value);
    }

    const onSubmit = async (data) => {
        var { orderId, statusDropdown, orderDetail } = data;
        var formData = new FormData();
        formData.append("orderId", orderId);
        formData.append("status", statusDropdown);
        formData.append("orderDetail", orderDetail);
        var response = await productAPI.updateOrderStatus(formData);
        if (response.isSuccess) {
            setSnackBarMessage("Update order status success");
            setSnackBarType("success");
            setOpenSnackBar(true);
            setModalOpen(false);
        } else {
            setSnackBarMessage("Update order status fail");
            setSnackBarType("error");
            setOpenSnackBar(true);
            setModalOpen(false);
        }
        fetchData();
    }

    return <>
        <ConfirmMessage openConfirm={openConfirm} handleCloseConfirm={handleCloseConfirm} confirmValue={confirmValue} deleteFunction={onSubmit} />
        <AlertSnackBar openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} snackBarMessage={snackBarMessage} snackBarType={snackBarType} />
        <Box>
            <TextField fullWidth label="Search..." onChange={(e) => setFilterValue(e.target.value)} size='small' className='mb-2' />
        </Box>
        <Grid container sx={{ mb: 1 }}>
            <Grid item md={3}>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small-label">Select status</InputLabel>
                    <Select
                        className="text-start"
                        labelId="demo-select-small-label"
                        name="status"
                        label="Select status"
                        defaultValue={""}
                        onChange={(event) => onchangeData(event)}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"success"}>Success</MenuItem>
                        <MenuItem value={"cancled"}>Cancled</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 370 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsOrder.map((column) => (
                                <StyledTableCell
                                    hidden={column.hidden}
                                    key={column.id}
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
                        {filterData()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columnsOrder.map((column, index) => {
                                            let value;
                                            let classStyle;
                                            if (column.id == "firstName") {
                                                value = row.order.user.firstName;
                                            }
                                            else if (column.id == "lastName") {
                                                value = row.order.user.lastName;
                                            }
                                            else if (column.id == "status") {
                                                value = row.order.status;
                                                if (value == "pending") {
                                                    classStyle = "text-warning"
                                                } else if (value == "success") {
                                                    classStyle = "text-success"
                                                } else if (value == "cancled") {
                                                    classStyle = "text-danger"
                                                }
                                            }
                                            else if (column.id == "index") {
                                                value = orderData.indexOf(row) + 1;
                                            } else {
                                                value = row.order[column.id];
                                            }
                                            return (
                                                <TableCell
                                                    className={classStyle}
                                                    hidden={column.hidden}
                                                    key={index}
                                                    align={column.align}>
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align='center'>
                                            <Link name={"view"} onClick={(event) => buttonClick(event, row)}>
                                                <Visibility color='primary' className='me-2' />
                                            </Link>
                                            {
                                                (row.order.status != "cancled" && row.order.status != "success") &&
                                                <Link name={"edit"} onClick={(event) => buttonClick(event, row)}>
                                                    <Edit color='secondary' />
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
                count={orderData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <Modal
            open={modalOpen}
            onClose={() => handleCloseModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Typography className='mb-4' id="modal-modal-title" variant="h6" component="h2">{modalTitle}</Typography>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        {
                            modalButtonName == "edit" ?
                                <Box
                                    noValidate
                                    autoComplete="off"
                                    marginBottom={2}
                                >
                                    <TextField
                                        {...register("orderId")}
                                        fullWidth
                                        name="orderId"
                                        hidden={true}
                                    >
                                        <TextField
                                            {...register("orderDetail")}
                                            fullWidth
                                            name="orderDetail"
                                            hidden={true}
                                        ></TextField>
                                        {statusDropBox.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.display}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        {...register("statusDropdown", { required: "Please choose status" })}
                                        error={errors.statusDropdown?.message != null}
                                        helperText={errors.statusDropdown?.message}
                                        select
                                        fullWidth
                                        name="statusDropdown"
                                        label="Select"
                                        defaultValue={""}
                                        onChange={(event) => setStatusValue(event.target.value)}
                                    >
                                        {statusDropBox.map((option, index) => (
                                            <MenuItem key={index} value={option.value}>
                                                {option.display}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                :
                                <Box
                                    sx={{ display: "flex" }}
                                    marginBottom={2}
                                >
                                    <Typography>Status: </Typography>
                                    <Typography className={
                                        (statusValue == "pending" && "text-warning") ||
                                        (statusValue == "success" && "text-success") ||
                                        (statusValue == "cancled" && "text-danger")}
                                        paddingLeft={1}
                                        sx={{ textTransform: "capitalize" }}>
                                        {statusValue}
                                    </Typography>
                                </Box>
                        }
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 370 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columnsOrderDetail.map((column, index) => (
                                                <StyledTableCell
                                                    hidden={column.hidden}
                                                    key={index}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </StyledTableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetailData
                                            .slice(modalPage * modalRowsPerPage, modalPage * modalRowsPerPage + modalRowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        {columnsOrderDetail.map((column, index) => {
                                                            let value;
                                                            if (column.id == "index") {
                                                                value = orderDetailData.indexOf(row) + 1;
                                                            }
                                                            else if (column.id == "timepieceName") {
                                                                value = row.timepiece.timepieceName;
                                                            }
                                                            else {
                                                                value = row[column.id];
                                                            }
                                                            return (
                                                                <TableCell
                                                                    hidden={column.hidden}
                                                                    key={index}
                                                                    align={column.align}>
                                                                    {column.format
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={orderDetailData.length}
                                rowsPerPage={modalRowsPerPage}
                                page={modalPage}
                                onPageChange={handleChangeModalPage}
                                onRowsPerPageChange={handleChangeModalRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                    <Grid item md={12}>
                        <Button type='submit' fullWidth name={modalButtonName} hidden={modalButtonName == "view" && true} variant='contained'>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal >
    </>;
}

export default ManageOrder;