import { Alert, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import plusImage from "../assets/images/bg-img/plus.png"
import productAPI from "../api/product/productAPI";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send"

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const arrayProperty = [
    { key: "TimepieceName", label: "Timepiece Name", type: "text" },
    { key: "BrandId", label: "Brand", type: "select" },
    { key: "Movement", label: "Movement", type: "text" },
    { key: "CaseMaterial", label: "Case Material", type: "text" },
    { key: "CaseDiameter", label: "Case Diameter", type: "text" },
    { key: "CaseThickness", label: "Case Thickness", type: "text" },
    { key: "Crystal", label: "Crystal", type: "text" },
    { key: "WaterResistance", label: "Water Resistance", type: "text" },
    { key: "StrapMaterial", label: "Strap Material", type: "text" },
    { key: "StrapWidth", label: "Strap Width", type: "text" },
    { key: "Style", label: "Style", type: "text" },
    { key: "CategoryId", label: "Category", type: "select" },
    { key: "Description", label: "Description", type: "text" }
]

const Evaluation = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const filesInputs = [useRef(null), useRef(null), useRef(null)];
    const [images, setImages] = useState([
        plusImage,
        plusImage,
        plusImage
    ]);

    const [loading, setLoading] = useState(false);

    const [files, setFiles] = useState([null, null, null]);
    const [openSnackBar, setOpenSnackBar] = useState(false);


    const [mainImage, setMainImage] = useState(plusImage);
    const mainImageInput = useRef(null);
    const [mainFile, setMainFile] = useState(null);
    const [snackBarType, setSnackBarType] = useState("success");
    const [snackBarMessage, setSnackBarMessage] = useState("");

    const [brands, setBrand] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

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
        var response = await productAPI.getCategory();
        if (response.isSuccess)
            setCategories(response.data);

    }


    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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
            navigate("/shop")
            // reset({
            //     TimepieceName: "",
            //     Movement: "TimepieceName",
            //     CaseMaterial: "TimepieceName",
            //     CaseDiameter: "TimepieceName",
            //     CaseThickness: "TimepieceName",
            //     Crystal: "TimepieceName",
            //     WaterResistance: "TimepieceName",
            //     StrapMaterial: "TimepieceName",
            //     StrapWidth: "TimepieceName",
            //     Style: "TimepieceName",
            //     Description: "TimepieceName"
            // });
        } else if (response.status === 401) {
            setSnackBarMessage("Please login first")
            setSnackBarType("warning")
            setOpenSnackBar(true)
            await delay(2000)
            navigate("/login")

        }
    }

    return (
        <div>
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
                                                {...register(item.key, { required: `Select ${item.key} required` })}
                                                className="text-start"
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={item.key === "BrandId" ? selectedBrand : selectedCategory}
                                                label={item.label}
                                                onChange={item.key === "BrandId" ? handleBrandChange : handleCategoryChange}
                                            >
                                                {item.key === "BrandId" ?
                                                    brands.map((item, index) => (
                                                        <MenuItem key={index} value={item.brandId}>{item.brandName}</MenuItem>
                                                    ))
                                                    :
                                                    categories.map((item, index) => (
                                                        <MenuItem key={index} value={item.categoryId}>{item.categoryName}</MenuItem>
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
                                            {...register(item.key, { required: "This is required" })}
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
                            {/* <Button type="submit" variant="contained">Send request</Button> */}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleSnackBarClose}>
                <Alert
                    severity={snackBarType}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Evaluation;