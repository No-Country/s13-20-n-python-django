import React from 'react'
import BoardItem from './BoardItem';

function BoardsList() {
    return (
        <div className='p-4 w-full overflow-auto'>
            <h1 className="text-2xl font-bold">Boards</h1>
            {/* board list */}
            <div className=''>
                <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                    <BoardItem />
                </div>
            </div>
        </div>
    )
}

export default BoardsList