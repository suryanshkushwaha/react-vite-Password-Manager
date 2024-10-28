import React from 'react'
import { useState, useEffect, useRef } from 'react'

const Manager = () => {
    const passwordIconRef = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ website: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState(() => {
        const passwords = localStorage.getItem("passwords");
        return passwords ? JSON.parse(passwords) : [];
    });

    const showPassword = () => {
        passwordIconRef.current.src = passwordIconRef.current.src.includes("icons/eyecross.png") ? "icons/eye.png" : "icons/eyecross.png"
        passwordRef.current.type = passwordIconRef.current.src.includes("icons/eyecross.png") ? "text" : "password"
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
        
    }

    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>

            <div className="container mx-auto">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center font-bold'>Your Own Password Manager</p>
                <div className=" flex flex-col gap-5 items-center">
                    <input placeholder='Enter website URL' className='rounded-full w-full border-green-500 border px-4 py-1 ' type="text" value={form.website} onChange={handleChange} name='website' />
                    <div className="flex w-full gap-8">
                        <input placeholder='Enter username' className='rounded-full w-full border-green-500 border px-4 py-1' type="text" value={form.username} onChange={handleChange} name='username' />
                        <div className="relative w-full">
                            <input placeholder='Enter password' className='rounded-full w-full border-green-500 border px-4 py-1' type="password" value={form.password} onChange={handleChange} name='password' ref={passwordRef}/>
                            <img onClick={showPassword} ref={passwordIconRef} className='p-1 absolute right-1 top-1 cursor-pointer' width={25} src="icons/eye.png" alt="Show icon for password" />
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center w-fit bg-green-400 rounded-full px-5 py-2 hover:bg-green-300 gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        <span>Add Password</span></button>
                </div>
            </div>
        </>
    )
}

export default Manager