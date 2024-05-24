import { Link } from "react-router-dom";
import { AuthContext } from "../Files/AuthContext";
import { useContext } from "react";
import "../output.css";

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="bg-red-950 w-4/5 ml-96">
      <header>
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
    </div>
  );
};
