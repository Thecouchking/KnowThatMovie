import MovieTable from "../components/MovieCard"; // Consider renaming this file to MovieTable.js
import { useState, useEffect } from "react";
import { callBackend, searchBackend } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSearchMovies = async () => {
            try {
                setLoading(true);
                const Movies = await searchBackend(searchQuery);
                setMovies(Movies);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch from Backend");
            } finally {
                setLoading(false);
            }
        };
        getSearchMovies();
    }, [searchQuery]);

    return (
        <div className="home">
            <form className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    name="searchval"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : movies.length === 0 ? (
                <div className="no-movies"><h3>No movies found.</h3></div>
            ) : (
                <MovieTable movies={movies} />
            )}
        </div>
    );
}

export default Home;
