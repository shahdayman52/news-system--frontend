import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {jwtDecode}  from "jwt-decode"; 
import "../index.css"; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
//   const [updateFlag, setUpdateFlag] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
     const token = localStorage.getItem("token");
     console.log("Token from localStorage:", token); // Debugging line

     if (token) {
       setIsLoggedIn(true);
       try {
         const decodedToken = jwtDecode(token);
         console.log("Decoded Token:", decodedToken); // Debugging line

         if (decodedToken.role === "admin") {
           setIsAdmin(true);
         } else {
           setIsAdmin(false);
         }
       } catch (error) {
         console.error("Invalid token", error);
         setIsLoggedIn(false);
         setIsAdmin(false);
       }
     } else {
       setIsLoggedIn(false);
       setIsAdmin(false);
     }
   }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false); 
    // setUpdateFlag((prev) => !prev); 
    navigate("/login");
    // console.log("Logged out. isLoggedIn:", isLoggedIn);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin/submittedArticles">Submitted Articles</Link>{" "}
          </li>
        )}
      </ul>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
