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

  const fetchPhotos = async () => {
    try {
      setLoading(true);

      const unsplashRes = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: searchTerm || category,
          per_page: 10,
          page,
        },
        headers: {
          Authorization: `Client-ID ${UNSPLASH_KEY}`,
        },
      });

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

      setPhotos(combined);
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
    <div className="container-fluid">
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
        <option value="girl sexy">Girl Sexy</option>
        <option value="muslim girl sexy">Hijabi Sexy</option>
        <option value="girl in underwear">Girl 🩱</option>
      </select>

      {loading ? (
        <div className="loader">
          <div className="spinner" />
          <p>Loading photos...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="no-photos-found">
          <p>No photos found. Try another search.</p>
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
              <a
                href={p.download}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPhoto(p);
                }}
              >
                <img src={p.url} alt={`Image ${index}`} />
              </a>
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
        <button onClick={() => setPage((p) => p + 1)}>➡</button>
      </div>
    </div>
  );
}

export default App;
