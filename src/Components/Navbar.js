import { ChevronDownIcon, SearchIcon, BellIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import logo from '../assets/Netflix_logo.png'
import user from '../assets/user_accout.png'

function Navbar() {
  const [height, setHeight] = useState(0)
  let navigate = useNavigate()
  const ref = useRef()
  const searchTagRef = useRef([])
  const searchTag = [
    {
      searchTagName: 'Home',
      className: 'ml-4 text-white font-bold',
      searchLink: '/browse',
    },
    {
      searchTagName: 'TV Shows',
      className: 'ml-4',
      searchLink: '/genre/tvShows',
    },
    {
      searchTagName: 'Movies',
      className: 'ml-4',
      searchLink: '/genre/movies',
    },
    {
      searchTagName: 'New & Popular',
      className: 'ml-4',
      searchLink: '/genre/new-popular',
    },
    {
      searchTagName: 'My List',
      className: 'ml-4',
      searchLink: '/my-list',
    },
  ]
  useLayoutEffect(() => {
    const updatePosition = () => {
      setHeight(window.scrollY)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    if (height > 0) {
      ref.current.classList.add('navbar-color')
    } else ref.current.classList.remove('navbar-color')
    return () => window.removeEventListener('scroll', updatePosition) // tránh memory leak
  }, [height])
  useEffect(() => {
    searchTagRef.current.map((item) => {
      item.href == window.location.href
        ? item.classList.add('text-white', 'font-bold')
        : item.classList.remove('text-white', 'font-bold')
    })
  }, [])
  const handleClick = (index) => {
    searchTagRef.current.map((item) => {
      item.classList.remove('text-white', 'font-bold')
    })
    searchTagRef.current[index].classList.add('text-white', 'font-bold')
  }
  const handleLogoClick = () => {
    navigate('/browse')
    window.location.reload()
  }
  return (
    <nav ref={ref} className='fixed z-30 px-15 flex w-screen h-17 navbar-background justify-between'>
      <div className='flex items-center text-neutral-200 text-base'>
        <div className='mr-1' onClick={handleLogoClick}>
          <img className='h-7 w-24 cursor-pointer' src={logo} />
        </div>
        {searchTag.map((item, index) => {
          return (
            <Link
              to={item.searchLink}
              className={item.className}
              ref={(el) => (searchTagRef.current[index] = el)}
              onClick={() => handleClick(index)}
              key={index}
            >
              {item.searchTagName}
            </Link>
          )
        })}
      </div>
      <div className='flex items-center text-neutral-200 justify-end w-80'>
        <SearchIcon className='font-bold h-7 mr-4' />
        <Link to='/browse' className='mr-4'>
          Kids
        </Link>
        <BellIcon className='font-bold h-7 mr-4' />
        <div className='flex flex-row items-center'>
          <img className='rounded' src={user} />
          <ChevronDownIcon className='font-bold w-5 h-5 ml-1' />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
