import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import RelatedVideoBG from '../assets/Netflix_BG.jpg'
import LazyLoadingImg from './LazyLoadingImg'
import '../styles/DetailModal.css'
function RelatedVideo({ className, relatedUrl, apiType }) {
  const [data, setData] = useState([])
  const [isShow, SetShow] = useState(false)
  const ref = useRef([])
  const buttonRef = useRef()
  const buttonClass =
    'text-slate-100 p-0.7vw px-0.8vw cursor-pointer hover:opacity-70 detailModalBtn text-[5vw] sm:text-[3.5vw] sm:top-[3vw] lg:text-1vw absolute top-2vw lg:top-4vw z-10'
  const bannerUrl = 'https://image.tmdb.org/t/p/original/'
  useEffect(() => {
    async function getVideo() {
      try {
        const similarVideo = await axios.get(relatedUrl)
        setData(similarVideo.data.results)
      } catch (error) {
        console.error(error)
      }
    }
    getVideo()
  }, [relatedUrl])
  const handleShow = () => {
    ref.current.map((item, index) => {
      if (index > 8) {
        item.classList.toggle('hidden')
        isShow == false ? SetShow(true) : SetShow(false)
        if (!isShow) {
          buttonRef.current.classList.add('mt-5vw')
        } else buttonRef.current.classList.remove('mt-5vw')
      }
      if (index == 9 && window.innerWidth < 800) {
        item.classList.toggle('hidden')
        isShow == false ? SetShow(true) : SetShow(false)
        if (!isShow) {
          buttonRef.current.classList.add('mt-5vw')
        }
      }
    })
  }
  const handleDate = (item) => {
    return apiType == 'movieApi' ? item.release_date.slice(0, 4) : item.first_air_date.slice(0, 4)
  }
  return (
    <div className='mx-4vw'>
      <div className='text-2xl text-white mt-2vw mb-1vw font-bold'>More Like This</div>
      <div
        className='grid w-full gap-1.2vw video-container'
        style={{ gridTemplateColumns: 'auto auto auto' }}
      >
        {data.map((item, index) => {
          let className =
            index > 8
              ? 'rounded bg-detailModalVideoColor h-full hidden'
              : 'rounded bg-detailModalVideoColor h-full'
          className =
            window.innerWidth < 500 && index == 9
              ? 'rounded bg-detailModalVideoColor h-full'
              : className
          const handleImgSrc = (imgData) => {
            return !!imgData.backdrop_path == true
              ? bannerUrl + imgData.backdrop_path
              : RelatedVideoBG
          }
          return (
            <div className={className} key={item.id} ref={(el) => (ref.current[index] = el)}>
              <LazyLoadingImg
                imgSrc={handleImgSrc(item)}
                className='bg-cover bg-center w-full rounded h-18vh'
                alt='Banner Image'
              />
              <div className='mx-1vw detail-container'>
                <div className='text-white text-base font-bold mt-0.3vw h-3vw'>
                  {item.title || item.name}
                </div>
                <div className='flex flex-row justify-between items-center mt-0.2vw'>
                  <div className='flex flex-col'>
                    <div className='text-base text-green-500 font-bold'>
                      Vote average: {Math.round(item.vote_average * 10)}%
                    </div>
                    <div className='flex flex-row'>
                      <div
                        className='text-base text-white font-semibold px-0.3vw mr-0.5vw'
                        style={{
                          border: 'rgba(255,255,255,.5) solid 1px',
                          lineHeight: '1.2rem',
                        }}
                      >
                        {item.adult == true ? '18+' : '16+'}
                      </div>
                      <div className='text-base text-white font-semibold'>{handleDate(item)}</div>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className=' text-slate-100 p-0.4vw px-0.5vw mr-0.4vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw'
                  />
                </div>
                <div
                  className='text-base pt-0.7vw pb-3vw font-normal leading-tight'
                  style={{ color: '#d2d2d2' }}
                >
                  {!!item.overview == true
                    ? `${item.overview.slice(0, 100)}...`
                    : 'This Tv Show maybe new that we dont have data for showing information yet. Sory for the inconvenient.'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='h-0'>
        <div className='h-5vw w-full collapsedBG flex justify-center items-end ' ref={buttonRef}>
          {isShow == true ? (
            <FontAwesomeIcon icon={faChevronUp} onClick={handleShow} className={buttonClass} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} onClick={handleShow} className={buttonClass} />
          )}
        </div>
      </div>
    </div>
  )
}
export default RelatedVideo
