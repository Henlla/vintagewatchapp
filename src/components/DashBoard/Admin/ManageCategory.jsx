import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Link, Modal, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import productAPI from "../../../api/product/productAPI"
import { Edit, Visibility } from '@mui/icons-material';

const style = {
    height: "50%",
    position: 'absolute',
    width: "50%",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns = [
    { id: 'categoryId', label: 'Category Id', minWidth: 170, hidden: true, align: "left" },
    { id: 'index', label: 'No.', minWidth: 170, hidden: false, align: "left" },
    { id: 'categoryName', label: 'CategoryName', minWidth: 100, hidden: false, align: "left" },
];

export default function ManageCategory() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [categoryData, setCategoryData] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        getCategoryData();
    }, [])

    const getCategoryData = async () => {
        var response = await productAPI.getCategory();
        if (response.isSuccess) {
            setCategoryData(response.data);
        }
    }

    const handlOpenModal = () => {
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Box>
                <TextField label="Search..." size='small' className='mb-2' />
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 370 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        hidden={column.hidden}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align='center'>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id == "categoryId") {
                                                    value = row.categoryId;
                                                } else if (column.id == "categoryName") {
                                                    value = row.categoryName;
                                                } else {
                                                    value = categoryData.indexOf(row) + 1;
                                                }
                                                return (
                                                    <TableCell
                                                        hidden={column.hidden}
                                                        key={column.categoryId}
                                                        align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align='center'>
                                                <Link id={"view"} onClick={(event) => handlOpenModal(event, row)}>
                                                    <Visibility color='primary' className='me-2' />
                                                </Link>
                                                <Link id={"edit"} onClick={(event) => handlOpenModal(event, row)}>
                                                    <Edit color='secondary' className='me-2' />
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
                open={open}
                onClose={() => handleCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component={"form"}>
                    model
                </Box>
            </Modal >
        </>
    );
}