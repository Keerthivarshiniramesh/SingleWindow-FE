import React, { useEffect, useState } from 'react'
import Header from '../Header'
import LoadingPage from '../Loading'

export default function Dashboard() {
    const url = process.env.REACT_APP_URL

    let [applied, setapplied] = useState(null)

    useEffect(() => {
        fetch(`${url}applications`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setapplied(data.application);


                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })

    }, [])
    console.log(applied)


    // Edit and view

    const [view, setView] = useState(null)
    const [see, setSee] = useState(false)

    const [status, setStatus] = useState('')
    const [remarks, setRemarks] = useState('')

    const View = (id) => {
        console.log(id)
        fetch(`${url}applications/${id}`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.application);
                    setSee(true)


                }
                else {
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

        fetch(`${url}update-application-createNotification/${id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                status, remarks
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)
                    window.location.reload()
                } else {
                    alert(data.message)
                }
            })
            .catch(() => alert("Trouble connecting to server"))

    }


    if (applied === null) {
        return <LoadingPage />
    }
    return (
        <div>
            <section className="h-[100vh] bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 ">
                <main className="flex-grow py-4 px-6">
                    <h3 className="text-center text-xl font-semibold mb-6">Applied Details</h3>


                    <div className="overflow-x-auto mt-8">
                        <table className="min-w-full table-auto bg-white border rounded shadow-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="py-2 px-4 text-left">S.No</th>
                                    <th className="py-2 px-4 text-left">User Name</th>
                                    <th className="py-2 px-4 text-left">Email</th>


                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applied.map((apply, index) => {

                                    return (
                                        <tr key={index} className="border-t">
                                            <td className="py-2 px-4 font-bold">{index + 1}</td>
                                            <td className="py-2 px-4 uppercase">{apply.user.name}</td>
                                            <td className="py-2 px-4">{apply.user.email}</td>


                                            <td className="py-2 px-4 flex gap-2">

                                                <i
                                                    className="bi bi-pencil-square text-blue-600 cursor-pointer"
                                                    role="button"
                                                    onClick={() => View(apply.id)}
                                                ></i>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>


                {
                    see &&
                    (
                        <section>
                            <div className="fixed top-0 left-0 w-full min-h-screen flex justify-center items-center bg-light/75 z-30">
                                <div className="p-3 rounded bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 shadow-2xl w-full overflow-auto max-w-[800px] max-h-[90vh]">
                                    <h4 className="m-2 pb-4 text-info text-center text-xl font-semibold">Application Details</h4>

                                    {/* Form Rows */}
                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Name:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.user.name || ''}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Email:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Type:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.type}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Option:</label>
                                            <p className="border border-gray-300 rounded px-4 py-2 text-sm font-medium text-black bg-gray-100">{view.option}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Personal Id Proof:</label>
                                            <img src={`${url}${view.personalIdProof.filepath}`} />
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Business Id Proof:</label>
                                            <img src={`${url}${view.businessIdProof.filepath}`} />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap px-3">
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block font-medium text-info mb-1">Remarks:</label>
                                            <input
                                                type="text"
                                                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                value={remarks}
                                                onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/2 mb-4 px-2">
                                            <label className="block text-info font-medium mb-1">Status:</label>
                                            <select
                                                className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="level1Approved">Level1Approved</option>
                                                <option value="level2Approved">Level2Approved</option>
                                                <option value="level1Rejected">Level1Rejected</option>
                                                <option value="level2Rejected">Level2Rejected</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-end items-stretch gap-2 pt-3 px-3">
                                        <button className="bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded" onClick={() => setSee(false)}>
                                            Cancel
                                        </button>
                                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded border border-white" onClick={(e) => Update(view.id)}>
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
