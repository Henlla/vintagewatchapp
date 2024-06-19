import { TextField } from "@mui/material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";

const title = "Register Now";
const socialTitle = "Login with Google";
const btnText = "Let's go";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.first_name.value;
    const lastName = form.last_name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    console.log(firstName, lastName, email, password, confirmPassword);
  };
  const handleLoginGoogle = () => {};
  return (
    <div>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form onSubmit={handleRegister} className="account-form">
              <div className="d-flex">
                <div className="form-group pe-2">
                  <TextField
                    type="text"
                    size="small"
                    name="first_name"
                    id="first_name"
                    label="First Name *"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    type="text"
                    size="small"
                    name="last_name"
                    id="last_name"
                    label="Last Name *"
                    fullWidth
                  />
                </div>
              </div>
              <div className="form-group">
                <TextField
                  type="email"
                  size="small"
                  name="email"
                  id="email"
                  label="Email *"
                  fullWidth
                />
              </div>
              <div className="form-group">
                <TextField
                  type="text"
                  size="small"
                  name="password"
                  id="password"
                  label="Password *"
                  fullWidth
                />
              </div>
              <div className="form">
                <TextField
                  type="text"
                  size="small"
                  name="confirm_password"
                  id="confirm_password"
                  label="Confirm password *"
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
              {/* <span className="or">
                <span>or</span>
              </span>
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ui social-icons justify-content-center">
                <GoogleButton onClick={handleLoginGoogle} />
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
