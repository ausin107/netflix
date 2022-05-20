import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Banner from "./Banner";
function RelatedVideo({ className, relatedUrl }) {
    const [data, setData] = useState([])
    const [test, setTest] = useState()
    const [overView, setOverView] = useState('')
    const [banner, setBanner] = useState('')
    const [title, setTitle] = useState('')
    const [voteAverage, setVoteAverage] = useState('')
    const bannerUrl = 'https://image.tmdb.org/t/p/original/'
    useEffect(() => {
        async function getVideo() {
            try {
                const similarVideo = await axios.get(relatedUrl)
                const data = similarVideo.data.results[0]
                setData(similarVideo.data.results)
                console.log(similarVideo.data.results)
                // const videoOverView = data.overView.slice(0, 120)
                // setData(similarVideo.data)
                // setTest(similarVideo.data.results[0])
                setBanner(bannerUrl + data.backdrop_path)
                setTitle(data.title)
                setVoteAverage(data.vote_average)
                setOverView(`${data.overview.slice(0, 120)}...`)
            } catch (error) {

            }
        }
        getVideo()
    }, [relatedUrl])
    return (
        <div className='mx-4vw'>
            <div className='text-2xl text-white mt-2vw mb-1vw font-bold' >
                More Like This
            </div>
            <div className='grid w-full gap-1.2vw' style={{ gridTemplateColumns: 'auto auto auto' }}>
                {data.map((item, index) => {
                    const handleTitle = () => {
                        return item.title.length < 25 ? item.title : `${item.title.slice(0,25)}...`
                    }
                    return (
                        <div className=' rounded bg-detailModalVideoColor h-full' key={item.id}>
                            <img className=' bg-cover bg-center w-full rounded' style={{height: '18vh'}} src={(bannerUrl + item.backdrop_path)} alt="Banner Image" />
                            <div className="mx-1vw">
                                <div className='text-white text-base font-bold mt-0.3vw'>{handleTitle()}</div>
                                <div className="flex flex-row justify-between mt-0.2vw">
                                    <div className="flex flex-col">
                                        <div className='text-base text-green-500 font-bold'>Vote average: {Math.round(item.vote_average*10)}%</div>
                                        <div className='text-base text-white'>{item.release_date.slice(0, 4)}</div>
                                    </div>
                                    <FontAwesomeIcon icon={faPlus} className=' text-slate-100 p-0.4vw px-0.5vw mr-0.4vw cursor-pointer hover:opacity-70 detailModalBtn text-1.5vw' />
                                </div>
                                <div className='text-base pt-0.7vw pb-3vw font-normal leading-tight' style={{ color: '#d2d2d2' }}>{`${item.overview.slice(0, 100)}...`}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default RelatedVideo