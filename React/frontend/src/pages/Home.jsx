import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
//import { searchMovies, getPopularMovies } from "../services/api";
import { callBackend,searchBackend } from "../services/api";
import "../css/Home.css"
function Home(){
    const [searchQuery,setSearchQuery]=useState("");
    const [movies,setMovies]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const [visible,setVisible]=useState(8);
    const [count,setCount]=useState(0);
    // useEffect(()=>{
    //     const getSearchMovies=async()=>{
    //         try{
    //             const Movies=await searchMovies(searchQuery);
    //             setMovies(Movies);
    //         }catch(err){
    //             console.log(err);
    //             setError("Failed to fetch from API");
    //         }finally{
    //             setLoading(false)
    //         } 
    //     }
    //     getSearchMovies();
    // },[searchQuery])


    // useEffect(()=>{
    //     const backendCheck=async()=>{
    //         try{
    //             const response=await callBackend();
    //             setMovies(response);
    //         }catch(err){
    //             console.log(err);
    //             setError("Failed to fetch from Backend");
    //         }finally{
    //             setLoading(false)
    //         }            
    //     }
    //     backendCheck();
    // },[])

    // useEffect(()=>{
    //     const loadPopularMovies=async()=>{
    //         try{
    //             const popularMovies=await getPopularMovies();
    //             setMovies(popularMovies);
    //         }catch(err){
    //             console.log(err);
    //             setError("Failed to fetch from API");
    //         }finally{
    //             setLoading(false)
    //         }
    //     }
    //     loadPopularMovies();
    // },[])
    useEffect(()=>{
        const getSearchMovies=async()=>{
            try{
                const Movies=await searchBackend(searchQuery);
                setLoading(true)
                setMovies(Movies);
                setVisible(8);
            }catch(err){
                setLoading(false)
                console.log(err);
                setError("Failed to fetch from Backend");
            }finally{
                setLoading(false)
            } 
        }
        getSearchMovies();
    },[searchQuery])

    useEffect(()=>{
        setCount(cnt=>cnt+1);
    },[])
    return <div className="home">
        <form className="search-form">
            <input type="text" placeholder="Search for movies..." 
            name="searchval" className="search-input" value={searchQuery} 
            onChange={(e)=>setSearchQuery(e.target.value)}/>
            {/* <button type="submit" className="search-button">Search</button> */}
        </form>
        
         {error && <div className="error-message">{error}</div>}

        {loading ? (
        <div className="loading">Loading...</div>
        ) : movies.length === 0 ? (
        <div className="no-movies"><h3>No movies found.</h3></div>
        ) : (
        <>
            <div className="movies-grid">
            {movies.slice(0, visible).map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
            {visible < movies.length && (
            <div className="load-more-container">
                <button onClick={() => setVisible(visible+8)} className="load-more-button">
                More Movies
                </button>
            </div>
            )}
            {<div className="visit-counter">
                Visitors: {count}
            </div>}
        </>
        )}
            </div>
        }
export default Home;