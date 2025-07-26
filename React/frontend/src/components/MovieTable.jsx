import "../css/MovieTable.css";
function MovieTable({ movies }) {
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <table className="movie-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Rating</th>
                    <th>Votes</th>
                    <th>Language</th>
                    <th>Overview</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{formatDate(movie.release_date)}</td>
                        <td>{movie.vote_average}</td>
                        <td>{movie.vote_count}</td>
                        <td>{movie.original_language}</td>
                        <td>{movie.overview}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    );
}
export default MovieTable;