import React from "react";
import { Link } from "react-router-dom";


const Header = () => (
  <header className="header">
    <img src="../assets/logo.png" alt="Logo" className="logo" />

    <h1 className="header-title">Gallery</h1>

    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/photos">Photos</Link>
    </nav>
  </header>
);

export default Header;
