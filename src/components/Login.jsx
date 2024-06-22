import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useContext, useState } from "react";
import GoogleButton from "react-google-button";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authAPI from "../api/auth/authAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext, AuthProvider } from "../utilis/AuthProvider";

const title = "Login";
const socialTitle = "Login with Google";
const btnText = "Login Now";

const Login = () => {
  const { login } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const from = location.state?.from.pasthname || "/";

  const onSubmit = async (data) => {
    var response = await authAPI.login(data)
    if (response.isSuccess) {
      login(response.data)
      navigate(from, { replace: true });
    } else {
      console.log(response.message)
    }
  };

  const handleLoginGoogle = () => { };

  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="account-form">
              <div className="form-group">
                <TextField
                  error={errors.email?.message != null}
                  helperText={errors.email?.message != null && errors.email?.message}
                  size="normal"
                  label="Email *"
                  name="email"
                  id="email"
                  fullWidth
                  {...register("email", { required: "This is required." })}
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
                    id="password"
                    name="password"
                    {...register("password", { required: "This is required" })}
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
              <div className="form-group">
                <div className="d-flex justify-content-end flex-wrap pt-sm-2">
                  <Link to="/forgot-password">Forget Password?</Link>
                </div>
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
                Don't have an account ? <Link to={"/sign-up"}>Sign up</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>
              <h5 className="ps-4 subtitle">{socialTitle}</h5>
              <ul className="d-flex justify-content-center">
                <GoogleButton onClick={handleLoginGoogle} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
