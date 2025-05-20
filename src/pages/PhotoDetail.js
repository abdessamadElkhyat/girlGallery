import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import data from "../data/photos.json";
import "../PhotoDetail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PhotoDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Photo non trouvée.</p>;

  const similarPhotos = data
    .filter(photo => photo.category === state.category && photo.id !== state.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  const handleClick = (photo) => {
    navigate(`/photo/${photo.id}`, { state: photo });
  };

  return (
    <>
      <Header />
      <div className="photo-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>⬅ Retour</button>
        <div className="main-photo-section">
          <h1>{state.title}</h1>
          <img className="main-photo" src={state.src} alt={state.title} />
          <p>{state.description}</p>
        </div>

        <h2 className="similar-title">Photos similaires dans la catégorie "{state.category}"</h2>
        <div className="similar-photo-grid">
          {similarPhotos.map((photo) => (
            <div
              key={photo.id}
              className="modern-photo-card"
              onClick={() => handleClick(photo)}
            >
              <img src={photo.src} alt={photo.title} />
              <div className="card-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PhotoDetail;
