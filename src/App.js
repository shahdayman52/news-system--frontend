import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateArticle from "./components/createArticle";
import ArticleList from "./components/articleList";
import UpdateArticle from "./components/updateArticle";
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <nav className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/articles">Home</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/update/:id" element={<UpdateArticle />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
