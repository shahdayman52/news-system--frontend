import { useNavigate } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("token");
  const navigate = useNavigate();
  navigate("/login");
};
