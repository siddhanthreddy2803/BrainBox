import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/v1/signin", inputs);
      if (response.data && response.data.token) {
        sessionStorage.setItem("id",response.data.user._id)
        sessionStorage.setItem("token",response.data.token)
        //console.log(response.data.user._id);
        dispatch(authActions.login({
          token : response.data.token,
          user : response.data.user
        }));
        navigate("/todo");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Sign-in failed. Please check your credentials.");
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column d-flex col-right justify-content-center align-items-center">
            <h1 className="text-center sign-up-heading">
              Sign <br /> In
            </h1>
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column p-5 w-100">
              <input
                className="p-2 my-3 input-signup"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button className="btn-signup p-2" onClick={handleLogin}>
                Sign In
              </button>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
