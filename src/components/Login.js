import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import apiClient from "./apiClient"; // Make sure this is configured properly
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../index.css";

//1-login validation
const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  //2-login form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiClient.post("/api/login", values);
      alert("Login successful");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: "An unexpected error occurred" });
      }
      setSubmitting(false);
    }
  };

  //3-login form
  return (
    <div className="register-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(msg) => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password">
                {(msg) => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
            {errors.submit && <div className="error">{errors.submit}</div>}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <h5>Don't have an account?</h5>
            <Link to="/register">Register</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import apiClient from "./apiClient";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import "../index.css";

// //1-login validation
// const Login = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Please enter a valid email address")
//       .required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   //2-login form submission
//   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       const response = await apiClient.post("/api/login", values);
//       alert("Login successful");
//       // Save token to local storage
//       localStorage.setItem("token", response.data.token);
//       // Redirection after successful login
//  navigate("/articles");
//     } catch (error) {
//       // Check for errors and set them
//       if (error.response && error.response.data) {
//         setErrors({ submit: error.response.data.message });
//       }
//       setSubmitting(false);
//     }
//   };

//   //3-login form
//   return (
//     <div className="register-container">
//       <h2>Login</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, errors }) => (
//           <Form className="register-form">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <Field type="email" name="email" />
//               <ErrorMessage name="email" component="div" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Field type="password" name="password" />
//               <ErrorMessage name="password" component="div" />
//             </div>
//             {errors.submit && <div>{errors.submit}</div>}
//             <button type="submit" disabled={isSubmitting}>
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;
