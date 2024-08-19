import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from './components/navbar'; 
import Register from "./components/Register";
import Login from "./components/Login";
import CreateArticle from "./components/createArticle";
import ArticleList from "./components/articleList";
import UpdateArticle from "./components/updateArticle";
import SubmittedArticles from "./components/submittedArticles";
import HomePage from "./components/Homepage";

import "./App.css";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
         
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/update/:id" element={<UpdateArticle />} />
          <Route
            path="/admin/submittedArticles"
            element={<SubmittedArticles />}
          />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
