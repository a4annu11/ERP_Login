import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export const Logout = () => {
  const navigate = useNavigate();
  const [, , LogoutUser] = useAuth(); // Destructure LogoutUser from useAuth

  useEffect(() => {
    const logout = async () => {
      await LogoutUser();
      navigate('/login'); // Redirect to login page after logout
    };
    logout();
  }, [LogoutUser, navigate]);

  // Render null as this component doesn't render any UI elements
  return null;
};
