import React from 'react';
import { Link } from 'react-router-dom';
import Students from "../assets/students.svg";

const Homepage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <div>
                    <img src={Students} alt="students" className="w-full" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Welcome to
                        <br />
                        School Management
                        <br />
                        System
                    </h1>
                    <p className="mb-6 text-gray-700">
                        Streamline school management, class organization, and add students and faculty.
                        Seamlessly track attendance, assess performance, and provide feedback.
                        Access records, view marks, and communicate effortlessly.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Link to="/choose" className="w-full">
                            <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full w-full">
                                Login
                            </button>
                        </Link>
                        <Link to="/chooseasguest" className="w-full">
                            <button className="border border-purple-600 text-purple-600 font-semibold py-2 px-4 rounded-full w-full">
                                Login as Guest
                            </button>
                        </Link>
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <Link to="/Adminregister" className="text-purple-600">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
