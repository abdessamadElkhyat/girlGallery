import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import About from "./pages/About";
import "./photo.css"
import "./App.css"
import PhotoSpecial from "./pages/PhotoSpecial";
import PhotoDetail from "./pages/PhotoDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/about" element={<About />} />
              <Route path="/photo-special" element={<PhotoSpecial />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
