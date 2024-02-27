import React from 'react'
import placeholder from '../assets/placeholder.png';

function BoardItem() {
    return (
        <div className="card w-56 bg-base-100 shadow-xl hover:scale-110 transition duration-300 ease-in-out">
            <figure><img src={placeholder} alt="board image" className='w-56' /></figure>
            <div className="card-body p-3">
                <h2 className="card-title">Board name</h2>
            </div>
        </div>
    )
}

export default BoardItem