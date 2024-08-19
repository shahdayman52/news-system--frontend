import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";
import "../index.css";

const SubmittedArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiClient.get("/api/admin/submitted",);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

async function handleAccept(id) {
  try {
    const response = await apiClient.post(`/api/articles/accept/${id}`);
    setArticles(
      articles.map((article) =>
        article.id === id ? { ...article, status: "Approved" } : article
      )
    );
    console.log("Article accepted:", response.data);
  } catch (error) {
    console.error(
      "Error accepting article:",
      error.response?.data || error.message
    );
    setError("Failed to accept article");
  }
}

async function handleReject(id) {
  try {
    const response = await apiClient.post(`/api/articles/reject/${id}`);
    setArticles(
      articles.map((article) =>
        article.id === id ? { ...article, status: "Rejected" } : article
      )
    );
    console.log("Article rejected:", response.data);
  } catch (error) {
    console.error(
      "Error rejecting article:",
      error.response?.data || error.message
    );
    setError("Failed to reject article");
  }
}

  return (
    <div className="container">
      <h1>Submitted Articles</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.author?.username}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.category}</td>
              <td>{article.status}</td>
              <td>
                <button
                  className="buttons"
                  onClick={() => handleAccept(article.id)}
                >
                  Accept
                </button>
                <button
                  className="buttons"
                  onClick={() => handleReject(article.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SubmittedArticleList;
