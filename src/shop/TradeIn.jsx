import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Collapse, Grid, TextField, styled } from "@mui/material";
import plusImage from "../assets/images/bg-img/plus.png"
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import productAPI from "../api/product/productAPI";
import axios from "axios";

const TradeIn = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const filesInputs = [useRef(null), useRef(null), useRef(null)];
    const [images, setImages] = useState([
        plusImage,
        plusImage,
        plusImage
    ]);
    const [files, setFiles] = useState([null, null, null]);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleImageClick = (index) => {
        filesInputs[index].current.click();
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

    const onSubmit = async (params) => {
        const formData = new FormData();
        files.forEach((file) => {
            if (file) {
                formData.append('files', file)
            }
        })
        // call api to upload image here

    }

    return (
        <Collapse in={props.isClick}>
            <Box component={"form"}
                onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.fullName?.message != null}
                            helperText={errors.fullName?.message != null && errors.fullName?.message}
                            fullWidth
                            size="small"
                            type="text"
                            label="Full name *"
                            id="fullName"
                            name="fullName"
                            {...register("fullName", {
                                required: "This is required"
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={errors.email?.message != null}
                            helperText={errors.email?.message != null && errors.email?.message}
                            fullWidth
                            size="small"
                            type="text"
                            label="Email *"
                            id="email"
                            name="email"
                            {...register("email", {
                                required: "This is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email format (xxx@xxx.xxx)"
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={errors.phoneNumber?.message != null}
                            helperText={errors.phoneNumber?.message != null && errors.phoneNumber?.message}
                            fullWidth
                            size="small"
                            type="text"
                            label="Phone Number *"
                            id="phoneNumber"
                            name="phoneNumber"
                            {...register("phoneNumber", {
                                required: "This is required"
                            })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.address?.message != null}
                            helperText={errors.address?.message != null && errors.address?.message}
                            fullWidth
                            size="small"
                            type="text"
                            label="Address *"
                            id="address"
                            name="address"
                            {...register("address", {
                                required: "This is required"
                            })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.desc?.message != null}
                            helperText={errors.desc?.message != null && errors.desc?.message}
                            fullWidth
                            multiline
                            rows={4}
                            size="small"
                            type="text"
                            label="Description *"
                            id="desc"
                            name="desc"
                            {...register("desc", {
                                required: "This is required"
                            })}
                        />
                    </Grid>
                    <Grid container className="mt-2 ms-2 d-flex justify-content-around">
                        {
                            images.map((src, index) => (
                                <div key={index}>
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
                                </div>

                            ))
                        }

                    </Grid>
                    <Grid container justifyContent={"flex-end"} className="mt-2 py-1">
                        <button type="submit" className="text-white lab-btn ms-2">
                            Send
                        </button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default TradeIn;