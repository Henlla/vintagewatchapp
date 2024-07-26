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
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, Link, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import AlertSnackBar from "../../AlertSnackBar"

const columns = [
    { id: 'timepieceId', label: 'Timepiece Id', minWidth: 120, hidden: true, align: "center" },
    { id: 'index', label: 'No.', minWidth: 120, hidden: false, align: "left" },
    { id: 'timepieceName', label: 'Timepiece Name', minWidth: 140, hidden: false, align: "left" },
    { id: 'datePost', label: 'Date Post', minWidth: 100, hidden: false, align: "left" },
    { id: 'userId', label: 'User Name', minWidth: 100, hidden: false, align: "left" },
    { id: 'brandId', label: 'Brand Name', minWidth: 100, hidden: false, align: "left" },
];

const movement = [
    { value: "Quartz", display: "Quartz" },
    { value: "Automatic", display: "Automatic" },
    { value: "Manual", display: "Manual" },
    { value: "Hybrid", display: "Hybrid" },
    { value: "Kinetic", display: "Kinetic" },
]

const caseMaterial = [
    { value: "Titanium", display: "Titanium" },
    { value: "Platinum", display: "Platinum" },
    { value: "Ceramic", display: "Ceramic" },
    { value: "Bronze", display: "Bronze" },
    { value: "Aluminum", display: "Aluminum" },
]

const caseDiameter = [
    { value: "38mm", display: "38mm" },
    { value: "40mm", display: "40mm" },
    { value: "44mm", display: "44mm" },
    { value: "46mm", display: "46mm" },
    { value: "48mm", display: "48mm" },
]

const crystal = [
    { value: "Sapphire", display: "Sapphire" },
    { value: "Mineral", display: "Mineral" },
    { value: "Acrylic", display: "Acrylic" },
    { value: "Synthetic", display: "Synthetic" },
    { value: "Hesalite", display: "Hesalite" },
]

