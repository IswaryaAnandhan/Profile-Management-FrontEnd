import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { config } from "./config";

function Signup() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Please enter the name";
      } else if (values.name.length > 15) {
        errors.name = "Must be 15 characters or less";
      }
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
        errors.password = "must be more than 8 characters";
      }
      if (!values.cpassword) {
        errors.cpassword = "Please enter the confirm password";
      } else if (values.password.length < 8) {
        errors.cpassword = "must be more than 8 characters";
      }
      if (values.password !== values.cpassword) {
        errors.cpassword = "Password not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/api/auth/signup`, values);
        navigate("/");
        alert("Successfully signup");
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    },
  });
  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block">
              <img
                className="bg-login-image"
                src="./image/register.jpg"
                alt="login"
              />
            </div>
            <div className="col-lg-7">
              <div className="p-4">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                <form className="user" onSubmit={formik.handleSubmit}>
                  <div className="form-group row mb-2">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        type={"text"}
                        className={`form-control form-control-user ${
                          formik.touched.name && formik.errors.name
                            ? "error-box"
                            : ""
                        } ${
                          formik.touched.name && !formik.errors.name
                            ? "success-box"
                            : null
                        }`}
                        id="exampleFirstName"
                        placeholder="Full Name"
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.name}
                        </span>
                      ) : null}
                    </div>
                  </div>

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

                  <div className="form-group row mb-2">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        name="cpassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cpassword}
                        className={`form-control form-control-user ${
                          formik.touched.cpassword && formik.errors.cpassword
                            ? "error-box"
                            : ""
                        } ${
                          formik.touched.cpassword && !formik.errors.cpassword
                            ? "success-box"
                            : null
                        }`}
                        type="password"
                        id="exampleInputConfirmPassword"
                        placeholder="Confirm Password"
                      />
                      {formik.touched.cpassword && formik.errors.cpassword ? (
                        <span style={{ color: "red" }}>
                          {formik.errors.cpassword}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type={"submit"}
                    className="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
