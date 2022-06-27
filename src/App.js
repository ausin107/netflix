import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import TvShows from './pages/TvShows'
import Movies from './pages/Movies'
import NewPopular from './pages/NewPopular'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/browse' element={<Home />} />
        <Route path='/genre/tvShows' element={<TvShows />} />
        <Route path='/genre/movies' element={<Movies />} />
        <Route path='/genre/new-popular' element={<NewPopular />} />
        {/* <Route path='/my-list' element={<MyList />} /> */}
      </Routes>
    </>
  )
}

export default App
