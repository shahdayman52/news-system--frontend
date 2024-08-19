import React, { useState } from "react";
import LatestArticles from "./latestArticle";
import ArticleList from "./articleList";
import SearchBar from "./searchBar";
import FetchUsername from "./fetchUsername";
import "../index.css";

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <div className="header">
        <h1>News App</h1>
        <FetchUsername />
      </div>
      <LatestArticles />
      <div className="buttons">
        <a href="/articles/create">Create New Article</a>
      </div>
      <SearchBar search={search} setSearch={setSearch} />
      <ArticleList search={search} />
    </div>
  );
};

export default HomePage;
