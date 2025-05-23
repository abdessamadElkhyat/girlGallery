import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../data/photos.json";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // نختار 12 صورة بشكل عشوائي
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 12);
    setPhotos(selected);
  }, []);

  return (
    <>
      <Header />

      <div className="home-hero">
        <img
          src="assets/hero.jpg"
          alt="Beautiful girl"
          className="hero-img"
        />
        <div className="hero-text">
          <h1>Découvrez des photos époustouflantes</h1>
          <p>Des images de haute qualité, libres de droits, pour inspirer votre créativité.</p>
          <Link to="/photos" className="cta-button">Explorer la Galerie ➡</Link>
        </div>
      </div>

      <section className="manual-photos">
        <h2>Photos Sélectionnées</h2>
        <div className="manual-gallery">
          {photos.map((photo) => (
            <div key={photo.id} className="manual-card">
              <img src={photo.src} alt={photo.title} />
              <p>{photo.description}</p>
            </div>
          ))}
        </div>
        <div className="more-button-wrapper">
          <Link to="/photo-special" className="cta-button">Plus de photos ➡</Link>
        </div>
      </section>

      <section className="about-description">
        <h2>À propos du site</h2>
        <p>
          Ce site a pour but de partager les plus belles images trouvées sur le web,
          combinant les API Pexels et Unsplash pour vous offrir le meilleur.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default Home;
