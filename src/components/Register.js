import React from 'react'
import { useState, useContext } from 'react';

import { useNavigate } from 'react-router';
import home_image from '../assests/singlewidow_home.jpg'

const Register = () => {

    const use = useNavigate()
    const url = process.env.REACT_APP_URL

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');



    const handleRegister = async () => {



        if (name !== "" || email !== "" || contact !== "" || password !== "" || role !== '') {

            fetch(`${url}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ fullname: name, email, contact, password, role }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        // Signup successful

                        setName('')
                        setEmail('')
                        setContact('')
                        setPassword('')
                        if (role === 'admin')
                            use('/admindash')
                        else
                            use('/superdash')
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Trouble in connecting to the Server! Please try again later.')
                    console.log('Error in Register: ' + err)
                })


        }
        else {
            alert("All fields are required!")
        }

    }


    return (
        <section className="h-[100vh] bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 flex items-center justify-center">
            <div className="w-full max-w-6xl p-4">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row ">

                    {/* Left Side – Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <div className="text-center text-2xl font-bold mb-6 ">
                            <p className='text-transparent bg-clip-text bg-gradient-to-r from-red-700  to-orange-300'>Entreprenur Portals</p>
                        </div>
                        <p className='mb-3'>Already have an account? then <a className='text-sky-600' href='/user-login'>Click here</a></p>
                        <form>
                            <p className="font-medium text-lg mb-6 text-center">Register your account</p>

                            <div className="mb-4">
                                <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Name</label>
                                <input
                                    type="text"

                                    value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                <input
                                    type="text"

                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <input
                                    type="text"

                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Contact</label>
                                <input
                                    type="text"

                                    value={contact} onChange={(e) => setContact(e.target.value)}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-4 ">
                                <label htmlFor="InputContact" className="block text-sm/6 font-medium text-gray-900">Role</label>

                                <select className='w-full border border-gray-300 rounded px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400' aria-label="select status" value={role}
                                    onChange={(e) => setRole(e.target.value)}>
                                    <option value=""> Select Roles</option>
                                    <option value="super admin">Super Admin</option>
                                    <option value="admin">Admin</option>

                                </select>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="w-3/4 bg-gradient-to-r from-red-400 to-orange-500 text-white py-3 rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side – Info Panel */}
                    <div className="w-full md:w-1/2 bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 text-white flex items-center justify-center p-8 md:p-12">
                        <div>
                            <img src={home_image} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Register