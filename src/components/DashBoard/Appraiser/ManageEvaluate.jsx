import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import productApi from "../../../api/product/productAPI"
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, Link, Modal, TextField, Typography } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const columns = [
    { id: 'timepieceId', label: 'Timepiece Id', minWidth: 120, hidden: true },
    { id: 'index', label: 'No.', minWidth: 120, hidden: false },
    { id: 'timepieceName', label: 'Timepiece Name', minWidth: 140, hidden: false },
    { id: 'datePost', label: 'Date Post', minWidth: 100, hidden: false },
    { id: 'userId', label: 'User Name', minWidth: 100, hidden: false },
    { id: 'brandId', label: 'Brand Name', minWidth: 100, hidden: false },
];

const style = {
    height: "90%",
    position: 'absolute',
    overflow: "scroll",
    overflowX: "hidden",
    width: "50%",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ManageEvaluate() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [timepieceEvaluate, setTimepieceEvaluate] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [timepieceImage, setTimepieceImage] = useState([]);
    const [submitButton, setSubmitButton] = useState(true);
    const [inputData, setInputData] = useState({
        timepieceId: "",
        movementStatus: "",
        braceletStatus: "",
        buckleStatus: "",
        caseDiameterStatus: "",
        caseMaterialStatus: "",
        crystalTypeStatus: "",
        dialStatus: "",
        handsStatus: "",
        accuracyStatus: "",
        valueExtimatedStatus: "",
        waterResistanceStatus: "",
    });

    useEffect(() => {
        const initialData = {};
        modalData.forEach(item => {
            initialData[item.key] = item.data || '';
        });
        setInputData(initialData);
    }, [modalData]);

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
    };

    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getTimepieceNotEvaluate();
    }, []);

    const getTimepieceNotEvaluate = async () => {
        var response = await productApi.getAllTimepieceNotEvaluate();
        setTimepieceEvaluate(response.data);
        if (response.isSuccess) {
            setTimepieceEvaluate(response.data)
        }
    }


    const handlOpenModal = (event, data) => {
        let canEdit = false;
        let timepiece;
        if (event.currentTarget.id === "view") {
            canEdit = false;
            setSubmitButton(true);
            timepiece = [
                { key: "timepieceId", label: "Timepiece Id", data: data.timepiece.timepieceId, canEdit: canEdit, hidden: true },
                { key: "timepieceName", label: "Timepiece Name", data: data.timepiece.timepieceName, canEdit: canEdit, hidden: false },
                { key: "caseDiameter", labe: "Case Diameter", label: "Case Diameter", data: data.timepiece.caseDiameter, canEdit: canEdit, hidden: false },
                { key: "caseMaterial", label: "Case Material", data: data.timepiece.caseMaterial, canEdit: canEdit, hidden: false },
                { key: "caseThickness", label: "Case Thickness", data: data.timepiece.caseThickness, canEdit: canEdit, hidden: false },
                { key: "crystal", label: "Crystal", data: data.timepiece.crystal, canEdit: canEdit, hidden: false },
                { key: "datePost", label: "Date Post", data: data.timepiece.datePost, canEdit: canEdit, hidden: false },
                { key: "description", label: "Description", data: data.timepiece.description, canEdit: canEdit, hidden: false },
                { key: "movement", label: "Movement", data: data.timepiece.movement, canEdit: canEdit, hidden: false },
                { key: "strapMaterial", label: "Strap Material", data: data.timepiece.strapMaterial, canEdit: canEdit, hidden: false },
                { key: "strapWidth", label: "StrapWidth", data: data.timepiece.strapWidth, canEdit: canEdit, hidden: false },
                { key: "style", label: "Style", data: data.timepiece.style, canEdit: canEdit, hidden: false },
                { key: "waterResistance", label: "Water Resistance", data: data.timepiece.waterResistance, canEdit: canEdit, hidden: false },
            ]
        } else if (event.currentTarget.id === "edit") {
            canEdit = true;
            setSubmitButton(false);
            timepiece = [
                { key: "timepieceId", label: "Timepiece Id", data: data.timepiece.timepieceId, canEdit: canEdit, hidden: true },
                { key: "movementStatus", label: "Movement Status", data: null, canEdit: canEdit, hidden: false },
                { key: "caseDiameterStatus", label: "Case Diameter Status", data: null, canEdit: canEdit, hidden: false },
                { key: "caseMaterialStatus", label: "Case Material Status", data: null, canEdit: canEdit, hidden: false },
                { key: "waterResistanceStatus", label: "Water Resistance Status", data: null, canEdit: canEdit, hidden: false },
                { key: "crystalTypeStatus", label: "Crystal Status", data: null, canEdit: canEdit, hidden: false },
                { key: "dialStatus", label: "Dial Status", data: null, canEdit: canEdit, hidden: false },
                { key: "handsStatus", label: "Hand Status", data: null, canEdit: canEdit, hidden: false },
                { key: "braceletStatus", label: "Bracelet Status", data: null, canEdit: canEdit, hidden: false },
                { key: "buckleStatus", label: "Buckle Status", data: null, canEdit: canEdit, hidden: false },
                { key: "accuracyStatus", label: "Accuracy Status", data: null, canEdit: canEdit, hidden: false },
                { key: "valueExtimatedStatus", label: "Value Estimate", data: null, canEdit: canEdit, hidden: false },
                { key: "timepieceId", label: "Timepiece Id", data: data.timepiece.timepieceId, canEdit: canEdit, hidden: true },
            ]
        }
        setTimepieceImage(data.images);
        setModalData(timepiece)
        setOpen(true)
    }


    const onSubmit = async () => {
        const evaluate = {
            "movementStatus": inputData.movementStatus,
            "braceletStatus": inputData.braceletStatus,
            "buckleStatus": inputData.buckleStatus,
            "caseDiameterStatus": inputData.caseDiameterStatus,
            "caseMaterialStatus": inputData.caseMaterialStatus,
            "crystalTypeStatus": inputData.crystalTypeStatus,
            "dialStatus": inputData.dialStatus,
            "handsStatus": inputData.handsStatus,
            "accuracyStatus": inputData.accuracyStatus,
            "valueExtimatedStatus": parseFloat(inputData.valueExtimatedStatus),
            "waterResistanceStatus": inputData.waterResistanceStatus,
        }
        const formData = new FormData();
        formData.append("evaluate", JSON.stringify(evaluate))
        formData.append("timepieceId", inputData.timepieceId)
        var response = await productApi.createEvaluation(formData);
        console.log(response);
    }

    const handleCloseModal = () => {
        setOpen(false);
        clearErrors();
        reset();
        setInputData({
            movementStatus: "",
            braceletStatus: "",
            buckleStatus: "",
            caseDiameterStatus: "",
            caseMaterialStatus: "",
            crystalTypeStatus: "",
            dialStatus: "",
            handsStatus: "",
            accuracyStatus: "",
            valueExtimatedStatus: "",
            waterResistanceStatus: "",
        });
    }


    return (
        <Box>
            <Box marginBottom={2}>
                <Grid>
                    <TextField size='small' label="Search..." />
                </Grid>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 360 }}>
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
                                <TableCell align='center'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timepieceEvaluate
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.timepiece.timepieceId}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id == "userId") {
                                                    value = row.timepiece.user.firstName + " " + row.timepiece.user.lastName
                                                } else if (column.id == "brandId") {
                                                    value = row.timepiece.brand.brandName
                                                } else if (column.id == "index") {
                                                    value = timepieceEvaluate.indexOf(row) + 1;
                                                }
                                                else {
                                                    value = row.timepiece[column.id]
                                                }
                                                return (
                                                    <TableCell
                                                        hidden={column.hidden}
                                                        key={column.id}
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
                    count={timepieceEvaluate.length}
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Product
                            </Typography>
                        </Grid>
                        {modalData?.map((item, index) => (
                            !item.hidden &&
                            <Grid item xs={12} md={6} textAlign={"center"} key={index}>
                                <FormControl
                                    id="modal-modal-description">
                                    <TextField
                                        error={errors[item.key]?.message != null}
                                        helperText={errors[item.key]?.message}
                                        {...register(item.key, { required: "This is required" })}
                                        fullWidth
                                        id={item.key}
                                        name={item.key}
                                        disabled={!item.canEdit}
                                        value={item.data || inputData[item.key]}
                                        onChange={handleChange}
                                        size='small' label={item.label} />
                                </FormControl>
                            </Grid>
                        ))}
                        <Grid item xs={12} md={12} textAlign={"end"} hidden={submitButton}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <Button type='submit' variant='outlined'>Submit</Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop={1}>
                        {
                            timepieceImage.map((item, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <img src={item.imageUrl} alt="" />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Modal >
        </Box >
    );
}