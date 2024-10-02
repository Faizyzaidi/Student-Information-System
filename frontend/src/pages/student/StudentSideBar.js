import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ExitToAppIcon,
    AccountCircleOutlinedIcon,
    AnnouncementOutlinedIcon,
    ClassOutlinedIcon,
    AssignmentIcon,
} from '@mui/icons-material';

const StudentSideBar = () => {
    const location = useLocation();

    const menuItems = [
        { to: "/", label: "Home", Icon: HomeIcon },
        { to: "/Student/subjects", label: "Subjects", Icon: AssignmentIcon },
        { to: "/Student/attendance", label: "Attendance", Icon: ClassOutlinedIcon },
        { to: "/Student/complain", label: "Complain", Icon: AnnouncementOutlinedIcon },
        { to: "/Student/profile", label: "Profile", Icon: AccountCircleOutlinedIcon },
        { to: "/logout", label: "Logout", Icon: ExitToAppIcon },
    ];

    return (
        <div className="bg-white shadow-md h-full">
            <nav>
                <ul className="space-y-1">
                    {menuItems.map(({ to, label, Icon }) => (
                        <li key={to}>
                            <Link to={to} className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname.startsWith(to) ? 'bg-gray-200' : ''}`}>
                                <Icon className={`mr-3 ${location.pathname.startsWith(to) ? 'text-blue-500' : 'text-gray-500'}`} />
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="border-t my-2" />
            <div className="px-2">
                <h3 className="text-gray-600 font-semibold">User</h3>
                <ul className="space-y-1">
                    <li>
                        <Link to="/Student/profile" className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname.startsWith("/Student/profile") ? 'bg-gray-200' : ''}`}>
                            <AccountCircleOutlinedIcon className={`mr-3 ${location.pathname.startsWith("/Student/profile") ? 'text-blue-500' : 'text-gray-500'}`} />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${location.pathname.startsWith("/logout") ? 'bg-gray-200' : ''}`}>
                            <ExitToAppIcon className={`mr-3 ${location.pathname.startsWith("/logout") ? 'text-blue-500' : 'text-gray-500'}`} />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default StudentSideBar;
