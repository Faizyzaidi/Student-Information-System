import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/UserHandle';
import Popup from '../components/Popup';
//import bgpic from "../assets/designlogin.jpg";

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        rollNumber: false,
        studentName: false
    });

    const handleInputChange = (event) => {
        const { name } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = {};

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                setErrors({
                    rollNumber: !rollNum,
                    studentName: !studentName,
                    password: !password
                });
                return;
            }
            fields.rollNum = rollNum;
            fields.studentName = studentName;
            fields.password = password;
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                setErrors({
                    email: !email,
                    password: !password
                });
                return;
            }
            fields.email = email;
            fields.password = password;
        }

        setLoader(true);
        dispatch(loginUser(fields, role));
    };

    const guestModeHandler = () => {
        const password = "zxc";
        const fields = role === "Student" ? {
            rollNum: "1",
            studentName: "Dipesh Awasthi",
            password
        } : {
            email: role === "Admin" ? "yogendra@12" : "tony@12",
            password
        };

        setGuestLoader(true);
        dispatch(loginUser(fields, role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser) {
            navigate(currentRole === 'Admin' ? '/Admin/dashboard' : currentRole === 'Student' ? '/Student/dashboard' : '/Teacher/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, response, currentUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="hidden md:block w-1/2 bg-cover" style={{ backgroundImage: `url(${bgpic})` }}></div>
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">{role} Login</h2>
                <p className="text-center mb-6 text-gray-600">Welcome back! Please enter your details</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {role === "Student" ? (
                        <>
                            <div>
                                <label className="block text-gray-700">Roll Number</label>
                                <input
                                    type="number"
                                    name="rollNumber"
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                    placeholder="Enter your Roll Number"
                                />
                                {errors.rollNumber && <p className="text-red-500 text-sm">Roll Number is required</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="studentName"
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${errors.studentName ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                    placeholder="Enter your name"
                                />
                                {errors.studentName && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>
                        </>
                    ) : (
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={togglePasswordVisibility ? "text" : "password"}
                                name="password"
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 text-gray-500"
                                onClick={() => setTogglePasswordVisibility(!togglePasswordVisibility)}
                            >
                                {togglePasswordVisibility ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox text-indigo-600" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <Link to="#" className="text-indigo-600 text-sm">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none"
                    >
                        {loader ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        onClick={guestModeHandler}
                        className="w-full mt-4 bg-white text-indigo-600 border border-indigo-600 py-2 rounded-lg hover:bg-indigo-50"
                    >
                        Login as Guest
                    </button>

                    {role === "Admin" && (
                        <div className="flex justify-center mt-4 text-gray-600">
                            <span>Don't have an account?</span>
                            <Link to="/Adminregister" className="ml-2 text-indigo-600">Sign up</Link>
                        </div>
                    )}
                </form>
            </div>
            {guestLoader && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="text-white">Please wait...</div>
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default LoginPage;
