import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../PhotoDetail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PhotoDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Photo non trouvée.</p>;

  return (
    <>
      <Header />
      <div className="photo-detail-container">
        <button onClick={() => navigate(-1)}>⬅ Retour</button>
        <h1>{state.title}</h1>
        <img src={state.src} alt={state.title} />

        <p>{state.description}</p>
      </div>
      <Footer />
    </>
  );
};

export default PhotoDetail;
