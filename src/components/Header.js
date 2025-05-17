import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Header() {
    const url = process.env.REACT_APP_URL

    const navigate = useNavigate()

    const [loginName, setLoginname] = useState('')

    let user = ''

    // useEffect(() => {
    //     fetch(`${url}checkauth`,
    //         {
    //             method: "GET",
    //             credentials: 'include',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accept": "application/json"
    //             }
    //         }
    //     )
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(url)

    //             if (data.success === true) {
    //                 setUser(data.userdata)
    //                 console.log(data)
    //             }
    //             else {
    //                 alert(data.message)
    //             }
    //         })
    //         .catch(err => {
    //             console.log("Error in fetching")
    //             alert("Trouble in connecting to Server", err)
    //         })
    // }, [url])

    useEffect(() => {
        const users = localStorage.getItem('users')
        console.log(users)

        if (users) {
            user = JSON.parse(users)
            console.log(user)
            let name = user.email.slice(0, user.email.indexOf('@'))
            setLoginname(name)
        }
    }, [])


    const Logout = () => {
        fetch(`${url}logout`, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                navigate('/user-login')
                console.log(data)
            })
            .catch(err => {
                console.log("Error :", err)
                alert("Trouble in connecting to Server")
            })
    }

    return (
        <div>
            <header className="flex justify-between items-center bg-white shadow p-3 px-4 sticky top-0 z-50">
                <div className="text-center text-2xl font-bold mb-6 ">
                    <p className='text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-300'>
                        Entreprenur Portals
                    </p>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                    <i className="bi bi-person-circle text-cyan-600 text-xl"></i>
                    <span className="font-bold">{loginName}</span>
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={Logout}
                    >
                        <i className="bi bi-box-arrow-right text-red-600 text-xl"></i>
                        <span className="font-bold">Logout</span>
                    </div>
                </div>
            </header>

        </div>
    )
}
