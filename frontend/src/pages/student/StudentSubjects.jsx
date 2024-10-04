import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/UserHandle';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => (
        <div className="mb-4">
            <h2 className="text-2xl text-center font-bold mb-4">Subject Marks</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Subject</th>
                        <th className="border border-gray-200 px-4 py-2">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectMarks.map((result, index) => (
                        result.subName && result.marksObtained ? (
                            <tr key={index}>
                                <td className="border border-gray-200 px-4 py-2">{result.subName.subName}</td>
                                <td className="border border-gray-200 px-4 py-2">{result.marksObtained}</td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderChartSection = () => (
        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
    );

    const renderClassDetailsSection = () => (
        <div className="mb-4">
            <h2 className="text-2xl text-center font-bold mb-4">Class Details</h2>
            <h3 className="text-lg mb-2">
                You are currently in Class {sclassDetails?.sclassName}
            </h3>
            <h4 className="text-md mb-2">And these are the subjects:</h4>
            {subjectsList?.map((subject, index) => (
                <div key={index} className="mb-1">
                    <span className="font-medium">{subject.subName}</span> ({subject.subCode})
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' ? renderTableSection() : renderChartSection()}
                            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2">
                                <button
                                    className={`p-2 ${selectedSection === 'table' ? 'bg-blue-500 text-white' : 'text-blue-500'} mr-2`}
                                    onClick={() => handleSectionChange('table')}
                                >
                                    Table
                                </button>
                                <button
                                    className={`p-2 ${selectedSection === 'chart' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                                    onClick={() => handleSectionChange('chart')}
                                >
                                    Chart
                                </button>
                            </div>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentSubjects;
