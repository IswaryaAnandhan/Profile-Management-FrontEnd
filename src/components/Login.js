import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "./config";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },  
      validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please enter the email id";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Please enter the password";
      } else if (values.password.length < 8) {
        errors.password = "must be 8 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`${config.api}/api/auth/login`, values);
        localStorage.setItem("myprofile", user.data.token);
        if (user.data.message === "Success") {
          navigate("/EditProfile");
          alert("Successfully Logged in");
        }else {
          alert("Incorrect email/password" );
        }
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-4 d-none d-lg-block">
              <img
                className="bg-login-image"
                src="./image/login.jpg"
                alt="login"
              />
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Login in your account!</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-2">
                    <input
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={`form-control form-control-user ${
                        formik.touched.email && formik.errors.email
                          ? "error-box"
                          : ""
                      } ${
                        formik.touched.email && !formik.errors.email
                          ? "success-box"
                          : null
                      }`}
                      type="email"
                      id="exampleInputEmail"
                      placeholder="Email Address"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <span style={{ color: "red" }}>
                        {formik.errors.email}
                      </span>
                    ) : null}
                  </div>
   
                  <div className="form-group row mb-2">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`form-control form-control-user ${
                          formik.touched.password && formik.errors.password
                            ? "error-box"
                            : ""
                        } ${
                          formik.touched.password && !formik.errors.password
                            ? "success-box"
                            : null
                        }`}
                        type="password"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type={"submit"}
                    className="btn btn-primary btn-user btn-block"
                  >
                  Login
                  </button>
                </form>
                <div className="text-center mb-2">
                  <Link to={"/signup"}>Create an Account!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;