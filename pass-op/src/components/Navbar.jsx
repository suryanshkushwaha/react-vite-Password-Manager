import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between p-4'>
        <div className="logo text-2xl font-bold text-white">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
            </div>
        <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar