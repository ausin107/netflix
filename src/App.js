import './App.css';
import { ChevronDownIcon, SearchIcon, BellIcon } from '@heroicons/react/solid'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Home from './Pages/Home';
import logo from './assets/Netflix_logo.png'
import Row from './Components/Row';
import user from './assets/user_accout.png'
import requests from './Pages/request';
function App() {
  const [height, setHeight] = useState(0)
  const ref = useRef()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    const updatePosition = () => {
        setHeight(window.scrollY)
    }
    window.addEventListener('scroll', updatePosition )
    updatePosition()
    if(height > 0){
      ref.current.classList.add('navbar-color') 
    }else ref.current.classList.remove('navbar-color')
    return () => window.removeEventListener('scroll', updatePosition) // tránh memory leak
}, [height])

  return (
    <div className='font-sans'>
      <nav ref={ref} className='fixed z-10 px-15 flex w-screen h-17 navbar-background justify-between'>
        <div className='flex items-center text-neutral-200 text-base'>
          <Link to='/browse' className='mr-1'>
            <img className='h-7 w-24' src={logo} />
          </Link>
          <Link to='/browse' className='ml-4 text-white'>Trang chủ</Link>
          <Link to='/browse' className='ml-4'>Phim T.hình</Link>
          <Link to='/browse' className='ml-4'>Phim</Link>
          <Link to='/browse' className='ml-4'>Mới & Phổ biến</Link>
          <Link to='/browse' className='ml-4'>Danh sách của tôi</Link>
        </div>
        <div className='flex items-center text-neutral-200 justify-end w-80'>
          <SearchIcon className='font-bold h-7 mr-4' />
          <Link to='/browse' className='mr-4'>Trẻ em</Link>
          <BellIcon className='font-bold h-7 mr-4' />
          <div className='flex flex-row items-center'>
            <img className='rounded' src={user} />
            <ChevronDownIcon className='font-bold w-5 h-5 ml-1' />
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/browse' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
