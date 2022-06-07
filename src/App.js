import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import TvShows from './pages/TvShows';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/browse' element={<Home />} />
        <Route path='/genre/83' element={<TvShows />} />
        {/* <Route path='/genre/83' element={<Movies />} />
          <Route path='/genre/83' element={<NewPopular />} />
          <Route path='/genre/83' element={<MyList />} /> */}
      </Routes>
    </>
  );
}

export default App;
