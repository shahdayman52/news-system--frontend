import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../index.css";

const CreateArticle = () => {
  const [message, setMessage] = useState("");

  const initialValues = {
    title: "",
    content: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title cannot exceed 150 characters"),
    content: Yup.string().max(500, "Content cannot exceed 500 characters"),
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    axios
      .post("/api/articles", values, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token here
        },
      })
      .then((response) => {
        setMessage("Article created successfully");
        resetForm();
      })
      .catch((error) => {
        setMessage("Error creating article");
      });
  };

  return (
    <div className="container">
      <h2>Create Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field as="select" id="category" name="category">
              <option value="">Select a category</option>
              <option value="Sport">Sport</option>
              <option value="Tourism">Tourism</option>
              <option value="News">News</option>
            </Field>
            <ErrorMessage name="category" component="div" className="error" />
          </div>
          <button type="submit">Create Article</button>
        </Form>
      </Formik>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateArticle;

// //component/create article
// import React, { useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import "../index.css";

// const CreateArticle = () => {
//   const [message, setMessage] = useState("");

//   const initialValues = {
//     title: "",
//     content: "",
//     category: "",
//   };

//   const validationSchema = Yup.object({
//     title: Yup.string()
//       .required("Title is required")
//       .min(3, "Title must be at least 3 characters")
//       .max(150, "Title cannot exceed 150 characters"),
//     content: Yup.string().max(500, "Content cannot exceed 500 characters"),
//     category: Yup.string().required("Category is required"),
//   });

//   const onSubmit = (values, { resetForm }) => {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//     axios
//       .post("/api/articles", values, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach the token here
//         },
//       })
//       .then((response) => {
//         setMessage("Article created successfully");
//         resetForm();
//       })
//       .catch((error) => {
//         setMessage("Error creating article");
//       });
//   };

// //   const onSubmit = (values, { resetForm }) => {
// //     axios
// //       .post("/api/articles", values)
// //       .then((response) => {
// //         setMessage("Article created successfully");
// //         resetForm();
// //       })
// //       .catch((error) => {
// //         setMessage("Error creating article");
// //       });
// //   };

//   return (
//     <div className="container">
//       <h2>Create Article</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         <Form>
//           <div>
//             <label htmlFor="title">Title</label>
//             <Field type="text" id="title" name="title" />
//             <ErrorMessage name="title" component="div" className="error" />
//           </div>
//           <div>
//             <label htmlFor="content">Content</label>
//             <Field as="textarea" id="content" name="content" />
//             <ErrorMessage name="content" component="div" className="error" />
//           </div>
//           <div>
//             <label htmlFor="category">Category</label>
//             <Field as="select" id="category" name="category">
//               <option value="">Select a category</option>
//               <option value="Sport">Sport</option>
//               <option value="Tourism">Tourism</option>
//               <option value="News">News</option>
//             </Field>
//             <ErrorMessage name="category" component="div" className="error" />
//           </div>
//           <button type="submit">Create Article</button>
//         </Form>
//       </Formik>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default CreateArticle;
