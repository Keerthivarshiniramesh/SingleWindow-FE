import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import home_image from '../../assests/singlewidow_home.jpg'

export default function Login({ auth }) {

    const use = useNavigate()
    const url = process.env.REACT_APP_URL
    console.log(url)

    const [valid, setValid] = useState({
        email: '',
        pwd: '',

    })

    const [check, setCheck] = useState(null)

    const Validation = (event, keys) => {
        const value = event.target.value
        setValid(prev => ({
            ...prev,
            [keys]: value

        }))

    }

    let Login = (e) => {
        e.preventDefault()

        if (valid.email === '' || valid.pwd === '') {
            setCheck(true)
        }

        fetch(`${url}login`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ email: valid.email, password: valid.pwd })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Login response:", data); // Debugging aid

                if (data.success === true && data.user) {
                    const role = data.user.role || null;
                    localStorage.setItem('users', JSON.stringify(data.user));
                    auth(true);

                    if (role === 'admin') {
                        fetch(`${url}checkauth`, {
                            method: "GET",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            credentials: 'include',
                        })
                            .then(res => res.json())
                            .then(authData => {
                                if (authData.success) {
                                    alert(authData.message);
                                    use('/admindash');
                                } else {
                                    alert(authData.message);
                                }
                            });
                    } else if (role === 'super admin') {
                        fetch(`${url}checkauth`, {
                            method: "GET",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            credentials: 'include',
                        })
                            .then(res => res.json())
                            .then(authData => {
                                if (authData.success) {
                                    alert(authData.message);
                                    use('/superdash');
                                } else {
                                    alert(authData.message);
                                }
                            });
                    } else {
                        use('/dashboard');
                    }
                } else {
                    alert(data.message || "Login failed. Please try again.");
                }
            })
            .catch(err => {
                console.log("Error", err)
                alert("Trouble in connecting to Server")
            })
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
                        <p className='my-3'>Don't have an account? then <a className='text-sky-500' href='/registers'>Click Admin</a> or <a className='text-sky-500' href='/user-reg'>Click Users</a></p>
                        <form>
                            <p className="font-medium text-lg mb-6 text-center">Please login to your account</p>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    value={valid.email}
                                    onChange={(e) => Validation(e, 'email')}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={valid.pwd}
                                    onChange={(e) => Validation(e, 'pwd')}
                                    className="w-full p-3 rounded border border-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>


                            {check && (
                                <p className="text-red-600 text-sm mb-4">*Invalid email or password</p>
                            )}

                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={(e) => Login(e)}
                                    className="w-3/4 bg-gradient-to-r from-red-400 to-orange-500 text-white py-3 rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                >
                                    Log in
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
