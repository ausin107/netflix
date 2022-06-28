import { Link, useNavigate } from 'react-router-dom'
import Home from './Home'
import NetflixLoGo from '../assets/Netflix_logo.png'
import UserLogo from '../assets/UserLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Welcome() {
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate('/')
    window.location.reload()
  }
  return (
    <div className=' w-screen h-screen bg-welcomeColorBG relative z-50'>
      <div className='px-15 flex w-screen h-17 navbar-background justify-between items-center'>
        <img src={NetflixLoGo} className='h-7 w-24 cursor-pointer' onClick={handleLogoClick} />
      </div>
      <div className='flex flex-col items-center'>
        <div className='text-white text-3.5vw mt-5vw mb-2vw'>Who's watching?</div>
        <div className='flex item-cente mb-4vw'>
          <Link to='/browse'>
            <div className='mr-2vw'>
              <img src={UserLogo} className='w-9vw rounded cursor-pointer hover:border-white hover:border-4' />
              <div className='text-gray-300 text-1.5vw text-center w-9vw cursor-pointer opacity-70 hover:opacity-100'>
                Thành viên Netflix
              </div>
            </div>
          </Link>
          <div className=''>
            <FontAwesomeIcon
              icon={faPlus}
              className='text-plusColor p-2vw w-5vw h-5vw cursor-pointer hover:bg-neutral-200 rounded'
            />
            <div className='text-gray-300 text-1.5vw text-center w-9vw opacity-70 hover:opacity-100 cursor-pointer'>
              Add Profile
            </div>
          </div>
        </div>
        <div className='text-white opacity-50 py-0.5vw px-1.5vw border-white text-1.2vw border-1 tracking-supperWide hover:opacity-100 cursor-pointer'>
          Manage Profile
        </div>
      </div>
    </div>
  )
}
export default Welcome
