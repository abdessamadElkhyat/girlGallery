import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <h1 className="header-title">Gallery</h1>
      </div>

      <div className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/photos" onClick={() => setMenuOpen(false)}>Photos</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/photo-special" onClick={() => setMenuOpen(false)}>Photo Special</Link>
      </nav>
    </header>
  );
};

export default Header;
