import { Link } from "react-router-dom";
import { AuthContext } from "../Files/AuthContext";
import { useContext } from "react";

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="Header">
      <nav>
        <Link to="/" className="Logo">
          MyBlog
        </Link>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
