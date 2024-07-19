import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import authAPI from "../../api/auth/authAPI"
import { useForm } from "react-hook-form";
import { useState } from "react";
import AlertSnackBar from "../AlertSnackBar";


const profile = [
    { key: "userId", label: "User ID", column: 6, hidden: true },
    { key: "firstName", label: "First Name", column: 6, hidden: false },
    { key: "lastName", label: "Last Name", column: 6, hidden: false },
    { key: "email", label: "Email", column: 6, hidden: false },
    { key: "phoneNumber", label: "Phone Number", column: 6, hidden: false },
    { key: "address", label: "Address", column: 12, hidden: false }
]

const ProfileInformation = () => {
    const [userId, setUserId] = useState(0);
    const { register, handleSubmit, clearErrors, reset, formState: { errors }, setValue, watch } = useForm();
    const [mainImage, setMainImage] = useState("");
    const mainImageInput = useRef(null);
    // Snack bar
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarType, setSnackBarType] = useState("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);


    useEffect(() => {
        getUserInfo()
    }, []);

    const handleSnackBarClose = () => {
        setOpenSnackBar(false);

    }

    const getUserInfo = async () => {
        var response = await authAPI.checkAuthenticate();
        if (response.isSuccess) {
            setUserId(response.data.userId);
            bindingTextBox(response.data);
        }
    }

    const bindingTextBox = (data) => {
        profile.forEach((item) => {
            setValue(item.key, data[item.key]);
        });
        setMainImage(data["avatar"]);
    }

    const mainImageClick = () => {
        mainImageInput.current.click();
    }

    const handleMainImageChange = async (event) => {
        const file = event.target.files[0];
        var formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId);
        var response = await authAPI.updateUserImage(formData);
        if (response.isSuccess) {
            setSnackBarMessage("Update image success");
            setSnackBarType("success");
            setOpenSnackBar(true);
        }
        getUserInfo();
    }

    const onSubmit = async (data) => {
        var { userId, ...formData } = data;
        var formValue = new FormData();
        formValue.append("userId", JSON.stringify(userId));
        formValue.append("userData", JSON.stringify(formData));
        var response = await authAPI.updateUserInformation(formValue);
        if (response.isSuccess) {
            setSnackBarMessage(response.message);
            setSnackBarType("success");
            setOpenSnackBar(true);
        } else {
            setSnackBarMessage(response.message);
            setSnackBarType("error");
            setOpenSnackBar(true);
        }
        getUserInfo();
    }

    const values = watch();

    return <>
        <AlertSnackBar snackBarMessage={snackBarMessage} snackBarType={snackBarType} openSnackBar={openSnackBar} handleSnackBarClose={handleSnackBarClose} />
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Grid container spacing={1}>
                        {
                            profile.map((item, index) => (
                                !item.hidden &&
                                <Grid key={index} item xs={12} md={item.column}>
                                    <TextField
                                        {...register(item.key, { required: "This is required" })}
                                        error={errors[item.key]?.message != null}
                                        helperText={errors[item.key]?.message}
                                        fullWidth
                                        multiline={item.key === "address"}
                                        rows={item.key === "address" ? 4 : 1}
                                        name={item.key}
                                        label={item.label}
                                        value={values[item.key] || ""}
                                    />
                                </Grid>
                            ))
                        }
                        <Grid item md={12}>
                            <Button type="submit" fullWidth variant="contained">Update</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4}>
                    <img
                        onClick={() => mainImageClick()}
                        className="border border-secondary border-2 rounded-4"
                        src={mainImage}
                        alt="image"
                        width={"300px"} />
                    <input
                        type="file"
                        ref={mainImageInput}
                        onChange={(event) => handleMainImageChange(event)}
                        hidden />
                </Grid>
            </Grid>
        </Box>
    </>;
}

export default ProfileInformation;