import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-screen font-sans text-white relative bg-cover bg-center"
             style={{ backgroundImage: "url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-2xl p-5 text-center">
                <h1 className="mb-10 text-3xl font-bold text-white">Oops, something went wrong</h1>
                <p className="text-lg leading-relaxed">
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-5 px-4 py-2 text-white bg-red-700 rounded hover:bg-red-600"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
