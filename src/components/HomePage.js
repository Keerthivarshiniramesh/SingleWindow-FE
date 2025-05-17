import React from 'react';
import license from '../assests/license.png'
import loan from '../assests/loan.jpg'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-300 via-blue-200 to-orange-200 flex flex-col">
            {/* Navbar */}
            <header className=" bg-white text-white py-6 shadow">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600  to-orange-400">Entrepreneur Portal</h1>
                    <p className="mt-2 text-lg  text-transparent bg-clip-text bg-gradient-to-r from-red-400  to-orange-300">Your gateway to licenses, loans, and business growth</p>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col justify-center items-center text-center px-6 mt-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6">
                    Welcome to the Entrepreneur Portal
                </h2>
                <p className="max-w-xl text-indigo-700 text-lg mb-8">
                    Manage your business applications, upload necessary documents, and track progress all in one place.
                </p>
                <div className="space-x-4">
                    <a
                        href="/registers"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Get Started
                    </a>
                    <a
                        href="/user-login"
                        className="inline-block border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition"
                    >
                        Login
                    </a>
                </div>
            </main>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* License Assistance */}
                    <section className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <img
                            src={license}
                            alt="Business License Application"
                            className="w-full h-48 object-cover rounded-md mb-6"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Simplify Your Licensing Process</h2>
                        <p className="text-gray-600 text-center">
                            Get step-by-step guidance on obtaining all necessary business licenses and permits. Submit your applications online, track approvals, and stay compliant with government regulations—all in one place.
                        </p>
                    </section>

                    {/* Loan Support */}
                    <section className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <img
                            src={loan}
                            alt="Loan Support for Entrepreneurs"
                            className="w-full h-48 object-cover rounded-md mb-6"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Financial Support Easily</h2>
                        <p className="text-gray-600 text-center">
                            Explore various government loan schemes and funding options tailored for startups and small businesses. Apply online, upload your documents securely, and track your loan application status anytime.
                        </p>
                    </section>
                </div>

                {/* Features Section */}
                <section className="bg-white py-12 mt-16">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-indigo-50 p-6 rounded-lg shadow">
                            <h3 className="text-indigo-800 text-xl font-semibold mb-3">Easy Registration</h3>
                            <p>Quickly create your entrepreneur profile to get access to government schemes and services.</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-lg shadow">
                            <h3 className="text-indigo-800 text-xl font-semibold mb-3">Document Upload</h3>
                            <p>Securely upload your personal and business documents for smooth application processing.</p>
                        </div>
                        <div className="bg-indigo-50 p-6 rounded-lg shadow">
                            <h3 className="text-indigo-800 text-xl font-semibold mb-3">Track Applications</h3>
                            <p>Monitor the status of your business applications and receive real-time updates.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-gray-700 py-6 mt-12 text-center">
                © 2025 Entrepreneur Portal. All rights reserved.
            </footer>
        </div>

    );
};


