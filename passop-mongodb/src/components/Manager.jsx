import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const websiteRef = useRef()
    const usernameRef = useRef()
    const addButtonRef = useRef()
    const passwordIconRef = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ website: "", username: "", password: "", showPassword: false })
    const [passwordBtn, setPasswordBtn] = useState("Add")
    const [passwordArray, setPasswordArray] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

    const getPasswords = async () => {
        let req = await fetch(`${API_URL}/`)
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const handleKeyPress = (e, currentField) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            switch (currentField) {
                case 'website':
                    usernameRef.current.focus();
                    break;
                case 'username':
                    passwordRef.current.focus();
                    break;
                case 'password':
                    if (passwordBtn === "Add") {
                        addPassword();
                    } else {
                        savePassword();
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const showPassword = () => {
        passwordIconRef.current.src = passwordIconRef.current.src.includes("icons/eyecross.png") ? "icons/eye.png" : "icons/eyecross.png"
        passwordRef.current.type = passwordIconRef.current.src.includes("icons/eyecross.png") ? "text" : "password"
    }

    const togglePasswordVisibility = (id) => {
        setPasswordArray(passwordArray.map(item =>
            item.id === id
                ? { ...item, showPassword: !item.showPassword }
                : item
        ));
    }

    const checkFormLength = () => {
        let isWebsiteLengthOK = form.website.length > 3
        let isUsernameLengthOK = form.username.length > 3
        let isPasswordLengthOK = form.password.length > 3

        let field;

        if (!isWebsiteLengthOK) {
            field = "Website";
            websiteRef.current.focus()
        } else if (!isUsernameLengthOK) {
            field = "Username";
            usernameRef.current.focus()
        } else if (!isPasswordLengthOK) {
            field = "Password";
            passwordRef.current.focus()
        }

        if (!isWebsiteLengthOK || !isUsernameLengthOK || !isPasswordLengthOK) {
            toast.error(`${field} must be longer than 3 characters.`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return false;
        }

        return true;
    }

    const addPassword = async () => {

        if (checkFormLength()) {
            const newEntry = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, newEntry]);
            await fetch(`${API_URL}/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntry) })

            setForm({ website: "", username: "", password: "" });
            setPasswordBtn("Add")

            toast.success('Password added!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            websiteRef.current.focus()
        }
    }

    const savePassword = async () => {
        if (checkFormLength()) {
            const updatedPassword = {
                id: form.id,
                website: form.website,
                username: form.username,
                password: form.password
            };

            const response = await fetch(`${API_URL}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPassword)
            });

            const result = await response.json();

            if (result.success) {
                const updatedPasswords = passwordArray.map(item =>
                    item.id === form.id ? { ...form } : item
                );
                setPasswordArray(updatedPasswords);

                setForm({ website: "", username: "", password: "" });
                setPasswordBtn("Add");

                toast.success('Password updated!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error('Failed to update password. Please try again.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    };


    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch(`${API_URL}/`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deleteAll = async() => {
        const confirmDelete = window.confirm("Do you really want to delete ALL passwords?");

        if (confirmDelete) {
            setPasswordArray([]);
            await fetch(`${API_URL}/deleteAll`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify() })

            toast.success('All passwords deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        setPasswordBtn("Save")
        setForm(passwordArray.filter(item => item.id === id)[0])
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)

        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    return (
        <>
            <ToastContainer limit={5} />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>

            <div className="container mx-auto gap-2 flex flex-col px-5">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center font-bold'>Your Own Password Manager</p>
                <div className=" flex flex-col gap-5 items-center">
                    <input placeholder='Enter website URL' className='rounded-full w-full border-green-500 border px-4 py-1 text-sm xsm:text-base' type="text" value={form.website} onChange={handleChange} name='website' id=
                        'website' ref={websiteRef} onKeyPress={(e) => handleKeyPress(e, 'website')} />
                    <div className="flex w-full gap-8">
                        <input placeholder='Enter username' className='rounded-full w-full border-green-500 border px-4 py-1 text-sm xsm:text-base' type="text" value={form.username} onChange={handleChange} name='username' id='username' ref={usernameRef} onKeyPress={(e) => handleKeyPress(e, 'username')} />
                        <div className="relative w-full">
                            <input placeholder='Enter password' className='rounded-full w-full border-green-500 border px-4 py-1 text-sm xsm:text-base' type="password" value={form.password} onChange={handleChange} name='password' id='password' ref={passwordRef} onKeyPress={(e) => handleKeyPress(e, 'password')} />
                            <img onClick={showPassword} ref={passwordIconRef} className='p-1 absolute right-1 top-1 cursor-pointer' width={25} src="icons/eye.png" alt="Show icon for password" />
                        </div>
                    </div>
                    <button onClick={(passwordBtn === "Add") ? addPassword : savePassword} className='flex justify-center items-center w-fit bg-green-400 rounded-full px-5 py-2 hover:bg-green-300 gap-2 border border-green-900' ref={addButtonRef}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }} >
                        </lord-icon>
                        <span className='font-bold text-sm xsm:text-base'>{passwordBtn} Password</span></button>
                </div>
                <div className="passwords-table gap-4 flex flex-col">
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-xl '>Your Passwords</h2>
                        {passwordArray.length > 0 && (
                            <button className='w-fit bg-red-500 rounded-md text-white px-3 py-1 hover:bg-red-600 gap-2 border border-red-900 text-sm' onClick={deleteAll}>
                                Delete All
                            </button>
                        )}
                    </div>

                    {passwordArray.length === 0 ? <div> No passwords saved.</div> :
                        <table className="table-fixed w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='w-1/3 py-2 px-1'>Website</th>
                                    <th className='w-1/3 py-2 px-1'>Username</th>
                                    <th className='w-1/3 py-2 px-1'>Password</th>
                                    <th className='w-[70px] py-2 px-1'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-2 px-1 md:px-2 border border-white'>
                                            <div className='flex justify-between items-center'>
                                                <a href={item.website.startsWith('http') ? item.website : `https://${item.website}`} target="_blank" rel="noopener noreferrer">{item.website}</a>
                                                <span className='lordiconcopy cursor-pointer flex items-center' onClick={() => { copyText(item.website) }}>
                                                    <lord-icon style={{ width: '20px', height: '20px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1 md:px-2 border border-white'>
                                            <div className='flex justify-between items-center'>
                                                <span>{item.username}</span>
                                                <span className='lordiconcopy cursor-pointer flex items-center' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon style={{ width: '20px', height: '20px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1 md:px-2 border border-white'>
                                            <div className='flex justify-between items-center'>
                                                <span>{item.showPassword ? item.password : '•••••'}</span>
                                                <div className='flex flex-row items-center gap-1'>
                                                    <img className='cursor-pointer' width={15} src={item.showPassword ? "icons/eyecross.png" : "icons/eye.png"} alt="Show icon for password" onClick={() => togglePasswordVisibility(item.id)} />
                                                    <span className='lordiconcopy cursor-pointer flex items-center' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon style={{ width: '20px', height: '20px' }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 px-1 md:px-2 border border-white'>
                                            <div className='flex justify-between'>
                                                <span className='cursor-pointer px-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: '20px', height: '20px' }}></lord-icon>
                                                </span>
                                                <span className='cursor-pointer px-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: '20px', height: '20px' }}></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager