import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="Header">
      <Link to="/" className="Logo">
        MyBlog
      </Link>
      <nav className="headerNav">
        <Link to="/Login" className="Login">
          Login
        </Link>
        <Link to="/Register" className="Register">
          Register
        </Link>
      </nav>
    </div>
  );
}
