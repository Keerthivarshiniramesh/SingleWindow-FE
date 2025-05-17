import React, { useEffect, useState } from 'react'
import LoadingPage from '../Loading';
import Header from '../Header';

export default function LoanForm() {

    const url = process.env.REACT_APP_URL


    const [users, setUsers] = useState(null)

    useEffect(() => {
        fetch(`${url}checkauth_user`,
            {
                method: "GET",
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUsers(data.users)
                } else {
                    alert(data.message)
                }
            })
            .catch(() => alert("Trouble connecting to server"));
    }, [])



    const [loanform, setLoanForm] = useState({
        email: '',
        type: '',
        option: '',
        personalIdProof: null,
        businessIdProof: null,
        status: '',

    })

    const [user, setUser] = useState(null);

    useEffect(() => {
        const logins = localStorage.getItem('users')

        if (logins) {

            setUser(JSON.parse(logins));

        }
    }, [])
    console.log("users", user)

    const Create = (e, keys) => {
        const { value, files, type } = e.target

        if (keys === 'email' && user) {
            // Always update the typed value
            setLoanForm(prev => ({
                ...prev,
                email: user.id  // Overwrites the email with ID
            }));

            // Try to find a matching user
            // const matched = users.find(user => user.email === value);

            // If found, replace the typed value with the ID

        } else if (type === 'file' && files.length > 0) {
            setLoanForm(prev => (
                {
                    ...prev,
                    [keys]: files[0]
                }))
        }

        else {
            setLoanForm(prev => (
                {
                    ...prev,
                    [keys]: value
                }))
        }

    }

    const formdata = new FormData()
    let Save = () => {

        formdata.append("userId", loanform.email)
        formdata.append("type", loanform.type)
        formdata.append("option", loanform.option)
        formdata.append("businessIdProof", loanform.businessIdProof)
        formdata.append("personalIdProof", loanform.personalIdProof)



        fetch(`${url}app-create`, {
            method: "POST",

            credentials: 'include',
            body: formdata
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(data.message)

                } else {
                    alert(data.message)
                }
            })
            .catch(() => alert("Trouble connecting to server"))
    }
    if (users === null) {
        return <LoadingPage />
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 py-10">
       
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
                        {/* Left: General Information */}
                        <div className="w-full lg:w-1/2 p-8">
                            <h3 className="text-2xl font-semibold text-[#4835d4] mb-6">General Information</h3>



                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <div className="w-full">
                                    <label className="block text-lg font-medium mb-1">Email :</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3" value={loanform.email} onChange={(e) => Create(e, 'email')} />
                                </div>

                            </div>

                            <div className="mb-10">
                                <label className="block text-lg font-medium mb-1">Type :</label>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="loan"
                                            checked={loanform.type === 'loan'}
                                            onChange={(e) => Create(e, 'type')}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 text-gray-700">Loan</span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="license"
                                            checked={loanform.type === 'license'}
                                            onChange={(e) => Create(e, 'type')}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 text-gray-700">License</span>
                                    </label>
                                </div>

                            </div>

                            <div className="mb-10">
                                <label className="block text-lg font-medium mb-1">Option :</label>
                                {
                                    loanform.type === "loan" ? (
                                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                            value={loanform.option} onChange={(e) => Create(e, 'option')}>

                                            <option value="Startup India">Startup India</option>
                                            <option value="Stand-Up India Scheme">Stand-Up India Scheme</option>
                                            <option value="MUDRA Loan Scheme">MUDRA Loan Scheme</option>
                                            <option value="Atal Innovation Mission ">Atal Innovation Mission </option>
                                            <option value="National Small Industries Corporation (NSIC) Subsidy">National Small Industries Corporation (NSIC) Subsidy</option>


                                        </select>
                                    ) :
                                        (
                                            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                value={loanform.option} onChange={(e) => Create(e, 'option')}>

                                                <option value="Company Registration (Private Limited / LLP )">Company Registration (Private Limited / LLP )</option>
                                                <option value="PAN (Permanent Account Number)">PAN (Permanent Account Number)</option>
                                                <option value="TAN (Tax Deduction and Collection Account Number)">TAN (Tax Deduction and Collection Account Number)</option>
                                                <option value=" GST Registration">GST Registration</option>
                                                <option value="Udyam/MSME Registration">Udyam/MSME Registration</option>

                                            </select>
                                        )
                                }

                            </div>


                        </div>

                        {/* Right: Contact Details */}
                        <div className="w-full lg:w-1/2 p-8 bg-orange-700 text-white rounded-t-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-b-2xl">
                            <h3 className="text-2xl font-semibold mb-6">Contact Details</h3>

                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-1">Personal Id Proof : </label>
                                <input type="file" className="w-full border border-white bg-transparent rounded-lg px-4 py-3 text-white placeholder-white"
                                    onChange={(e) => Create(e, 'personalIdProof')} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-1">Bussiness Id Proof : </label>
                                <input type="file" className="w-full border border-white bg-transparent rounded-lg px-4 py-3 text-white placeholder-white"
                                    onChange={(e) => Create(e, 'businessIdProof')} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="w-full">
                                    <label className="block text-lg font-medium mb-1">Status :</label>
                                    <select className="w-full border text-black border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        value={loanform.status} onChange={(e) => Create(e, 'status')}>

                                        <option value="pending">Pending</option>
                                        <option value="level1Approved">Level1Approved</option>
                                        <option value="level2Approved">Level2Approved</option>
                                        <option value="level1Rejected">Level1Rejected</option>
                                        <option value="level2Rejected">Level2Rejected</option>

                                    </select>
                                </div>

                            </div>




                            <div className="flex items-start mb-4">
                                <input type="checkbox" id="terms" className="mr-3 mt-1" />
                                <label htmlFor="terms" className="text-sm">
                                    I do accept the <a href="#" className="text-black font-bold ">Terms and Conditions</a> .
                                </label>
                            </div>

                            <button className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition" onClick={Save}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
