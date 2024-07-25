import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import productAPI from "../../api/product/productAPI"
import { Link } from "react-router-dom";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import ModalPopup from "../ModalPopup";
import AlertSnackBar from "../AlertSnackBar";
import ConfirmMessage from "../ConfirmMessage";

const columns = [
    { id: 'timepieceId', label: 'Timepiece Id', minWidth: 100, hidden: true, align: "center" },
    { id: 'index', label: 'No', minWidth: 100, hidden: false, align: "center" },
    { id: 'timepieceName', label: 'Timepiece Name', minWidth: 100, hidden: false, align: "left" },
    { id: 'brandName', label: 'Brand Name', minWidth: 100, hidden: false, align: "left" },
    { id: 'description', label: 'Description', minWidth: 100, hidden: false, align: "left" },
    { id: 'status', label: 'Status', minWidth: 100, hidden: false, align: "left" },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ProductSellPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterValue, setFilterValue] = useState([]);
    const [productData, setProductData] = useState([]);

    // modal
    const [modalButton, setModalButton] = useState(true);
    const [modalButtonName, setModalButtonName] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalData, setModalData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Alert
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);

    // Confirm
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    const { register, clearErrors, reset, setValue, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        getProductNotHavePrice();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getProductNotHavePrice = async () => {
        var response = await productAPI.getProductEvaluation();
        if (response.isSuccess) {
            setProductData(response.data);
            setFilterValue(response.data);
        }
    }

    const filterProduct = (event) => {
        var keyword = event.target.value;
        if (keyword == "") {
            getProductNotHavePrice();
        } else {
            var data = productData.filter(pro =>
                pro.timepiece.timepieceName.includes(keyword)
                || pro.timepiece.brand.brandName.includes(keyword)
            )
            setFilterValue(data);
        }
    }

    const handlOpenModal = (event, row) => {
        var buttonName = event.currentTarget.name;
        var { timepiece, evaluation } = row;
        var canEdit = false;
        var evaluationCol = [
            { key: "timepieceId", label: "Timepiece Id", canEdit: canEdit, hidden: true, multiline: false, rows: 1, column: 6 },
            { key: "evaluationId", label: "Evaluation Id", canEdit: canEdit, hidden: true, multiline: false, rows: 1, column: 6 },
            { key: "accuracyStatus", label: "Accuracy Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "braceletStatus", label: "Bracelet Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "buckleStatus", label: "Buckle Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "caseDiameterStatus", label: "Case Diameter Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "caseMaterialStatus", label: "Case Material Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "crystalTypeStatus", label: "Crystal Type Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "dialStatus", label: "Dial Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "handsStatus", label: "Hand Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "movementStatus", label: "Movement Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "waterResistanceStatus", label: "Water Resistance Status", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
            { key: "valueExtimatedStatus", label: "Value Estiamted", canEdit: canEdit, hidden: false, multiline: false, rows: 1, column: 6 },
        ]
        switch (buttonName) {
            case "view":
                setModalButtonName(buttonName);
                setModalTitle("Evaluation Detail");
                setModalData(evaluationCol);
                setModalButton(true);
                evaluationCol.forEach((item) => {
                    setValue(item.key, evaluation[item.key]);
                });
                var price = { key: "price", label: "Price", canEdit: false, hidden: false, multiline: false, rows: 1, column: 6 };
                setValue("price", row.timepiece.price);
                evaluationCol.push(price);
                setModalOpen(true);
                break;
            case "edit":
                canEdit = true;
                evaluationCol.forEach((item) => {
                    setValue(item.key, evaluation[item.key]);
                });
                setValue("timepieceId", timepiece.timepieceId);
                var minValue = row.evaluation.valueExtimatedStatus - (row.evaluation.valueExtimatedStatus * 0.2);
                var maxValue = row.evaluation.valueExtimatedStatus + (row.evaluation.valueExtimatedStatus * 0.2);
                var price = {
                    key: "price", label: "Price", canEdit: true, hidden: false, multiline: false, rows: 1, column: 6, validation: {
                        required: "Please enter price",
                        min: {
                            value: minValue,
                            message: `Value must be >= ${minValue}`
                        },
                        max: {
                            value: maxValue,
                            message: `Value must <= ${maxValue}`
                        },
                        pattern: {
                            value: /^\d+$/,
                            message: "Value must be a number"
                        }
                    }
                };
                evaluationCol.push(price);
                setModalButtonName(buttonName);
                setModalTitle("Edit price");
                setModalData(evaluationCol);
                setModalButton(false)
                setModalOpen(true);
                break;
            case "delete":
                const { timepieceId } = row.timepiece;
                setConfirmValue(timepieceId);
                setOpenConfirm(true);
                break;
            default:
                break;
        }
    }

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);
    }

    const handleCloseModal = () => {
        reset();
        clearErrors();
        setModalOpen(false);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleDelete = async (value) => {
        setOpenConfirm(false);
        var response = await productAPI.deleteTimepiece(value);
        console.log(response);
        if (response.isSuccess) {
            setSnackBarMessage("Cancle selling success");
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else {
            setSnackBarMessage("Cancle selling fail");
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        getProductNotHavePrice();
    }

    const onSubmit = async (data) => {
        const { timepieceId, ...formValue } = data;
        var formData = new FormData();
        formData.append("timepieceId", timepieceId);
        formData.append("price", formValue.price);
        var response = await productAPI.updateTimepiecePrice(formData);
        if (response.isSuccess) {
            setSnackBarMessage("Update price to sell success");
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else {
            setSnackBarMessage("Update price to sell fail");
            setSnackBarType("error");
            setOpenSnackBar(false);
        }
        setModalOpen(false);
        getProductNotHavePrice();
    }

    return <>
        <ConfirmMessage openConfirm={openConfirm} handleCloseConfirm={handleCloseConfirm} confirmValue={confirmValue} deleteFunction={handleDelete} />
        <AlertSnackBar snackBarMessage={snackBarMessage} snackBarType={snackBarType} openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} />
        <ModalPopup
            modalData={modalData}
            modalTitle={modalTitle}
            modalButtonName={modalButtonName}
            modalButton={modalButton}
            modalOpen={modalOpen}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleCloseModal={handleCloseModal}
            errors={errors}
            register={register}
        />
        <Box>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <TextField
                        fullWidth
                        onChange={filterProduct}
                        size="small"
                        label="Search..." />
                </Grid>
                <Grid item md={12}>
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
                                                            value = productData.indexOf(row) + 1;
                                                        }
                                                        else if (column.id == "status") {
                                                            if (row.evaluation == null) {
                                                                value = "Pending";
                                                            } else if (row.evaluation != null && row.timepiece.price == null) {
                                                                value = "Evaluated";
                                                            } else if (row.evaluation != null && row.timepiece.price != null) {
                                                                value = "Selling";
                                                            }
                                                        }
                                                        else if (column.id == "brandName") {
                                                            value = row.timepiece.brand[column.id]
                                                        }
                                                        else {
                                                            value = row.timepiece[column.id]
                                                        }
                                                        return (
                                                            <StyledTableCell
                                                                hidden={column.hidden}
                                                                key={column.id}
                                                                align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </StyledTableCell>
                                                        );
                                                    })}

                                                    <TableCell align='center'>
                                                        <Link name="view" onClick={(event) => row.evaluation != null && handlOpenModal(event, row)}>
                                                            <Visibility color={`${row.evaluation == null && 'disabled' || 'primary'}`} />
                                                        </Link>
                                                        <Link name="edit" className="mx-1" onClick={(event) => row.timepiece.price == null && handlOpenModal(event, row)}>
                                                            <Edit color={`${(row.timepiece.price == null && row.evaluation == null) && 'disabled'
                                                                || (row.timepiece.price == null && row.evaluation != null) && 'secondary'
                                                                || (row.timepiece.price != null && row.evaluation != null) && 'disabled'}`} />
                                                        </Link>
                                                        <Link name="delete" onClick={(event) => row.evaluation != null && handlOpenModal(event, row)}>
                                                            <Delete color={`${row.evaluation == null && 'disabled' || 'error'}`} />
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
                            count={productData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </>;
}

export default ProductSellPage;