import { Box, Button, Collapse, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MakeOffer = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (params) => {
        const email = params.email;
        const fullName = params.fullName;
        const phoneNumber = params.phoneNumber;
        const description = params.desc;
        console.log(email, fullName, phoneNumber, description);
    }

    return (
        <Collapse in={props.isClick}>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.email?.message != null ? true : false}
                            helperText={errors.email?.message != null ? errors.email?.message : ""}
                            id="email"
                            name="email"
                            type="email"
                            fullWidth
                            size="small"
                            label={"Email *"}
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
                            error={errors.fullName?.message != null ? true : false}
                            helperText={errors.fullName?.message != null ? errors.fullName?.message : ""}
                            id="fullName"
                            name="fullName"
                            type="text"
                            fullWidth
                            size="small"
                            label={"Full Name *"}
                            {...register("fullName", { required: "This is required" })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            error={errors.phoneNumber?.message != null ? true : false}
                            helperText={errors.phoneNumber?.message != null ? errors.phoneNumber?.message : ""}
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            fullWidth
                            size="small"
                            label={"Phone number *"}
                            {...register("phoneNumber", { required: "This is required" })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errors.desc?.message != null ? true : false}
                            helperText={errors.desc?.message != null ? errors.desc?.message : ""}
                            id="desc"
                            name="desc"
                            type="text"
                            multiline
                            rows={4}
                            fullWidth
                            size="small"
                            label={"Description *"}
                            {...register("desc", { required: "This is required" })}
                        />
                    </Grid>
                    <Grid container justifyContent={"flex-end"} className="my-2">
                        <button type="submit" className="lab-btn text-white py-2">
                            Send
                        </button>
                    </Grid>
                </Grid>
            </Box>
        </Collapse>
    );
}

export default MakeOffer;