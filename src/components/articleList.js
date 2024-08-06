import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [dir, setDir] = useState("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [page, sort, dir, search]);

  const fetchArticles = () => {
    const token = localStorage.getItem("token"); // Retrieve el token from localStorage

    axios
      .get(
        `/api/articles?page=${page}&sort=${sort}&dir=${dir}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach el token here
          },
        }
      )
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching articles", error);
      });
  };

  const deleteArticle = (id) => {
    const token = localStorage.getItem("token"); // Retrieve el token from localStorage same step

    axios
      .delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach el token here
        },
      })
      .then((response) => {
        fetchArticles();
      })
      .catch((error) => {
        console.error("Error deleting article", error);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>News App</h1>
        <div className="username">Welcome Username!</div>
      </div>
      <div className="latest-news">
        <h2>Latest News</h2>
        <p>Explore our latest news</p>
      </div>
      <div className="news-cards">
        {articles.slice(0, 4).map((article) => (
          <div className="news-card" key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <div className="buttons">
        <Link to="/articles/create">Create New Article</Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
        />
        <button onClick={() => fetchArticles()}>Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => setSort("title")}>Title</th>
            <th>Content</th>
            <th onClick={() => setSort("category")}>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.category}</td>
              <td>
                <Link to={`/articles/update/${article.id}`} className="btn">
                  Edit
                </Link>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ArticleList;

// //component/article list
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../index.css";

// const ArticleList = () => {
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState("createdAt");
//   const [dir, setDir] = useState("desc");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchArticles();
//   }, [page, sort, dir, search]);

//   const fetchArticles = () => {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//     axios
//       .get(
//         `/api/articles?page=${page}&sort=${sort}&dir=${dir}&search=${search}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token here
//           },
//         }
//       )
//       .then((response) => {
//         setArticles(response.data.articles);
//       })
//       .catch((error) => {
//         console.error("Error fetching articles", error);
//       });
//   };

//   const deleteArticle = (id) => {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//     axios
//       .delete(`/api/articles/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach the token here
//         },
//       })
//       .then((response) => {
//         fetchArticles();
//       })
//       .catch((error) => {
//         console.error("Error deleting article", error);
//       });
//   };

//   // useEffect(() => {
//   //   fetchArticles();
//   // }, [page, sort, dir, search]);

//   // const fetchArticles = () => {
//   //   axios
//   //     .get(
//   //       `/api/articles?page=${page}&sort=${sort}&dir=${dir}&search=${search}`
//   //     )
//   //     .then((response) => {
//   //       setArticles(response.data.articles);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching articles", error);
//   //     });
//   // };

//   // const deleteArticle = (id) => {
//   //   axios
//   //     .delete(`/api/articles/${id}`)
//   //     .then((response) => {
//   //       fetchArticles();
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error deleting article", error);
//   //     });
//   // };

//   return (
//     <div className="container">
//       <h2>Articles</h2>
//       <div className="buttons">
//         <Link to="/articles/create">Create New Article</Link>
//       </div>
//       <div className="search-bar">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search articles..."
//         />
//         <button onClick={() => fetchArticles()}>Search</button>
//       </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th onClick={() => setSort("title")}>Title</th>
//             <th>Content</th>
//             <th onClick={() => setSort("category")}>Category</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {articles.map((article) => (
//             <tr key={article.id}>
//               <td>{article.title}</td>
//               <td>{article.content}</td>
//               <td>{article.category}</td>
//               <td>
//                 <Link to={`/articles/update/${article.id}`} className="btn">
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => deleteArticle(article.id)}
//                   className="btn"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//           Previous
//         </button>
//         <button onClick={() => setPage(page + 1)}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default ArticleList;
