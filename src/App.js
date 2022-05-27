import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Home from './pages/Home';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/browse' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
