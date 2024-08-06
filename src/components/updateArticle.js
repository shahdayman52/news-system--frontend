import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import "../index.css";

const UpdateArticle = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get(`/api/articles/${id}`)
      .then((response) => {
        const { title, content, category } = response.data.article;
        setInitialValues({ title, content, category });
      })
      .catch((error) => {
        setMessage("Error fetching article details");
      });
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title cannot exceed 150 characters"),
    content: Yup.string().max(500, "Content cannot exceed 500 characters"),
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = (values) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    axios
      .put(`/api/articles/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token here
        },
      })
      .then((response) => {
        setMessage("Article updated successfully");
      })
      .catch((error) => {
        setMessage("Error updating article");
      });
  };

  return (
    <div className="container">
      <h2>Update Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
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
          <button type="submit">Update Article</button>
        </Form>
      </Formik>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdateArticle;

// //components/update article
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useParams } from "react-router-dom";
// import "../index.css";

// const UpdateArticle = () => {
//   const { id } = useParams();
//   const [message, setMessage] = useState("");
//   const [initialValues, setInitialValues] = useState({
//     title: "",
//     content: "",
//     category: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`/api/articles/${id}`)
//       .then((response) => {
//         const { title, content, category } = response.data.article;
//         setInitialValues({ title, content, category });
//       })
//       .catch((error) => {
//         setMessage("Error fetching article details");
//       });
//   }, [id]);

//   const validationSchema = Yup.object({
//     title: Yup.string()
//       .min(3, "Title must be at least 3 characters")
//       .max(150, "Title cannot exceed 150 characters"),
//     content: Yup.string().max(500, "Content cannot exceed 500 characters"),
//     category: Yup.string().required("Category is required"),
//   });

//   const onSubmit = (values) => {
//     axios
//       .put(`/api/articles/${id}`, values)
//       .then((response) => {
//         setMessage("Article updated successfully");
//       })
//       .catch((error) => {
//         setMessage("Error updating article");
//       });
//   };

//   return (
//     <div className="container">
//       <h2>Update Article</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//         enableReinitialize
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
//           <button type="submit">Update Article</button>
//         </Form>
//       </Formik>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default UpdateArticle;
