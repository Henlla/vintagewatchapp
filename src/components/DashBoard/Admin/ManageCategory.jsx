import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Link, Modal, styled, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Delete } from '@mui/icons-material';

import { useForm } from 'react-hook-form';
import categoryApi from '../../../api/category/categoryAPI';
import ConfirmMessage from '../../ConfirmMessage';
import AlertSnackBar from '../../AlertSnackBar';

const style = {
    height: "40%",
    position: 'absolute',
    width: "40%",
    top: '50%',
    left: '50%',
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
    { id: 'categoryId', label: 'Category Id', minWidth: 170, hidden: true, align: "left" },
    { id: 'index', label: 'No.', minWidth: 170, hidden: false, align: "left" },
    { id: 'categoryName', label: 'CategoryName', minWidth: 100, hidden: false, align: "left" },
];

export default function ManageCategory() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [categoryData, setCategoryData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm();
    // modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalButtonName, setModalButtonName] = useState("");
    // snackbar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState("success");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    // confirm
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmValue, setConfirmValue] = useState("");

    useEffect(() => {
        getCategoryData();
    }, [])

    const getCategoryData = async () => {
        var response = await categoryApi.getCategory();
        if (response.isSuccess) {
            setCategoryData(response.data);
        }
    };

    const filterData = () => {
        var data = categoryData.filter(x => x.categoryName.toLowerCase().includes(filterValue.toLowerCase()));
        return data;
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleCloseModal = () => {
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

    const buttonClick = (event, row) => {
        clearErrors();
        reset();
        var buttonName = event.currentTarget.name;
        switch (buttonName) {
            case "add":
                setModalTitle("Add new category");
                setModalButtonName("add");
                setModalOpen(true);
                break;
            case "delete":
                var { categoryId } = row;
                setModalButtonName("delete");
                setConfirmValue(categoryId);
                setOpenConfirm(true)
                break;
            default:
                console.log("The button name is not register");
                break;
        }
    }

    const onSubmit = async (data) => {
        if (modalButtonName === "add") {
            var formData = new FormData();
            formData.append("categoryString", JSON.stringify(data));
            var response = await categoryApi.createNewCategory(formData);
            if (response.isSuccess) {
                setModalOpen(false);
                setSnackBarMessage("Create category success");
                setSnackBarType("success");
                setOpenSnackBar(true);
            }
        } else if (modalButtonName == "delete") {
            var response = await categoryApi.deleteCategory(data);
            if (response.isSuccess) {
                setOpenConfirm(false);
                setSnackBarMessage("Delete category success");
                setSnackBarType("success");
                setOpenSnackBar(true);
            }
        }
        getCategoryData();
    }

    return (
        <>
            <ConfirmMessage openConfirm={openConfirm} handleCloseConfirm={handleCloseConfirm} confirmValue={confirmValue} deleteFunction={onSubmit} />
            <AlertSnackBar openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} snackBarMessage={snackBarMessage} snackBarType={snackBarType} />
            <Box>
                <Button variant='contained' name="add" onClick={(event) => buttonClick(event)} className='mb-2'>Add</Button>
            </Box>
            <Box>
                <TextField fullWidth label="Search..." onChange={(e) => setFilterValue(e.target.value)} size='small' className='mb-2' />
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 370 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column,index) => (
                                    <StyledTableCell
                                        hidden={column.hidden}
                                        key={index}
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
                                .map((row,index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column,index) => {
                                                let value;
                                                if (column.id == "categoryId") {
                                                    value = row.categoryId;
                                                } else if (column.id == "categoryName") {
                                                    value = row.categoryName;
                                                } else if (column.id == "index") {
                                                    value = categoryData.indexOf(row) + 1;
                                                }
                                                return (
                                                    <TableCell
                                                        hidden={column.hidden}
                                                        key={index}
                                                        align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align='center'>
                                                <Link name={"delete"} onClick={(event) => buttonClick(event, row)}>
                                                    <Delete color='error' className='me-2' />
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
                    count={categoryData.length}
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
                            <TextField
                                {...register("categoryName", { required: "This is required" })}
                                error={errors["categoryName"]?.message != null}
                                helperText={errors["categoryName"]?.message}
                                name="categoryName"
                                fullWidth
                                label="Category Name" />
                        </Grid>
                        <Grid item md={12}>
                            <Button type='submit' fullWidth name={modalButtonName} variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal >
        </>
    );
}