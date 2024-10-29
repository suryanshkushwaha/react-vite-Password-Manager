import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full p-4 gap-1'>
            <div className="logo text-2xl font-bold text-white">
                <span className="text-green-500">&lt;</span>
                <span>Pass</span>
                <span className="text-green-500">OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <span>Created with</span>
                <img className='w-5' src="icons/heart.png" alt="" />
                <span>by Suryansh Kushwaha</span>
            </div>
        </div>
    )
}

export default Footer