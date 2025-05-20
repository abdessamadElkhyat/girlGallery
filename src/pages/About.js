import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../About.css";

const About = () => {
  return (
    <>
      <Header />

      <div className="about-container">
        <section className="about-hero">
          <h1>À propos de nous</h1>
          <p>
            Bienvenue sur notre plateforme dédiée aux passionnés de photographie.
            Nous sélectionnons les plus belles images pour vous inspirer.
          </p>
        </section>

        <section className="about-content">
          <div className="about-card">
            <h2>Notre Mission</h2>
            <p>
              Offrir une galerie de photos libres de droits, esthétiques et inspirantes,
              issues des meilleures sources comme Pexels et Unsplash.
            </p>
          </div>

          <div className="about-card">
            <h2>Pourquoi nous choisir ?</h2>
            <ul>
              <li>Photos de haute qualité</li>
              <li>Interface simple et élégante</li>
              <li>Accès gratuit et rapide</li>
              <li>Pas de publicité intrusive</li>
            </ul>
          </div>

          <div className="about-card">
            <h2>Notre Vision</h2>
            <p>
              Créer un espace où la créativité visuelle peut s’exprimer librement, tout en valorisant
              les photographes et créateurs du monde entier.
            </p>
          </div>

          <div className="about-card">
            <h2>Notre Équipe</h2>
            <p>
              Nous sommes une équipe passionnée par la technologie et l'art visuel, réunie pour construire
              une plateforme intuitive, moderne et enrichissante.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
