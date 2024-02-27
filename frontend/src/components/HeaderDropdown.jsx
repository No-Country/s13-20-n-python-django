import React from 'react'

function HeaderDropdown({ setOpenMenu }) {
    return (
        <div
            className='py-10 px-6 absolute left-0 right-0 top-16 bg-[#000] z-10'
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setOpenMenu(false)
            }}
        >
            {/* Dropdown Menu */}
            <div className='shadow-md shadow-[#364e71a] w-full py-4 rounded-xl'>
                <div>
                    <div className='flex items-baseline space-x-2 px-5 py-4 cursor-pointer'>
                        <p className='text-lg text-slate-400 font-bold'>Bienvenida</p>
                    </div>
                    <div className='flex items-baseline space-x-2 px-5 py-4 cursor-pointer'>
                        <p className='text-lg text-slate-400 font-bold'>Boards</p>
                    </div>
                    <div className='flex items-baseline space-x-2 px-5 py-4 cursor-pointer'>
                        <p className='text-lg text-slate-400 font-bold'>Templates</p>
                    </div>

                    <div
                        className='flex items-baseline space-x-2 text-[#635fc7] px-5 pt-14 cursor-pointer'
                        onClick={() => {
                            setIsBoardModalOpen(true)
                            setOpenMenu(false)
                        }}
                    >
                        <p className='text-lg font-bold'>Settings</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderDropdown