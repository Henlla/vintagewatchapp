import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authAPI from "../api/auth/authAPI";
import AlertSnackBar from "./AlertSnackBar";

const title = "Register Now";
const btnText = "Let's go";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const Signup = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = (value) => {
    if (value === "password")
      setShowPassword((show) => !show);
    else
      setShowConfirmPassword((show) => !show);
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (value) => {
    var data = {
      "firstName": value.first_name,
      "lastName": value.last_name,
      "email": value.email,
      "password": value.password,
      "phoneNumber": value.phone_number,
      "address": value.address
    }
    var response = await authAPI.register(data);
    if (response.isSuccess) {
      setSnackBarMessage("Register success");
      setSnackBarType("success");
      setOpenSnackBar(true);
      await delay(2000)
      navigate("/login", { replace: true });
    }
    else {
      setSnackBarMessage("Register fail");
      setSnackBarType("success");
      setOpenSnackBar(true);
    }
  };

  return (
    <div>
      <AlertSnackBar snackBarMessage={snackBarMessage} snackBarType={snackBarType} handleSnackBarClose={handleSnackBarClose} openSnackBar={openSnackBar} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="account-form">
              <div className="d-flex">
                <div className="form-group pe-2">
                  <TextField
                    error={errors.first_name?.message != null}
                    helperText={errors.first_name?.message != null ? errors.first_name?.message : ""}
                    type="text"
                    size="large"
                    name="first_name"
                    id="first_name"
                    label="First Name *"
                    fullWidth
                    {...register("first_name", { required: "Please enter first name" })}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    error={errors.last_name?.message != null}
                    helperText={errors.last_name?.message != null && errors.last_name?.message}
                    type="text"
                    size="large"
                    name="last_name"
                    id="last_name"
                    label="Last Name *"
                    fullWidth
                    {...register("last_name", {
                      required: "Please enter last name"
                    })}
                  />
                </div>
              </div>
              <div className="form-group">
                <TextField
                  error={errors.email?.message != null}
                  helperText={errors.email?.message != null && errors.email?.message}
                  type="email"
                  size="large"
                  name="email"
                  id="email"
                  label="Email *"
                  fullWidth
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format (xxx@xxx.xxx)"
                    }
                  })}
                />
              </div>
              <div className="form-group">
                <TextField
                  error={errors.phone_number?.message != null}
                  helperText={errors.phone_number?.message != null && errors.phone_number?.message}
                  type="text"
                  size="large"
                  name="phone_number"
                  id="phone_number"
                  label="Phone number *"
                  fullWidth
                  {...register("phone_number", {
                    required: "Please enter phone number"
                  })}
                />
              </div>
              <div className="form-group">
                <FormControl
                  error={errors.password?.message != null}
                  fullWidth
                  size="large"
                  variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", { required: "Please enter password" })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("password")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errors.password?.message && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="form-group">
                <FormControl
                  error={errors.confirm_password?.message != null}
                  fullWidth
                  size="large"
                  variant="outlined">
                  <InputLabel htmlFor="confirm_password">Confirm password</InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    {...register("confirm_password", {
                      required: "Please enter confirm password",
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Confirm password not match"
                        }
                      }
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("confirm_password")}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm password"
                  />
                  {errors.confirm_password?.message && (
                    <FormHelperText>{errors.confirm_password?.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="form-group">
                <TextField
                  error={errors.address?.message != null}
                  helperText={errors.address?.message != null && errors.address?.message}
                  multiline
                  rows={3}
                  type="text"
                  size="large"
                  name="address"
                  id="address"
                  label="Address *"
                  fullWidth
                  {...register("address", {
                    required: "Please enter address"
                  })}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

            {/* account bottom */}
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member ? <Link to={"/login"}>Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
