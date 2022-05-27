import React from 'react'


function Item({itemPoster}){
    
    return (
        <div className=''>
            <img src={itemPoster} alt='Poster'/>
        </div>
    )
}
export default Item