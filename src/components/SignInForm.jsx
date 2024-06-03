// import axios from "axios";
import React, { useState } from "react";
import authApi from "../api/authAPI";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState([]);

  // useEffect(() => {
    const fetchLogin = async () => {
      var data = {
        username: state.email,
        password: state.password
      }

      try {
        var response = await authApi.login(data);
        setMessage(response)
        console.log(message)
      } catch (error) {
        console.log(error)
      }
    }
  // }, [])

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    // const { email, password } = state;
    fetchLogin()

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="test.html" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="test.html" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="test.html" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="test.html">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;