import { useState, useEffect } from "react";
import "../css/Modal.css";
import { searchBackend } from "../services/api";
function Dummy(param) {
  const dt = new Date(param);
  const format_date = dt.toISOString().split("T")[0];
  return format_date;
}

function Modal({ onClose, movie }) {
  const [formData, setFormData] = useState({
    title: "",
    release_date: "",
    vote_average: "",
    vote_count: "",
    original_language: "",
    overview: "",
    poster_path: ""
  });

  const [message, setMessage]=useState("");           
  const [isSuccess, setIsSuccess]=useState(null);     
  
  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        release_date: Dummy(movie.release_date),
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        original_language: movie.original_language,
        overview: movie.overview,
        poster_path: movie.poster_path
      });
    }
  }, [movie]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/movies", {
        method: movie ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _id: movie._id })
      });

      const result = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setMessage(movie ? "Movie updated successfully!" : "Movie added successfully!");
        console.log(message,result);
        setTimeout(() => {
          setMessage("");
          setIsSuccess(null);
          onClose(); 
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage("An error occurred while saving the movie.");
      }

    } catch (error) {
      console.error("Error saving movie:", error);
      setIsSuccess(false);
      setMessage("Failed to save the movie. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{movie ? "Edit Movie" : "Add a New Movie"}</h2>

        {message && (
          <div className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <label>Movie Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Release Date:</label>
              <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Rating:</label>
              <input type="number" step="0.01" name="vote_average" value={formData.vote_average} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Votes:</label>
              <input type="number" name="vote_count" value={formData.vote_count} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Language (2-letter code):</label>
              <input type="text" name="original_language" maxLength="2" value={formData.original_language} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Overview:</label>
              <input type="text" name="overview" value={formData.overview} onChange={handleChange} required />
            </div>
            <div className="input-row">
              <label>Poster Path:</label>
              <input type="text" name="poster_path" value={formData.poster_path} onChange={handleChange} />
            </div>
            <div className="buttons">
              <button type="button" onClick={onClose}>Close</button>
              <button type="submit">{movie ? "Update" : "Submit"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
