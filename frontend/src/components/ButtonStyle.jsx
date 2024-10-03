import React from 'react';

// Red Button
export const RedButton = ({ children, ...props }) => (
    <button
        className="bg-red-600 text-white ml-1 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        {...props}
    >
        {children}
    </button>
);

// Black Button
export const BlackButton = ({ children, ...props }) => (
    <button
        className="bg-black text-white ml-1 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
        {...props}
    >
        {children}
    </button>
);

// Dark Red Button
export const DarkRedButton = ({ children, ...props }) => (
    <button
        className="bg-red-800 text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        {...props}
    >
        {children}
    </button>
);

// Blue Button
export const BlueButton = ({ children, ...props }) => (
    <button
        className="bg-blue-800 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        {...props}
    >
        {children}
    </button>
);

// Purple Button
export const PurpleButton = ({ children, ...props }) => (
    <button
        className="bg-purple-800 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...props}
    >
        {children}
    </button>
);

// Light Purple Button
export const LightPurpleButton = ({ children, ...props }) => (
    <button
        className="bg-purple-400 text-white hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
        {...props}
    >
        {children}
    </button>
);

// Green Button
export const GreenButton = ({ children, ...props }) => (
    <button
        className="bg-green-800 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        {...props}
    >
        {children}
    </button>
);

// Brown Button
export const BrownButton = ({ children, ...props }) => (
    <button
        className="bg-brown-800 text-white hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-600"
        {...props}
    >
        {children}
    </button>
);

// Indigo Button
export const IndigoButton = ({ children, ...props }) => (
    <button
        className="bg-indigo-800 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        {...props}
    >
        {children}
    </button>
);
