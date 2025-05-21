import React, { useEffect, useState } from 'react'
import Header from '../Header'
import loan from '../../assests/contract.png'
import license from '../../assests/licensing.png'
import { useNavigate } from 'react-router'
import notify from '../../assests/notification-bell.png'
import alertImage from '../../assests/text.png'
import LoadingPage from '../Loading'

export default function DashBoard() {
    const [see, setSee] = useState(false)
    const url = process.env.REACT_APP_URL

    // Notification send
    const [viewNotify, setViewNotify] = useState(null)

    const getNotify = `${url}notificationsend`
    console.log(getNotify)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(getNotify)
                const data = await response.json()

                console.log("Fetched notification data:", data)

                if (data.success && Array.isArray(data.notifies)) {
                    setViewNotify(data.notifies)
                } else {
                    console.warn("Unexpected response structure:", data)
                    setViewNotify([]) // set empty to avoid null errors
                }
            } catch (error) {
                console.error("Error fetching notifications:", error)
            }
        }

        fetchNotifications()
    }, [getNotify])

    const navigate = useNavigate()

    // Edit application
    const [edit, setEdit] = useState(false)
    const [view, setView] = useState(null)

    const View = (id) => {
        console.log(id)
        fetch(`${url}applications/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.application)

                } else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })
    }

    console.log("Views", view)

    const Update = (id) => {
        const formData = new FormData()

        // This was incorrect: formData("personalIdProof", view.personalIdProof)
        // Should be append:
        formData.append("personalIdProof", view.personalIdProof)
        formData.append("businessIdProof", view.businessIdProof)

        fetch(`${url}user-upload-documents/${id}`, {
            method: "POST",
            // When sending FormData, do NOT set Content-Type manually — the browser does it automatically
            // So removing Content-Type header here:
            // headers: { "Accept": "application/json", "Content-Type": "application/json" },
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    // window.location.reload()
                } else {
                    alert(data.message)
                }
            })
            .catch(() => alert("Trouble connecting to server"))
    }

    // id getItem
    let [user, setUser] = useState(null)

    useEffect(() => {
        const users = localStorage.getItem('users')
        console.log(users)

        if (users) {
            let parsedUser = JSON.parse(users)
            setUser(parsedUser)
            console.log("Parsed User", parsedUser)

        }
    }, [])

    // Log user changes
    useEffect(() => {
        console.log("User state changed:", user)
    }, [user])

    let [applied, setApplied] = useState(null)

    useEffect(() => {
        fetch(`${url}applications`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setApplied(data.application)
                } else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })
    }, [url])

    let Format = () => {
        if (!applied || !user) return

        console.log("Applied Applications:", applied)

        const validApplications = applied.filter(app => app && app.user)

        const apply_id = validApplications.find(apply => {
            return (
                apply.user._id === user.id ||
                apply.user.id === user.id ||
                apply.user.email === user.email
            )
        })

        if (apply_id) {
            setEdit(true)
            View(apply_id.id)
        } else {
            alert("Application not found for this user.")
        }
    }
    if (applied === null) {
        return <LoadingPage />
    }

    return (
        <div>
            <section className="bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 w-full min-h-screen overflow-hidden py-10 px-4">

                <div className="w-full mt-auto pb-3 px-4 sm:px-6 md:px-8">
                    <div className="relative flex justify-start px-4 sm:px-6 md:px-8">
                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                            <img
                                src={notify}
                                alt="Notification"
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] transition-transform duration-300 ease-in-out cursor-pointer"
                                onClick={() => setSee(!see)}
                            />
                        </div>

                        {/* Notification Dropdown */}
                        {see && (
                            <div className="absolute top-full left-0 mt-2 w-full sm:w-80 max-w-md px-2 sm:px-0 z-50">
                                {viewNotify && viewNotify.length > 0 ? (
                                    viewNotify.map((notifi, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-lg shadow mb-3 w-full"
                                            role="alert"
                                        >
                                            <div className="flex items-center justify-between px-4 py-2 border-b">
                                                <div className="flex items-center space-x-2">
                                                    <img src={alertImage} alt="alert icon" className="w-5 h-5 rounded" />
                                                    <strong className="text-sm">{notifi.types}</strong>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <small className="text-xs text-gray-500">{new Date(notifi.createdAt).toLocaleString()}</small>
                                                    <button
                                                        type="button"
                                                        className="text-gray-500 hover:text-red-500 text-sm"
                                                        onClick={() => setSee(false)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 text-sm text-gray-700">
                                                <strong>{notifi.userID?.fullname || "Unknown User"}</strong> — {notifi.message}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-4 text-gray-500">No notifications</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        {applied && user && (
                            <div className="flex justify-end pt-4 pr-4">
                                <button
                                    className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-4 py-2 rounded"
                                    onClick={() => Format()}
                                >
                                    Update
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 items-center">
                    {/* Loan Card */}
                    <div className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <img src={loan} alt="Loan" className="mx-auto max-h-40 object-contain" />
                            <div className="p-5">
                                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                    Loan
                                </h5>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => navigate('/loanform')}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* License Card */}
                    <div className="w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6">
                            <img src={license} alt="License" className="mx-auto max-h-40 object-contain" />
                            <div className="p-5">
                                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                    License
                                </h5>
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => navigate('/loanform')}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded font-semibold shadow-md hover:opacity-90 transition duration-300"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {edit && view && (
                    <section>
                        <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center bg-light/75 z-30">
                            <div className="p-3 rounded bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 shadow-2xl w-full overflow-auto max-w-[800px] max-h-[90vh]">
                                <h4 className="m-2 pb-4 text-info text-center text-xl font-semibold">Application Details</h4>

                                {/* Form Rows */}
                                <div className="flex flex-wrap px-3">
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Name:</label>
                                        <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.user?.name || ''}</p>
                                    </div>
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Email:</label>
                                        <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.user?.email || ''}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap px-3">
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Type:</label>
                                        <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.type || ''}</p>
                                    </div>
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Option:</label>
                                        <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.option || ''}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap px-3">
                                    {/* Personal Id Proof */}
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Personal Id Proof:</label>

                                        {/* Label wraps image and triggers input */}
                                        <label className="cursor-pointer inline-block">
                                            <img
                                                src={`${url}${view.personalIdProof.filepath}`}
                                                alt="Personal Id Proof"
                                                className="w-full max-w-xs border rounded"
                                            />
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) =>
                                                    setView({ ...view, personalIdProof: e.target.files[0] })
                                                }
                                            />
                                        </label>
                                    </div>

                                    {/* Business Id Proof */}
                                    <div className="w-full md:w-1/2 mb-4 px-2">
                                        <label className="block font-medium text-info mb-1">Business Id Proof:</label>

                                        <label className="cursor-pointer inline-block">
                                            <img
                                                src={`${url}${view.businessIdProof.filepath}`}
                                                alt="Business Id Proof"
                                                className="w-full max-w-xs border rounded"
                                            />
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) =>
                                                    setView({ ...view, businessIdProof: e.target.files[0] })
                                                }
                                            />
                                        </label>
                                    </div>
                                </div>


                                <div className="flex flex-col md:flex-row justify-end items-stretch gap-2 pt-3 px-3">
                                    <button
                                        className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded"
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded border border-white"
                                        onClick={() => Update(view.id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </section>
        </div>
    )
}
