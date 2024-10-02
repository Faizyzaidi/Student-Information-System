import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import SubjectIcon from "../../assets/subjects.svg";
import AssignmentIcon from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList?.length || 0;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <div className="container mx-auto mt-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <img src={SubjectIcon} alt="Subjects" className="mx-auto" />
                    <h2 className="text-lg font-semibold text-center">Total Subjects</h2>
                    <Data start={0} end={numberOfSubjects} duration={2.5} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <img src={AssignmentIcon} alt="Assignments" className="mx-auto" />
                    <h2 className="text-lg font-semibold text-center">Total Assignments</h2>
                    <Data start={0} end={15} duration={4} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-1">
                    <div className="flex flex-col h-60 justify-center items-center text-center">
                        {response ? (
                            <h6 className="text-gray-600">No Attendance Found</h6>
                        ) : (
                            <>
                                {loading ? (
                                    <h6 className="text-gray-600">Loading...</h6>
                                ) : (
                                    <>
                                        {Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                            <CustomPieChart data={chartData} />
                                        ) : (
                                            <h6 className="text-gray-600">No Attendance Found</h6>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <SeeNotice />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Data = ({ start, end, duration }) => (
    <CountUp start={start} end={end} duration={duration}>
        {({ countUpRef }) => (
            <p className="text-2xl font-bold text-green-500 text-center" ref={countUpRef} />
        )}
    </CountUp>
);

export default StudentHomePage;
