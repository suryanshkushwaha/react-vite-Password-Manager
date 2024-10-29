import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between p-4 items-center'>
      <div className="logo text-2xl font-bold text-white">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <button className='text-whitep-2 bg-green-400 rounded-full px-5 py-2 hover:bg-green-300 ring-white border'>
        <a href="http://" target='_blank' className='flex items-center gap-2'>
          <img className="w-7" src="/icons/github.svg" alt="Github logo" />
          <span className='font-bold text-sm xsm:text-base'>Github</span>
        </a>
      </button>
    </nav>
  )
}

export default Navbar