const waterResistance = [
    { value: "50m", display: "50m" },
    { value: "100m", display: "100m" },
    { value: "200m", display: "200m" },
    { value: "300m", display: "300m" },
    { value: "500m", display: "500m" },
]

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
    //modal
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [timepieceImage, setTimepieceImage] = useState([]);
    const [submitButton, setSubmitButton] = useState(true);
    //snack bar
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarType, setSnackBarType] = useState("success");
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [filterValue, setFilterValue] = useState("");
    const { register, handleSubmit, setValue, reset, clearErrors, formState: { errors } } = useForm();

    useEffect(() => {
        getTimepieceNotEvaluate();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const getTimepieceNotEvaluate = async () => {
        var response = await productApi.getAllTimepieceNotEvaluate();
        setTimepieceEvaluate(response.data);
        if (response.isSuccess) {
            setTimepieceEvaluate(response.data)
        }
    }

    const onchangeData = (event) => {
        var { name, value } = event.target;
    }

    const handlOpenModal = (event, data) => {
        const { timepiece } = data;
        let canEdit = false;
        let timepieceData = [];
        if (event.currentTarget.id === "view") {
            canEdit = false;
            setSubmitButton(true);
            timepieceData = [
                { key: "timepieceId", label: "Timepiece Id", data: timepiece.timepieceId, canEdit: canEdit, hidden: true, type: "text" },
                { key: "timepieceName", label: "Timepiece Name", data: timepiece.timepieceName, canEdit: canEdit, hidden: false, type: "text" },
                { key: "caseDiameter", labe: "Case Diameter", label: "Case Diameter", data: timepiece.caseDiameter, canEdit: canEdit, hidden: false, type: "text" },
                { key: "caseMaterial", label: "Case Material", data: timepiece.caseMaterial, canEdit: canEdit, hidden: false, type: "text" },
                { key: "caseThickness", label: "Case Thickness", data: timepiece.caseThickness, canEdit: canEdit, hidden: false, type: "text" },
                { key: "crystal", label: "Crystal", data: timepiece.crystal, canEdit: canEdit, hidden: false, type: "text" },
                { key: "datePost", label: "Date Post", data: timepiece.datePost, canEdit: canEdit, hidden: false, type: "text" },
                { key: "description", label: "Description", data: timepiece.description, canEdit: canEdit, hidden: false, type: "text" },
                { key: "movement", label: "Movement", data: timepiece.movement, canEdit: canEdit, hidden: false, type: "text" },
                { key: "strapMaterial", label: "Strap Material", data: timepiece.strapMaterial, canEdit: canEdit, hidden: false, type: "text" },
                { key: "strapWidth", label: "StrapWidth", data: timepiece.strapWidth, canEdit: canEdit, hidden: false, type: "text" },
                { key: "style", label: "Style", data: timepiece.style, canEdit: canEdit, hidden: false, type: "text" },
                { key: "waterResistance", label: "Water Resistance", data: timepiece.waterResistance, canEdit: canEdit, hidden: false, type: "text" },
            ]
            timepieceData.forEach((item) => {
                setValue(item.key, item.data);
            });
        } else if (event.currentTarget.id === "edit") {
            canEdit = true;
            setSubmitButton(false);
            timepieceData = [
                { key: "timepieceId", label: "Timepiece Id", data: timepiece?.timepieceId, canEdit: canEdit, hidden: true },
                {
                    key: "movementStatus",
                    label: "Movement",
                    data: timepiece.movement,
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please select Movement"
                    },
                    type: "select"
                },
                {
                    key: "caseDiameterStatus",
                    label: "Case Diameter",
                    data: timepiece.caseDiameter,
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please select Case Diameter"
                    },
                    type: "select"
                },
                {
                    key: "caseMaterialStatus",
                    label: "Case Material",
                    data: timepiece.caseMaterial,
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please select Case Material"
                    },
                    type: "select"
                },
                {
                    key: "waterResistanceStatus",
                    label: "Water Resistance",
                    data: timepiece.waterResistance,
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please select Water Resistance"
                    },
                    type: "select"
                },
                {
                    key: "crystalTypeStatus",
                    label: "Crystal",
                    data: timepiece.crystal,
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please select Crystal Type"
                    },
                    type: "select"
                },
                {
                    key: "dialStatus",
                    label: "Dial Status",
                    data: "",
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Dial"
                    },
                    type: "text"
                },
                {
                    key: "handsStatus",
                    label: "Hand Status",
                    data: "", canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Hand"
                    },
                    type: "text"
                },
                {
                    key: "braceletStatus",
                    label: "Bracelet Status",
                    data: "",
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Bracelet"
                    },
                    type: "text"
                },
                {
                    key: "buckleStatus",
                    label: "Buckle Status",
                    data: "",
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Buckle"
                    },
                    type: "text"
                },
                {
                    key: "accuracyStatus",
                    label: "Accuracy Status",
                    data: "",
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Accuracy"
                    },
                    type: "text"
                },
                {
                    key: "valueExtimatedStatus",
                    label: "Value Estimate", data: "",
                    canEdit: canEdit,
                    hidden: false,
                    validation: {
                        required: "Please enter Value Estimate",
                        min: { value: 1, message: "Value must be > 0" },
                        pattern: {
                            value: /^\d+$/,
                            message: "This field must be a number"
                        }
                    },
                    type: "text"
                },
            ]
            timepieceData.forEach((item) => {
                setValue(item.key, item.data);
            });
        }
        setTimepieceImage(data.images);
        setModalData(timepieceData)
        setOpen(true)
    }


    const onSubmit = async (data) => {
        const { timepieceId, ...formValue } = data;
        const evaluate = {
            "movementStatus": formValue.movementStatus,
            "braceletStatus": formValue.braceletStatus,
            "buckleStatus": formValue.buckleStatus,
            "caseDiameterStatus": formValue.caseDiameterStatus,
            "caseMaterialStatus": formValue.caseMaterialStatus,
            "crystalTypeStatus": formValue.crystalTypeStatus,
            "dialStatus": formValue.dialStatus,
            "handsStatus": formValue.handsStatus,
            "accuracyStatus": formValue.accuracyStatus,
            "valueExtimatedStatus": parseFloat(formValue.valueExtimatedStatus),
            "waterResistanceStatus": formValue.waterResistanceStatus,
        }
        const formData = new FormData();
        formData.append("evaluate", JSON.stringify(evaluate))
        formData.append("timepieceId", timepieceId)
        var response = await productApi.createEvaluation(formData);
        if (response.isSuccess) {
            setSnackBarMessage("Make evaluate success");
            setSnackBarType("success");
            setOpenSnackBar(true);
            setOpen(false);
            getTimepieceNotEvaluate();
        }
    }

    const handleCloseModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    }

    const filterData = () => {
        var data = timepieceEvaluate.filter(item => item.timepiece.timepieceName.includes(filterValue.toLocaleLowerCase()));
        return data;
    }


    return (
        <Box>
            <AlertSnackBar snackBarMessage={snackBarMessage} snackBarType={snackBarType} openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} />
            <Box marginBottom={2}>
                <TextField onChange={(e) => setFilterValue(e.target.value)} fullWidth size='large' label="Search..." />
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
                                <TableCell align='left'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterData()
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
                                            <TableCell align='left'>
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
                    <Typography marginBottom={2} id="modal-modal-title" variant="h4">
                        Product
                    </Typography>
                    <Grid container spacing={2}>
                        {modalData?.map((item, index) => (
                            !item.hidden && item.type == "text" &&
                            <Grid item xs={12} md={6} textAlign={"center"} key={index}>
                                <TextField
                                    {...register(item.key, item.validation)}
                                    error={errors[item.key]?.message != null}
                                    helperText={errors[item.key]?.message}
                                    fullWidth
                                    id={item.key}
                                    name={item.key}
                                    disabled={!item.canEdit}
                                    size='large' label={item.label} />
                            </Grid>
                            ||
                            !item.hidden && item.type == "select" &&
                            <Grid item xs={12} md={6} textAlign={"center"} key={index}>
                                <FormControl
                                    fullWidth
                                    error={errors[item.key]?.message != null}>
                                    <InputLabel id="demo-select-small-label">{item.label}</InputLabel>
                                    <Select
                                        {...register(item.key, item.validation)}
                                        className="text-start"
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label={item.label}
                                        defaultValue={""}
                                        onChange={(event) => onchangeData(event)}
                                    >
                                        {
                                            item.key === "movementStatus" &&
                                            movement.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                            ))
                                            ||
                                            item.key === "caseDiameterStatus" &&
                                            caseDiameter.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                            ))
                                            ||
                                            item.key === "caseMaterialStatus" &&
                                            caseMaterial.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                            ))
                                            ||
                                            item.key === "waterResistanceStatus" &&
                                            waterResistance.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                            ))
                                            ||
                                            item.key === "crystalTypeStatus" &&
                                            crystal.map((item, index) => (
                                                <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {errors[item.key]?.message && <FormHelperText>{errors[item.key]?.message}</FormHelperText>}
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