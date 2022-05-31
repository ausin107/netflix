import { ChevronDownIcon, SearchIcon, BellIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import logo from '../assets/Netflix_logo.png'
import user from '../assets/user_accout.png'


function Navbar() {
    const [height, setHeight] = useState(0)
    const ref = useRef()
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

    return (
        <nav ref={ref} className='fixed z-30 px-15 flex w-screen h-17 navbar-background justify-between'>
            <div className='flex items-center text-neutral-200 text-base'>
                <Link to='/browse' className='mr-1'>
                    <img className='h-7 w-24' src={logo} />
                </Link>
                <Link to='/browse/genre/83' className='ml-4 text-white'>Home</Link>
                <Link to='/browse' className='ml-4'>TV Shows</Link>
                <Link to='/browse' className='ml-4'>Movies</Link>
                <Link to='/browse' className='ml-4'>New & Popular</Link>
                <Link to='/browse' className='ml-4'>My List</Link>
            </div>
            <div className='flex items-center text-neutral-200 justify-end w-80'>
                <SearchIcon className='font-bold h-7 mr-4' />
                <Link to='/browse' className='mr-4'>Kids</Link>
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