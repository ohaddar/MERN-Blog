import { Link } from "react-router-dom";
import { AuthContext } from "../Files/AuthContext";
import { useContext } from "react";

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="flex justify-between items-center py-4 px-6">
        <Link to="/" className="ms-4">
          MyBlog
        </Link>
        {isAuthenticated ? (
          <div className="flex space-x-4">
            <Link to="/create" className="">
              {" "}
              Create new post
            </Link>
            <a onClick={logout} className="">
              Logout
            </a>
          </div>
        ) : (
          <div className=" flex space-x-4 ">
            <Link to="/login" className="px-4 py-2 font-bold ">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2  font-bold">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
