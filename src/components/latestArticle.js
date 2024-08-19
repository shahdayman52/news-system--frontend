import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";

const LatestArticles = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await apiClient.get(
          "/api/articles?sort=createdAt&dir=desc&limit=3"
        );
        setLatestArticles(response.data.articles);
      } catch (error) {
        setError("Failed to fetch latest articles");
      }
    };
    fetchLatestArticles();
  }, []);

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      <p>Explore our latest news</p>
      <div className="news-cards">
        {latestArticles.length > 0 ? (
          latestArticles.map((article) => (
            <div className="news-card" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))
        ) : (
          <p>No latest articles available</p>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LatestArticles;
