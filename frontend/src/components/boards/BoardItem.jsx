import placeholder from '../../assets/placeholder.png';

function BoardItem() {
    return (
        <div className="card w-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out">
            <figure><img src={placeholder} alt="board image" className='w-full md:w-56 h-36' /></figure>
            <div className="card-body p-3">
                <h2 className="card-title">Board name</h2>
            </div>
        </div>
    )
}

export default BoardItem