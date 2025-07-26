//provide helper function so i can use states on different pages
import { createContext,useState,useContext,useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites]  = useState(() => {
        return JSON.parse(localStorage.getItem('favorites'))
     });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }
    return <MovieContext.Provider value={{favorites, addToFavorites, removeFromFavorites, isFavorite}}>
        {children}
    </MovieContext.Provider>
}