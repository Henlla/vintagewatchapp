import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authAPI from "../api/auth/authAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../utilis/AuthProvider";
import AlertSnackBar from "../components/AlertSnackBar";

const title = "Login";
const socialTitle = "Login with Google";
const btnText = "Login Now";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Login = () => {
  const { saveLoggedUserData } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const from = location.state?.from.pathname || "/";

  const onSubmit = async (data) => {
    var response = await authAPI.login(data);
    if (response.isSuccess) {
      saveLoggedUserData(response.data, response.isSuccess)
      var role = response.data.role.roleName;
      if (role == "ADMIN" || role == "APPRAISER") {
        setSnackBarMessage("Login success");
        setSnackBarType("success");
        setOpenSnackBar(true);
        // await delay(2000);
        navigate("/dashboard", { replace: true });
      } else {
        setSnackBarMessage("Login success");
        setSnackBarType("success");
        setOpenSnackBar(true);
        // await delay(2000);
        navigate(from, { replace: true });
      }
    } else {
      setSnackBarMessage("Invalid username or password");
      setSnackBarType("error");
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
              <div className="form-group">
                <TextField
                  {...register("email", {
                    required: "Please enter email.", pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format (xxx@xxx.xxx)"
                    }
                  })}
                  error={errors.email?.message != null}
                  helperText={errors.email?.message}
                  size="normal"
                  label="Email *"
                  name="email"
                  id="email"
                  fullWidth
                />
              </div>
              <div className="form-group">
                <FormControl
                  error={errors.password?.message != null}
                  fullWidth
                  size="normal"
                  variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    {...register("password", { required: "Please enter password." })}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
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
                    <FormHelperText>{errors.password?.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              {/* <div className="form-group">
                <div className="d-flex justify-content-end flex-wrap pt-sm-2">
                  <Link to="/forgot-password">Forget Password?</Link>
                </div>
              </div> */}
              <div className="form-group">
                <button type="submit" className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

            {/* account bottom */}
            <div className="account-bottom">
              <span className="d-block cate">
                Don't have an account ? <Link to={"/sign-up"}>Sign up</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>
              <h5 className="subtitle">{socialTitle}</h5>
              <Link to={"http://localhost:5009/auth/signinWithGoogle"}>
                <GoogleButton />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
