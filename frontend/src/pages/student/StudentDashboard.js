import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import StudentSideBar from './StudentSideBar';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className="flex">
            <div className={`fixed inset-y-0 left-0 z-10 bg-white shadow-lg transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'} w-64`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold">Student Dashboard</h1>
                    <button onClick={toggleDrawer} className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="border-t border-gray-200">
                    <StudentSideBar />
                </div>
            </div>
            <div className={`flex-1 ml-64 transition-margin ${open ? '' : 'ml-0'}`}>
                <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
                    <button onClick={toggleDrawer} className="text-gray-400 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <AccountMenu />
                </header>
                <main className="p-4 bg-gray-100 h-screen overflow-auto">
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />
                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
