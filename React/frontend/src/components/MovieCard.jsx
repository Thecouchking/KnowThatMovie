import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState } from "react"
import Modal from "./Modal";
function MovieCard({movie}){
    const [editMovie,setEditMovie]=useState(false);
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)    
    function onFavouriteClick(e){
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)  
    }
    const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavouriteClick}>
                   ♥ 
                </button>
                <button className="edit-button"onClick={() => setEditMovie(true)}>✎</button>
            </div>
        </div>
    <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{formatDate(movie.release_date)}</p>
    </div>
      {editMovie && (<Modal movie={movie} onClose={() => setEditMovie(false)}/>)}        
    </div>
}
export default MovieCard