import { useEffect, useState } from 'react'
import Video from './Video'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCheck, faThumbsUp, faThumbsDown, faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons'

// import { v4 as uuidv4 } from 'uuid';

function TrailerModal({ className, url, title }) {
    const test = 'https://image.tmdb.org/t/p/original//rcA17r3hfHtRrk3Xs3hXrgGeSGT.jpg'
    const video = 'http://www.youtube.com/embed/'
    const id = 'Hd2ldTR-WpI'
    return (
        <div className='trailer-modal hidden absolute top-0 h-full w-full' >
            {/* <Video videoUrl={video + id} className='w-full h-full' /> */}
            <img src={url} className='w-full rounded absolute top-0'/>
            <div className='w-full rounded bg-black' style={{ height: '86%' }}>
                <div className='text-white absolute text-base font-sans font-bold pl-5' style={{ top: '39%' }}>{title}</div>
                <div className='flex w-full h-1/2 absolute p-5' style={{ top: '42%' }}>
                    <div className=' w-full h-full'>
                        <FontAwesomeIcon icon={faPlay} size='sm' className=" text-black bg-white mr-2 cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                        <FontAwesomeIcon icon={faPlus} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsUp} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                        <FontAwesomeIcon icon={faThumbsDown} size='sm' className=" text-white p-1 mr-2 cursor-pointer hover:opacity-70 traileModalBtn" />
                    </div>
                    <FontAwesomeIcon icon={faAngleDown} size='sm' className=" text-white cursor-pointer hover:opacity-70 traileModalBtn" style={{ padding: '4px 6px' }} />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
export default TrailerModal