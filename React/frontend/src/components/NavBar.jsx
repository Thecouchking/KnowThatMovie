import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useState } from "react";
import Modal from "./Modal";

function NavBar() {
  const [addMovie, setAddMovie] = useState(false);

  return (
    <>
      <div className={`app-content ${addMovie ? "blurred" : ""}`}>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/">KnowThatMovie</Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favourites" className="nav-link">Favorites</Link>
            <Link to="/table" className="nav-link">Html Version</Link>
            <button onClick={() => setAddMovie(true)}>Add Movie</button>
          </div>
        </nav>
      </div>
      {addMovie && <Modal onClose={() => setAddMovie(false)} />}
    </>
  );
}

export default NavBar;
