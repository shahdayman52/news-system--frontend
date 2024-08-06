import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient"; 


const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(150, "Username cannot exceed 150 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])/,
        "Password must contain numbers, letters, and special characters"
      )
      .required("Password is required"),
  });



  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post("/api/register", values);
      console.log("Response:", response); // Debugging line
      alert("Registration successful");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error:", error); // Debugging line
      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "An error occurred" });
      }
      setSubmitting(false);
    }
  };

  // const onSubmit = async (values) => {
  //   try {
  //   const response = await apiClient.post("/api/register", values);
  //     if (response.status === 201) {
  //       alert("User registered successfully");
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
