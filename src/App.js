import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import Home from './Pages/Home';
function App() {
  const navigate = useNavigate()
  return (
    <div className='ml-4 text-red-500'>
      <nav className=''>
      <Link to='/browse'>Trang chủ</Link>
      </nav>
      <Routes>
        <Route path='/browse' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
