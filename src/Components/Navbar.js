import { ChevronDownIcon, SearchIcon, BellIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import logo from '../assets/Netflix_logo.png'
import user from '../assets/user_accout.png'
import '../styles/Components.css'
function Navbar() {
  const [height, setHeight] = useState(0)
  const [isShow, setShow] = useState(false)
  let navigate = useNavigate()
  const navbarRef = useRef()
  const searchTagRef = useRef([])
  const menuTagRef = useRef([])
  const menuRef = useRef()
  const searchTag = [
    {
      searchTagName: 'Home',
      className: 'ml-1.1vw tag-navbar text-white font-bold',
      menuClasses:
        'text-4vw sm:text-[3.5vw] text-plusColor !text-white pl-4vw w-full font-bold p-2vw',
      searchLink: '/browse',
    },
    {
      searchTagName: 'TV Shows',
      className: 'ml-1.1vw tag-navbar',
      menuClasses: 'text-4vw sm:text-[3.5vw] text-plusColor pl-4vw w-full font-bold p-2vw',
      searchLink: '/genre/tvShows',
    },
    {
      searchTagName: 'Movies',
      className: 'ml-1.1vw tag-navbar',
      menuClasses: 'text-4vw sm:text-[3.5vw] text-plusColor pl-4vw w-full font-bold p-2vw',
      searchLink: '/genre/movies',
    },
    {
      searchTagName: 'New & Popular',
      className: 'ml-1.1vw tag-navbar',
      menuClasses: 'text-4vw sm:text-[3.5vw] text-plusColor pl-4vw w-full font-bold p-2vw',
      searchLink: '/genre/new-popular',
    },
  ]
  useLayoutEffect(() => {
    const updatePosition = () => {
      setHeight(window.scrollY)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    if (height > 0) {
      navbarRef.current.classList.add('navbar-color')
    } else navbarRef.current.classList.remove('navbar-color')
    return () => window.removeEventListener('scroll', updatePosition) // tránh memory leak
  }, [height])
  useEffect(() => {
    searchTagRef.current.map((item) => {
      item.href == window.location.href
        ? item.classList.add('text-white', 'font-bold')
        : item.classList.remove('text-white', 'font-bold')
    })
    menuTagRef.current.map((item) => {
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
    menuTagRef.current.map((item) => {
      item.classList.remove('!text-white', 'font-bold')
    })
    menuTagRef.current[index].classList.add('!text-white', 'font-bold')
  }
  const handleLogoClick = () => {
    navigate('/browse')
    window.location.reload()
  }
  const handleShowMenu = () => {
    menuRef.current.classList.toggle('invisible')
  }
  return (
    <nav
      ref={navbarRef}
      className='fixed z-30 px-4vw flex w-screen h-4.5vw navbar-background justify-between items-center navbar'
    >
      <div className='flex items-center text-neutral-200 text-base'>
        <div className='relative flex flex-col'>
          <FontAwesomeIcon icon={faBars} className='mr-5vw menu-navbar' onClick={handleShowMenu} />
          <div
            className=' navbar-color top-[6vh] sm:top-[8vh] fixed left-0 flex flex-col rounded item-center w-[65%] invisible'
            ref={menuRef}
          >
            <div className='pl-2vw border-b border-plusColor'>
              <div className='flex flex-row items-center font-bold p-2vw '>
                <img className='rounded' src={user} />
                <div className='ml-2vw opacity-60'>
                  <div className='text-plusColor text-[4.5vw] sm:text-[3.5vw] font-bold'>
                    Thành viên Netflix
                    <div className='text-plusColor text-[3.5vw] sm:text-[2.5vw]'>
                      Switch Profiles
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-plusColor text-4vw sm:text-[3.5vw] font-bold p-2vw opacity-60'>
                Account
              </div>
              <div className='text-plusColor text-4vw sm:text-[3.5vw] font-bold p-2vw opacity-60'>
                Help Center
              </div>
              <div className='text-plusColor text-4vw sm:text-[3.5vw] font-bold p-2vw opacity-60'>
                Sign Out of Netflix
              </div>
            </div>
            {searchTag.map((item, index) => {
              return (
                <Link
                  to={item.searchLink}
                  className={item.menuClasses}
                  ref={(el) => (menuTagRef.current[index] = el)}
                  onClick={() => handleClick(index)}
                  key={index}
                >
                  {item.searchTagName}
                </Link>
              )
            })}
          </div>
        </div>
        <div className='mr-1' onClick={handleLogoClick}>
          <img className='h-7 w-6vw cursor-pointer logo-navbar' src={logo} />
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
      <div className='flex items-center text-neutral-200 justify-end w-80 right-navbar'>
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
