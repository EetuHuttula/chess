import { Link } from "react-router-dom"
import "./nav.css"

const SearchBar = () => {

  return (
    <nav className="navbar">
      <div className="heading_text">
      <h1>Chess.com PlayerSearch</h1>
      </div>
        <div className="links">
        <Link className="nav_link" to="/">Home</Link>
        <Link className="nav_link" to="/PlayerSearch">Player Search</Link>
        </div>
      
    </nav>
  );
};

export default SearchBar;
