import React, { useEffect, useState } from "react";
import axios from "axios";

const UNSPLASH_KEY = "cHbiVyZigUPQ5PeVlahY90doCtXucdcjj5Oob3OwQ9c";
const PEXELS_KEY = "gVcnpkFuk1q43nei90zzgh8OJPz69zj9URJxYRJgnECh6kwKmmmycp1D";

function App() {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState("girl sexy");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // ✅ للصورة المكبرة

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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>📸 Girls Gallery</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={{
            padding: "2px",
            width: "200px",
            marginRight: "10px",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "4px 16px",
            color: "white",
            backgroundColor: "blue",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </form>

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSearchTerm("");
          setPage(1);
        }}
        style={{ padding: "8px", marginBottom: "20px" }}
      >
        <option value="girl">All</option>
        <option value="girl sexy">girl sexy</option>
        <option value="muslim girl sexy">Hijabi sexy</option>
        <option value="girl in underwear">girl 🩱</option>
      </select>

      {loading ? (
        <div style={{ marginTop: "40px" }}>
          <div className="spinner" />
          <p>Loading photos...</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                src={photo.url}
                alt="photo"
                onClick={() => setSelectedPhoto(photo)} // 👈 عند الضغط تفتح الصورة
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* نافذة منبثقة عند الضغط على صورة */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <img
            src={selectedPhoto.download}
            alt="full"
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "10px",
              boxShadow: "0 0 20px #000",
            }}
          />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedPhoto.download, selectedPhoto.id);
              }}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              ⬇️ Download
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          ⬅ Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Next ➡
        </button>
      </div>

      {/* Loader CSS */}
      <style>
        {`
        .spinner {
          margin: 0 auto;
          width: 50px;
          height: 50px;
          border: 5px solid #ccc;
          border-top-color: #2196f3;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}
      </style>
    </div>
  );
}

export default App;
