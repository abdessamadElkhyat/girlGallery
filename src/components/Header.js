import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => (
  <header className="header">
    <img src={logo} alt="Logo" className="logo" />

    <h1 className="header-title">Gallery</h1>

    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/photos">Photos</Link>
    </nav>
  </header>
);

export default Header;
