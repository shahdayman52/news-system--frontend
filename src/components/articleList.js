import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "./apiClient";


const ArticleList = ({ search }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("createdAt");
  const [dir, setDir] = useState("desc");
  const [error, setError] = useState(null);
  const ARTICLES_PER_PAGE = 3;

  useEffect(() => {
    fetchArticles();
  }, [page, sort, dir, search]);

  const fetchArticles = async () => {
    try {
      const offset = 3;
      const response = await apiClient.get(
        `/api/articles?page=${page}&sort=${sort}&dir=${dir}&search=${search}&offset=${offset}&limit=${ARTICLES_PER_PAGE}`
      );
      setArticles(response.data.articles);
      const total = response.data.pagination.total || 0;
      setTotalPages(Math.ceil(total / ARTICLES_PER_PAGE));
    } catch (error) {
      setError("Failed to fetch articles");
    }
  };

  const deleteArticle = async (id) => {
    try {
      await apiClient.delete(`/api/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  //   //PAGINATION

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    //  Show "Previous" button
    if (page > 1) {
      pages.push(
        <button key="prev" onClick={() => handlePageClick(page - 1)}>
          Previous
        </button>
      );
    }

    // Render page numbers with ellipsis logic
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={page === i ? "active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first few pages, ellipsis, and the last page
      for (let i = 1; i <= maxPagesToShow; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={page === i ? "active" : ""}
            >
              {i}
            </button>
          );
        } else if (i === page - 2 || i === page + 2) {
          pages.push(<span key={`ellipsis-${i}`}>...</span>);
        }
      }
    }

    //Show "Next" button
    if (page < totalPages) {
      pages.push(
        <button key="next" onClick={() => handlePageClick(page + 1)}>
          Next
        </button>
      );
    }

    return <div className="pagination">{pages}</div>;
  };
  return (
    <div>
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
          {articles.length > 0 ? (
            articles.map((article) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="4">No articles found</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default ArticleList;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../index.css";
// import apiClient from "./apiClient";

// const ArticleList = () => {
//   const [latestArticles, setLatestArticles] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sort, setSort] = useState("createdAt");
//   const [dir, setDir] = useState("desc");
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("");
//   const token = localStorage.getItem("token"); // Retrieve token from localStorage
//   const ARTICLES_PER_PAGE = 3; // Number of articles per page

//   //fetching the username
//   useEffect(() => {
//     const fetchUsername = async () => {
//       if (token) {
//         try {
//           const decodedToken = JSON.parse(atob(token.split(".")[1]));
//           const userId = decodedToken.id;

//           const response = await apiClient.get(`/api/users/${userId}/username`);
//           setUsername(response.data.username);
//         } catch (error) {
//           console.error("Error fetching username:", error);
//         }
//       }
//     };
//     fetchUsername();
//   }, [token]);

//   // Fetch the latest 3 articles
//   useEffect(() => {
//     const fetchLatestArticles = async () => {
//       try {
//         const response = await apiClient.get(
//           `/api/articles?sort=createdAt&dir=desc&limit=3`
//         );
//         setLatestArticles(response.data.articles);
//       } catch (error) {
//         setError("Failed to fetch latest articles");
//       }
//     };
//     fetchLatestArticles();
//   }, []);

//   // Fetch remaining articles excluding the latest 3
//   useEffect(() => {
//     fetchArticles();
//   }, [page, sort, dir, search]);

//   const fetchArticles = async () => {
//     try {
//       const offset = 3; // Skip the latest 3 articles
//       const response = await apiClient.get(
//         `/api/articles?page=${page}&sort=${sort}&dir=${dir}&search=${search}&offset=${offset}&limit=${ARTICLES_PER_PAGE}`
//       );
//       console.log(response.data); // HIGHLIGHTED: Debugging log
//       setArticles(response.data.articles);
//       const total = response.data.pagination.total || 0;
//       setTotalPages(Math.ceil(total / ARTICLES_PER_PAGE));
//     } catch (error) {
//       setError("Failed to fetch articles");
//     }
//   };

//   const deleteArticle = async (id) => {
//     try {
//       await apiClient.delete(`/api/articles/${id}`);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error deleting article", error);
//     }
//   };

//   //PAGINATION

//   const handlePageClick = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   const renderPagination = () => {
//     const pages = [];
//     const maxPagesToShow = 5;

//     //  Show "Previous" button
//     if (page > 1) {
//       pages.push(
//         <button key="prev" onClick={() => handlePageClick(page - 1)}>
//           Previous
//         </button>
//       );
//     }

//     // Render page numbers with ellipsis logic
//     if (totalPages <= maxPagesToShow) {
//       // Show all pages if total pages is less than or equal to maxPagesToShow
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(
//           <button
//             key={i}
//             onClick={() => handlePageClick(i)}
//             className={page === i ? "active" : ""}
//           >
//             {i}
//           </button>
//         );
//       }
//     } else {
//       // Show first few pages, ellipsis, and the last page
//       for (let i = 1; i <= maxPagesToShow; i++) {
//         if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
//           pages.push(
//             <button
//               key={i}
//               onClick={() => handlePageClick(i)}
//               className={page === i ? "active" : ""}
//             >
//               {i}
//             </button>
//           );
//         } else if (i === page - 2 || i === page + 2) {
//           pages.push(<span key={`ellipsis-${i}`}>...</span>);
//         }
//       }
//     }

//     //Show "Next" button
//     if (page < totalPages) {
//       pages.push(
//         <button key="next" onClick={() => handlePageClick(page + 1)}>
//           Next
//         </button>
//       );
//     }

//     return <div className="pagination">{pages}</div>;
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>News App</h1>
//         <div className="username">
//           {username ? <h1>Hello, {username}!</h1> : <h1>Welcome!</h1>}
//         </div>
//       </div>
//       <div className="latest-news">
//         <h2>Latest News</h2>
//         <p>Explore our latest news</p>
//         <div className="news-cards">
//           {latestArticles.length > 0 ? (
//             latestArticles.map((latestArticle) => (
//               <div className="news-card" key={latestArticle.id}>
//                 <h3>{latestArticle.title}</h3>
//                 <p>{latestArticle.content}</p>
//               </div>
//             ))
//           ) : (
//             <p>No latest articles available</p>
//           )}
//         </div>
//       </div>
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
//           {articles.length > 0 ? (
//             articles.map((article) => (
//               <tr key={article.id}>
//                 <td>{article.title}</td>
//                 <td>{article.content}</td>
//                 <td>{article.category}</td>
//                 <td>
//                   <Link to={`/articles/update/${article.id}`} className="btn">
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => deleteArticle(article.id)}
//                     className="btn"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No articles found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {totalPages > 1 && renderPagination()}

//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default ArticleList;
