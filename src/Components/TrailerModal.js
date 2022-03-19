import {useEffect, useState} from 'react'
import Video from './Video'
// import { v4 as uuidv4 } from 'uuid';

function TrailerModal({className, keyClass, url}){
    const test = 'https://image.tmdb.org/t/p/original//rcA17r3hfHtRrk3Xs3hXrgGeSGT.jpg'
    const video = 'http://www.youtube.com/embed/'
    const id = 'Hd2ldTR-WpI'
    return (
        <div className='trailer-modal hidden absolute top-0 h-full w-full' >
            {/* <Video videoUrl={video + id} className='w-full h-full' /> */}
            <img src={url} className='w-full rounded absolute' style={{height: '36%'}} />
            <div className='w-full rounded bg-black' style={{height: '86%'}} />
        </div>
    )
}
export default TrailerModal