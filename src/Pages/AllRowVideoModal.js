import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import '../styles/AllRowVideoModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CircleIcon } from '../components/icon'
import ErrorMovie from '../assets/Netflix_Error_Movie.png'
import RowBanner from '../components/RowBanner'
function AllRowVideoModal({
  title,
  allMovie,
  apiType,
  moviesGenre,
  isNetflix,
  onGenreVideoShow,
  onGenreVideoClose,
}) {
  if (!onGenreVideoShow) return null
  return ReactDom.createPortal(
    <div
      className='fixed top-0 w-screen h-screen flex justify-center bg-backgroundColorOpa overflow-y-scroll'
      onClick={onGenreVideoClose}
    >
      <div
        className='w-4/5 mt-1.5vw flex relative top-0 h-fit flex-col rounded-md bg-detailModalBGColor detail-modal-open'
        onClick={(e) => e.stopPropagation(e)}
      >
        <CircleIcon
          iconType={faXmark}
          onClose={onGenreVideoClose}
          containerClass='!absolute top-0 right-0 z-50'
          className='bg-black rounded-full text-slate-300 w-1.5vw h-1.5vw m-1vw'
        />
        <div className='flex items-center justify-center m-5vw'>
          <div className=' text-3vw text-white font-bold'>{title}</div>
        </div>
        {/* <div className='flex justify-end items-center text-white mb-4vw mx-4vw'>
          <div className='text-1vw text-white mr-0.5vw'>Sort by</div>
          <div className='px-0.7vw py-0.15vw border-1 border-white border-solid flex items-baseline font-semibold cursor-pointer bg-black tracking-wide'>
            Suggestions For You
            <FontAwesomeIcon icon={faSortDown} className='text-xs ml-3vw' />
          </div>
        </div> */}
        {/*Trường hợp có MultiSelect*/}
        <div
          className='grid gap-y-0.7vw gap-x-1vw mx-4vw mb-4vw'
          style={{ gridTemplateColumns: 'auto auto auto auto' }}
        >
          {allMovie.map((movie, index) => {
            return (
              <div className='image-item movie relative' key={movie.id}>
                <RowBanner
                  bannerData={movie}
                  apiType={apiType}
                  index={index}
                  moviesGenre={moviesGenre}
                  isNetflix={isNetflix}
                  isRow={false}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>,
    document.getElementById('Modal')
  )
}

export default AllRowVideoModal
