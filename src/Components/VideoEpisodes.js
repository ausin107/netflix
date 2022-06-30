import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import RelatedVideoBG from '../assets/Netflix_BG.jpg'
import LazyLoadingImg from './LazyLoadingImg'

function VideoEpisodes({ className, apiType, episodesUrl }) {
  const [data, setData] = useState()
  const [isShow, SetShow] = useState(false)
  const [episodes, setEpisodes] = useState([])
  const Episodesref = useRef([])
  const imgRef = useRef([])
  const buttonRef = useRef()
  const buttonClass =
    'text-slate-100 p-0.7vw px-0.8vw cursor-pointer hover:opacity-70 detailModalBtn text-1vw absolute top-4vw z-10'
  const bannerUrl = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    async function getVideo() {
      try {
        const episodes = await axios.get(episodesUrl)
        setData(episodes.data)
        setEpisodes(episodes.data.episodes)
      } catch (error) {
        console.error(error)
      }
    }
    getVideo()
  }, [episodesUrl])
  const handleShow = () => {
    Episodesref.current.map((item, index) => {
      if (index > 9) {
        item.classList.toggle('hidden')
        isShow == false ? SetShow(true) : SetShow(false)
      }
    })
  }
  return (
    <div className='mx-4vw'>
      <div className=' mt-2vw mb-1vw flex justify-between items-center'>
        <div className='text-2xl text-white font-bold'>Episodes</div>
        <div className='text-lg text-white font-medium'>Season 1</div>
      </div>
      <div className='flex flex-col w-full '>
        {episodes.map((item, index) => {
          const episodesClass =
            index > 9
              ? 'flex flex-row items-center py-3vw border-b-1 px-2vw border-borderEpisodeColor hidden'
              : 'flex flex-row items-center py-3vw border-b-1 px-2vw border-borderEpisodeColor'
          const handleImgSrc = (imgData) => {
            return !!imgData.still_path == true ? bannerUrl + imgData.still_path : RelatedVideoBG
          }
          return (
            <div
              className={episodesClass}
              key={item.id}
              ref={(el) => (Episodesref.current[index] = el)}
            >
              <div className='text-white text-2xl font-semibold'>{item.episode_number}</div>
              <LazyLoadingImg
                imgSrc={handleImgSrc(item)}
                className='bg-cover bg-full ml-1.5vw rounded h-10vh'
                alt='Episodes Image'
              />
              <div className='flex flex-col ml-1vw mr-2vw'>
                <div className='flex flex-row justify-between'>
                  <div className='text-white text-base font-bold'>
                    Episode {item.episode_number}
                  </div>
                  <div className='text-white text-base font-bold tracking-wide'>
                    {item.runtime || 45}m
                  </div>
                </div>
                <div className='text-white text-base leading-tight mt-0.5vw border-borderColor'>
                  {item.overview ||
                    'This Tv Show maybe new that we dont have data for showing information yet. Sory for the inconvenient'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {episodes.length > 9 ? (
        <div className='h-0'>
          <div className='h-5vw w-full collapsedBG flex justify-center items-end' ref={buttonRef}>
            {isShow == true ? (
              <FontAwesomeIcon icon={faChevronUp} onClick={handleShow} className={buttonClass} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} onClick={handleShow} className={buttonClass} />
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default VideoEpisodes
