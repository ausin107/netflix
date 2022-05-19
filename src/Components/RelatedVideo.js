import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
function RelatedVideo({ className, relatedUrl }) {
    const [data, setData] = useState()
    const [test, setTest] = useState()
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function getVideo() {
            try {
                const similarVideo = await axios.get(relatedUrl)
                console.log(similarVideo.data.results[0])
                setData(similarVideo.data)
                setTest(similarVideo.data.results[0])
            } catch (error) {

            }
        }
        getVideo()
    }, [])
    return (
        <div className='mx-4vw'>
            <div className='text-2xl text-white mt-2vw mb-1vw font-bold' >
                More Like This
            </div>
            <div className='flex flex-row w-full justify-between'>
                <div className=' rounded bg-detailModalVideoColor h-full' style={{ width: '31%' }}>
                    <img className=' bg-cover bg-center w-full h-full rounded ' src={bannerUrl + test.backdrop_path} alt="Banner Image" />
                    <div className="mx-1vw">
                        <div className='text-white text-base font-bold mt-0.3vw'>{test.title}</div>
                        <div className="flex flex-row justify-between mt-0.2vw">
                            <div className="flex flex-col">
                                <div className='text-base text-white'>{test.vote_average}</div>
                                <div className='text-base text-white'>{test.vote_average}</div>
                            </div>
                            <FontAwesomeIcon icon={faPlus} className=' text-slate-100 p-0.3vw px-0.4vw mr-0.3vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                        </div>
                        <div className='text-base mt-0.7vw mb-3vw font-normal leading-tight' style={{color: '#d2d2d2'}}>{test.overview.slice(0,120)}...</div>
                    </div>
                </div>
                <div className=' rounded bg-detailModalVideoColor h-full' style={{ width: '31%' }}>
                    <img className=' bg-cover bg-center w-full h-full rounded ' src={bannerUrl + test.backdrop_path} alt="Banner Image" />
                    <div className="mx-1vw">
                        <div className='text-white text-base font-bold mt-0.3vw'>{test.title}</div>
                        <div className="flex flex-row justify-between mt-0.2vw">
                            <div className="flex flex-col">
                                <div className='text-base text-white'>{test.vote_average}</div>
                                <div className='text-base text-white'>{test.vote_average}</div>
                            </div>
                            <FontAwesomeIcon icon={faPlus} className=' text-slate-100 p-0.3vw px-0.4vw mr-0.3vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                        </div>
                        <div className='text-base mt-0.7vw mb-3vw font-normal leading-tight' style={{color: '#d2d2d2'}}>{test.overview.slice(0,120)}...</div>
                    </div>
                </div>
                <div className=' rounded bg-detailModalVideoColor h-full' style={{ width: '31%' }}>
                    <img className=' bg-cover bg-center w-full h-full rounded ' src={bannerUrl + test.backdrop_path} alt="Banner Image" />
                    <div className="mx-1vw">
                        <div className='text-white text-base font-bold mt-0.3vw'>{test.title}</div>
                        <div className="flex flex-row justify-between mt-0.2vw">
                            <div className="flex flex-col">
                                <div className='text-base text-white'>{test.vote_average}</div>
                                <div className='text-base text-white'>{test.vote_average}</div>
                            </div>
                            <FontAwesomeIcon icon={faPlus} className=' text-slate-100 p-0.3vw px-0.4vw mr-0.3vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                        </div>
                        <div className='text-base mt-0.7vw mb-3vw font-normal leading-tight' style={{color: '#d2d2d2'}}>{test.overview.slice(0,120)}...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RelatedVideo