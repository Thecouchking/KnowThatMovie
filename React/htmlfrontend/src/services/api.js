const API_KEY = "63a00bcd94dafa24a1896c88ad17921b";
const BASE_URL = "https://api.themoviedb.org/3";

export const callBackend=async()=>{
  const response= await fetch('http://localhost:3005/',{
    method:'GET'
  })
  return response.json(); 
} 

export const searchBackend=async(query)=>{
  const response= await fetch(`http://localhost:3005/search?name=${encodeURIComponent(query)}`,{
    method:'GET'
  })
  return response.json(); 
} 

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};