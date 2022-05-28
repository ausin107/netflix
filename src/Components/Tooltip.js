import {useState} from 'react'
import '../styles/Tooltip.css'
function Tooltip({className, text, tooltipClass}){
    const newClass = `${className} w-max absolute z-40 -top-3.5vw`
    if (!text) return null
    else return (
        <div className={newClass}>
            <div className='text-black text-0.7vw bg-white px-1vw py-0.5vw rounded font-bold tooltip'>{text}</div>
        </div>
    )
}
export default Tooltip