import React, { useState } from "react";
import data from "../data/photos.json";
import { useNavigate } from "react-router-dom";
import "../PhotoSpecial.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PhotoSpecial = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 10;
  const navigate = useNavigate();

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = data.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const totalPages = Math.ceil(data.length / photosPerPage);

  const handleClick = (photo) => {
    navigate(`/photo/${photo.id}`, { state: photo });
  };

  return (
    <>
          <Header />
      <div className="photo-special-container">
        <h1>Galerie Spéciale</h1>
        <div className="photo-grid">
          {currentPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => handleClick(photo)}
            >
              <img src={photo.src} alt={photo.title} />
              <h3>{photo.title}</h3>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={currentPage === idx + 1 ? "active" : ""}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default PhotoSpecial;
