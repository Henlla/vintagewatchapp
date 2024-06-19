import { TextField } from "@mui/material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const title = "Login";
const socialTitle = "Login with Google";
const btnText = "Login Now";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from.pasthname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    navigate(from, { replace: true });
  };

  const handleLoginGoogle = () => {};

  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form onSubmit={handleLogin} className="account-form">
              <div className="form-group">
                <TextField
                  size="small"
                  label="Email *"
                  name="email"
                  id="email"
                  fullWidth
                />
              </div>
              <div className="form-group">
                <TextField
                  size="small"
                  name="password"
                  id="password"
                  label="Password *"
                  fullWidth
                />
              </div>
              <div>
                {errorMessage && (
                  <div className="error-message text-danger mb-1">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
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
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ui social-icons justify-content-center">
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
