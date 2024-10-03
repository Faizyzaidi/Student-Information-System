import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentRole, currentUser } = useSelector(state => state.user);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleMenu}
                    className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-haspopup="true"
                >
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
                        {String(currentUser.name).charAt(0)}
                    </div>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to={`/${currentRole}/profile`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                                <span>{String(currentUser.name).charAt(0)}</span>
                            </div>
                            Profile
                        </Link>
                        <div className="border-t border-gray-200"></div>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleMenu}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                                <path d="M10 8a1 1 0 100 2 1 1 0 000-2zm1 4H9v2h2v-2z" />
                            </svg>
                            Settings
                        </button>
                        <Link to="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm-1 14v-3H6V9h3V6h2v3h3v2h-3v3h-2z" />
                            </svg>
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountMenu;
