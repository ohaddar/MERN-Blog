import { Link } from "react-router-dom";
import { AuthContext } from "../Files/AuthContext";
import { useContext } from "react";

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="flex justify-between items-center py-4 px-6">
        <Link to="/" className="ms-6 mt-4 font-bold ">
          MyBlog
        </Link>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="text-white bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
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
