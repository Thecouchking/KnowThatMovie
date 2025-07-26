import './css/App.css'
import Htmlpage from './pages/htmlpage'
import Favourites from './pages/Favorites'
import Home from './pages/Home'
import Outofbounds from './pages/Outofbounds'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
function App() {
  return (
    <MovieProvider>
    <div>
      <NavBar/>
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
        <Route path="/table" element={<Htmlpage/>}/>
        <Route path="*" element={<Outofbounds/>}/>
      </Routes>
    </main>
    </div>
    </MovieProvider>
  )
}
export default App
