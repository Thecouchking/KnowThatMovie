import './css/App.css'
import Favourites from './pages/Favorites'
import Home from './pages/Home'
import Outofbounds from './pages/Outofbounds'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
function App() {
  return (
    <div>
      <NavBar/>
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
        <Route path="*" element={<Outofbounds/>}/>
      </Routes>
    </main>
    </div>
  )
}
export default App
