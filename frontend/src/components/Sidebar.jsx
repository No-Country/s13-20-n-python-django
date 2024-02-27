import React from 'react'

function Sidebar() {
    return (
        <div className='w-[250px] px-4 hidden md:inline-block py-14'>
            <div className='flex items-baseline space-x-2 px-3 py-4'>
                <p className='text-lg font-bold  w-full px-4'>Bienvenida</p>
            </div>
            <div className='flex items-baseline space-x-2 px-3 py-4'>
                <p className='text-lg font-bold w-full px-4'>Boards</p>
            </div>
            <div className='flex items-baseline space-x-2 px-3 py-4'>
                <p className='text-lg font-bold w-full px-4'>Templates</p>
            </div>

            <div className='flex items-baseline space-x-2 px-3 py-24'>
                <p className='text-lg font-bold w-full px-4'>Settings</p>
            </div>

        </div>
    )
}

export default Sidebar