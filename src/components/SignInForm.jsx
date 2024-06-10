// import axios from "axios";
import React, { useEffect } from "react";
import authApi from "../api/authAPI";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const fetchLogin = async (data) => {
      try {
        var response = await authApi.login(data);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;

    var data = {
      username: email,
      password: password
    }


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