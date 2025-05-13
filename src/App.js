import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Masonry from "react-masonry-css";
import logo from "./img/logo.png";

const UNSPLASH_KEY = "cHbiVyZigUPQ5PeVlahY90doCtXucdcjj5Oob3OwQ9c";
const PEXELS_KEY = "gVcnpkFuk1q43nei90zzgh8OJPz69zj9URJxYRJgnECh6kwKmmmycp1D";

function App() {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("girl sexy");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fetch photos from Unsplash and Pexels APIs
  const fetchPhotos = async () => {
    try {
      setLoading(true);

      const unsplashRes = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchTerm || category,
            per_page: 10,
            page,
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`,
          },
        }
      );

      const pexelsRes = await axios.get("https://api.pexels.com/v1/search", {
        params: {
          query: searchTerm || category,
          per_page: 10,
          page,
        },
        headers: {
          Authorization: PEXELS_KEY,
        },
      });

      const combined = [
        ...unsplashRes.data.results.map((p) => ({
          id: "u_" + p.id,
          url: p.urls.small,
          download: p.urls.full,
          source: "unsplash",
        })),
        ...pexelsRes.data.photos.map((p) => ({
          id: "p_" + p.id,
          url: p.src.medium,
          download: p.src.original,
          source: "pexels",
        })),
      ];

      setPhotos((prevPhotos) => [...prevPhotos, ...combined]); // append new photos to previous ones
    } catch (err) {
      console.error("Error fetching photos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [category, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setPhotos([]); // Clear photos before starting new search
    fetchPhotos();
  };

  const handleDownload = async (url, id) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `photo-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="container-fuild">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Girls Gallery</h1>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">🔍 Search</button>
      </form>

      <select
        className="category-select"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSearchTerm("");
          setPage(1);
        }}
      >
        <option value="girl">All</option>
        <option value="girl sexy">girl sexy</option>
        <option value="muslim girl sexy">Hijabi sexy</option>
        <option value="girl in underwear">girl 🩱</option>
      </select>

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading photos...</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={{
            default: 4,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((p, index) => (
            <div key={index} className="photo-card">
              <img
                src={p.url}
                alt={`Image ${index}`}
                onClick={() => setSelectedPhoto(p)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </Masonry>
      )}

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto.download} alt="full" />
          <div className="modal-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedPhoto.download, selectedPhoto.id);
              }}
            >
              ⬇️ Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="close-btn"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => {
            setPage((p) => p + 1);
            fetchPhotos(); // Fetch new photos when clicking load more
          }}
        >
          Load More ➡
        </button>
      </div>
    </div>
  );
}

export default App;
