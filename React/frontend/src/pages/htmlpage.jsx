import MovieTable from "../components/MovieTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import { searchBackend } from "../services/api";
import "../css/Home.css";
import Dummy from "../components/Dummy";

function Htmlpage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

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

    const indexOfLastMovie = currentPage * entriesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - entriesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    return (
        <div className="home">
            <form className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    name="searchval"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <select
                    className="entries-dropdown"
                    value={entriesPerPage}
                    onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                </select>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : movies.length === 0 ? (
                <div className="no-movies"><h3>No movies found.</h3></div>
            ) : (
                <Dummy>
                    <MovieTable movies={currentMovies} />
                    <Pagination
                        totalPosts={movies.length}
                        postsPerPage={entriesPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </Dummy>
            )}
        </div>
    );
}

export default Htmlpage;
