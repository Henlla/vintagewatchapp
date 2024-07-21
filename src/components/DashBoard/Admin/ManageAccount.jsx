import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Link, Modal, styled, TextField } from '@mui/material';
import { useState } from 'react';
import authAPI from '../../../api/auth/authAPI';
import { useEffect } from 'react';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Typography } from 'antd';
import { useForm } from 'react-hook-form';
import AlertSnackBar from '../../AlertSnackBar';
import ConfirmMessage from '../../ConfirmMessage';

const columns = [
  { id: 'userId', label: 'User Id', minWidth: 100, hidden: true, align: "center" },
  { id: 'index', label: 'No', minWidth: 100, hidden: false, align: "center" },
  { id: 'email', label: 'Email', minWidth: 100, hidden: false, align: "left" },
  { id: 'firstName', label: 'First Name', minWidth: 100, hidden: false, align: "left" },
  { id: 'lastName', label: 'Last Name', minWidth: 100, hidden: false, align: "left" },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 100, hidden: false, align: "left" },
  { id: 'address', label: 'Address', minWidth: 100, hidden: false, align: "left" },
];

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

export default function ManageAccount() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  // modal
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButton, setModalButton] = useState(false);
  const [modalButtonName, setModalButtonName] = useState("");
  const [modalData, setModalData] = useState([]);
  //snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  // confirm
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmValue, setConfirmValue] = useState("");

  const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm();

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    var response = await authAPI.getAllAccount();
    setUserData(response.data);
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
    var { userId, email, firstName, lastName, phoneNumber, address } = row;
    let account = {}
    let canEdit = false;
    account = [
      { key: "userId", label: "User Id", data: userId, canEdit: canEdit, hidden: true },
      { key: "firstName", label: "First Name", data: firstName, canEdit: canEdit, hidden: false, dataGrid: 6, validate: { required: "Please enter first name" } },
      { key: "lastName", label: "Last Name", data: lastName, canEdit: canEdit, hidden: false, dataGrid: 6, validate: { required: "Please enter last name" } },
      { key: "email", label: "Email", data: email, canEdit: canEdit, hidden: false, dataGrid: 12 },
      { key: "phoneNumber", label: "Phone Number", data: phoneNumber, canEdit: canEdit, hidden: false, dataGrid: 12, validate: { required: "Please enter phone number" } },
      { key: "address", label: "Address", data: address, canEdit: canEdit, hidden: false, dataGrid: 12, validate: { required: "Please enter address" } },
    ]
    switch (buttonName) {
      case "view":
        canEdit = false;
        setModalButton(true);
        setModalButtonName("view");
        setModalTitle("User Detail")
        account.forEach((item) => {
          item["canEdit"] = canEdit
        });
        setModalData(account);
        account.forEach(item => {
          setValue(item.key, item.data);
        });
        setOpen(true);
        break;
      case "edit":
        canEdit = true;
        setModalButton(false);
        setModalButtonName("edit");
        setModalTitle("Edit user")
        account.forEach((item) => {
          item["canEdit"] = canEdit
          if (item["key"] == "email") {
            item["hidden"] = true
          }
        });
        setModalData(account);
        account.forEach(item => {
          setValue(item.key, item.data);
        });
        setOpen(true);
        break;
      case "delete":
        var { userId } = row;
        setModalButtonName("delete");
        setConfirmValue(userId);
        setOpenConfirm(true);
        break;
      default:
        break;
    }
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleCloseModal = () => {
    reset();
    clearErrors();
    setOpen(false);
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const filterData = () => {
    var data = userData.filter(u => u.email.includes(filterValue));
    return data;
  }

  const onSubmit = async (data) => {
    const { userId, ...formData } = data;
    switch (modalButtonName) {
      case "edit":
        var formValue = new FormData();
        formValue.append("userId", JSON.stringify(userId));
        formValue.append("userData", JSON.stringify(formData));
        var response = await authAPI.updateUserInformation(formValue);
        if (response.isSuccess) {
          setSnackBarMessage(response.message);
          setSnackBarType("success");
          setOpenSnackBar(true);
          setOpen(false);
        } else {
          setSnackBarMessage(response.message);
          setSnackBarType("error");
          setOpenSnackBar(true);
          setOpen(false)
        }
        getAllUserData();
        break;
      case "delete":
        var response = await authAPI.deleteUser(confirmValue);
        if (response.isSuccess) {
          setSnackBarMessage(response.message);
          setSnackBarType("success");
          setOpenSnackBar(true);
          setOpenConfirm(false);
        } else {
          setSnackBarMessage(response.message);
          setSnackBarType("error");
          setOpenSnackBar(true);
          setOpenConfirm(false);
        }
        getAllUserData();
        break;
      default:
        console.warn("Manage Account: Button not register_209");
        break;
    }
  }


  return (
    <>
      <ConfirmMessage openConfirm={openConfirm} handleCloseConfirm={handleCloseConfirm} confirmValue={confirmValue} deleteFunction={onSubmit} />
      <AlertSnackBar openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} snackBarMessage={snackBarMessage} snackBarType={snackBarType} />
      <Box>
        <TextField label="Search..." fullWidth onChange={(e) => setFilterValue(e.target.value)} size='large' className='mb-2' />
      </Box>
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
              {filterData()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                      {columns.map((column) => {
                        let value;
                        if (column.id == "index") {
                          value = userData.indexOf(row) + 1;
                        } else {
                          value = row[column.id]
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
                        <Link id={"view"} name="view" onClick={(event) => handlOpenModal(event, row)}>
                          <Visibility color='primary' />
                        </Link>
                        <Link id={"edit"} name="edit" onClick={(event) => handlOpenModal(event, row)}>
                          <Edit color='secondary' />
                        </Link>
                        {/* <Link id={"delete"} name="delete" onClick={(event) => handlOpenModal(event, row)}>
                          <Delete color='error' />
                        </Link> */}
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
          count={userData.length}
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
        <Box sx={style} component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Typography className='mb-4' id="modal-modal-title" variant="h6" component="h2">{modalTitle}</Typography>
          <Grid container spacing={2}>
            {
              modalData.map((item, index) => (
                !item.hidden &&
                <Grid item xs={12} md={item.dataGrid} key={index}>
                  <TextField
                    name={item.key}
                    {...register(item.key, { required: "This is required" })}
                    error={errors[item.key]?.message != null}
                    helperText={errors[item.key]?.message}
                    fullWidth
                    label={item.label}
                    disabled={!item.canEdit}
                    multiline={(item.key == "address" && true) || false}
                    rows={(item.key == "address" && 3) || "0"}
                  />
                </Grid>
              ))
            }
            <Grid item md={12}>
              <Button type='submit' fullWidth name={modalButtonName} hidden={modalButton} variant='contained'>Submit</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal >
    </ >
  );
}