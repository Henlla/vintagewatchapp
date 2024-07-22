import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import plusImage from "../assets/images/bg-img/plus.png"
import productAPI from "../api/product/productAPI";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send"
import categoryApi from "../api/category/categoryAPI";
import AlertSnackBar from "../components/AlertSnackBar";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const arrayProperty = [
    { key: "TimepieceName", label: "Timepiece Name", type: "text", validate: { required: "Please enter timepiece name" } },
    { key: "BrandId", label: "Brand", type: "select" },
    { key: "Movement", label: "Movement", type: "select" },
    { key: "CaseMaterial", label: "Case Material", type: "select" },
    { key: "CaseDiameter", label: "Case Diameter", type: "select" },
    { key: "CaseThickness", label: "Case Thickness", type: "select" },
    { key: "Crystal", label: "Crystal", type: "select" },
    { key: "WaterResistance", label: "Water Resistance", type: "select" },
    { key: "StrapMaterial", label: "Strap Material", type: "select" },
    { key: "StrapWidth", label: "Strap Width", type: "select" },
    { key: "Style", label: "Style", type: "select" },
    { key: "CategoryId", label: "Category", type: "select" },
    { key: "Description", label: "Description", type: "text", validate: { required: "Please enter description" } }
]

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

const caseThickness = [
    { value: "8mm", display: "8mm" },
    { value: "10mm", display: "10mm" },
    { value: "12mm", display: "12mm" },
    { value: "14mm", display: "14mm" },
    { value: "16mm", display: "16mm" },
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

const strapMaterial = [
    { value: "Nylon", display: "Nylon" },
    { value: "Alligator", display: "Alligator" },
    { value: "Silicone", display: "Silicone" },
    { value: "Canvas", display: "Canvas" },
    { value: "Metal", display: "Metal" },
]

const strapWidth = [
    { value: "18mm", display: "18mm" },
    { value: "20mm", display: "20mm" },
    { value: "22mm", display: "22mm" },
    { value: "24mm", display: "24mm" },
    { value: "26mm", display: "26mm" },
]
const style = [
    { value: "Pilot", display: "Pilot" },
    { value: "Field", display: "Field" },
    { value: "Chronograph", display: "Chronograph" },
    { value: "Skeleton", display: "Skeleton" },
    { value: "Moonphase", display: "Moonphase" },
]


const Evaluation = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const filesInputs = [useRef(null), useRef(null), useRef(null)];
    const [images, setImages] = useState([
        plusImage,
        plusImage,
        plusImage
    ]);

    const [loading, setLoading] = useState(false);

    const [files, setFiles] = useState([null, null, null]);


    const [mainImage, setMainImage] = useState(plusImage);
    const mainImageInput = useRef(null);
    const [mainFile, setMainFile] = useState(null);
    // snack bar
    const [snackBarType, setSnackBarType] = useState("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [brands, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getBrand();
        getAllCategory()
    }, []);

    const getBrand = async () => {
        var response = await productAPI.getBrand();
        if (response.isSuccess)
            setBrand(response.data)
    }

    const getAllCategory = async () => {
        var response = await categoryApi.getCategory();
        if (response.isSuccess)
            setCategories(response.data);

    }

    const onchangeData = (e) => {
        var { name, value } = e.target;
        setValue(name, value);
    }

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);
            setImages(newImages);

            const newFiles = [...files];
            newFiles[index] = file;
            setFiles(newFiles);
        }
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleImageClick = (index) => {
        filesInputs[index].current.click();
    }

    const mainImageClick = () => {
        mainImageInput.current.click();
    }

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMainImage(URL.createObjectURL(file));
            setMainFile(file);
        }
    }

    const onSubmit = async (data) => {
        if (files.some((item) => item == null) || mainFile == null) {
            setSnackBarMessage("Please choose all file")
            setSnackBarType("error")
            setOpenSnackBar(true)
            return;
        }

        setLoading(true);

        const timepiece = {
            TimepieceName: data.TimepieceName,
            BrandId: data.BrandId,
            Movement: data.Movement,
            CaseMaterial: data.CaseMaterial,
            CaseDiameter: data.CaseDiameter,
            CaseThickness: data.CaseThickness,
            Crystal: data.Crystal,
            WaterResistance: data.WaterResistance,
            StrapMaterial: data.StrapMaterial,
            StrapWidth: data.StrapWidth,
            Style: data.Style,
            CategoryId: data.CategoryId,
            Description: data.Description
        }
        const formData = new FormData();
        formData.append("timepiece", JSON.stringify(timepiece))

        //append file
        files.forEach((file) => {
            formData.append("files", file)
        });

        formData.append("files", mainFile)
        var response = await productAPI.requestEvaluation(formData);
        if (response.isSuccess) {
            setLoading(false)
            setSnackBarMessage("Send request success")
            setSnackBarType("success")
            setOpenSnackBar(true)
            await delay(2000)
            navigate("/shop", { replace: true })
        } else if (response.status === 401) {
            setSnackBarMessage("Please login first")
            setSnackBarType("warning")
            setOpenSnackBar(true)
            await delay(2000)
            navigate("/login", { replace: true })

        } else {
            setLoading(false)
            setSnackBarMessage("Send request fail")
            setSnackBarType("error")
            setOpenSnackBar(true)
            await delay(2000)
        }
    }

    return (
        <div>
            <AlertSnackBar snackBarType={snackBarType} snackBarMessage={snackBarMessage} openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} />
            <PageHeader title={"Evaluation"} curPage={"Evaluation"} />
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid
                        container
                        item
                        xs={12}
                        md={6}>
                        <Grid
                            marginY={3}
                            item
                            textAlign={"center"}
                            xs={12}>
                            <img
                                onClick={() => mainImageClick()}
                                className="border border-secondary border-2 rounded-4"
                                src={mainImage}
                                alt="image"
                                width={210}
                                height={210} />
                            <input
                                type="file"
                                ref={mainImageInput}
                                onChange={(event) => handleMainImageChange(event)}
                                hidden />
                        </Grid>
                        {
                            images.map((src, index) => (
                                <Grid
                                    textAlign={"center"}
                                    xs={4}
                                    md={4}
                                    item
                                    key={index}
                                >
                                    <img
                                        onClick={() => handleImageClick(index)}
                                        className="border border-secondary border-2 rounded-4"
                                        src={src}
                                        alt="image"
                                        width={110}
                                        height={110} />
                                    <input
                                        type="file"
                                        ref={filesInputs[index]}
                                        onChange={(event) => handleFileChange(event, index)}
                                        hidden />
                                </Grid>
                            ))
                        }

                    </Grid>

                    <Grid
                        marginY={5}
                        container
                        spacing={1}
                        item
                        xs={12}
                        md={6}>
                        <Grid item textAlign={"center"} xs={12}>
                            <InputLabel className="fs-4 fw-bolder">Request evaluation</InputLabel>
                        </Grid>
                        {
                            arrayProperty.map((item, key) => (
                                <Grid
                                    textAlign={"center"}
                                    paddingRight={2}
                                    item
                                    key={key}
                                    md={6}
                                    xs={12}>
                                    {item.type == "select" ?
                                        <FormControl
                                            fullWidth
                                            error={errors[item.key]?.message != null}
                                            size="small">
                                            <InputLabel id="demo-select-small-label">{item.label}</InputLabel>
                                            <Select
                                                {...register(item.key, { required: `Please select ${item.key}` })}
                                                className="text-start"
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label={item.label}
                                                defaultValue={""}
                                                onChange={(event) => onchangeData(event)}
                                            >
                                                {
                                                    item.key === "BrandId" &&
                                                    brands.map((item, index) => (
                                                        <MenuItem key={index} value={item.brandId}>{item.brandName}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "CategoryId" &&
                                                    categories.map((item, index) => (
                                                        <MenuItem key={index} value={item.categoryId}>{item.categoryName}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "Movement" &&
                                                    movement.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "CaseMaterial" &&
                                                    caseMaterial.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "CaseDiameter" &&
                                                    caseDiameter.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "Crystal" &&
                                                    crystal.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "WaterResistance" &&
                                                    waterResistance.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "StrapMaterial" &&
                                                    strapMaterial.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "StrapWidth" &&
                                                    strapWidth.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "CaseThickness" &&
                                                    caseThickness.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))
                                                    ||
                                                    item.key === "Style" &&
                                                    style.map((item, index) => (
                                                        <MenuItem key={index} value={item.value}>{item.display}</MenuItem>
                                                    ))

                                                }
                                            </Select>
                                            {errors[item.key]?.message && <FormHelperText>{errors[item.key]?.message}</FormHelperText>}
                                        </FormControl>
                                        :
                                        <TextField
                                            size="small"
                                            error={errors[item.key]?.message != null}
                                            helperText={errors[item.key]?.message}
                                            id={item.key}
                                            name={item.key}
                                            fullWidth
                                            label={`${item.label} *`}
                                            {...register(item.key, item.validate)}
                                        />
                                    }
                                </Grid>
                            ))
                        }
                        <Grid textAlign={"center"} item xs={12}>
                            <LoadingButton
                                type="submit"
                                size="small"
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                <span>Send request</span>
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Evaluation;