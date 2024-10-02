import React from 'react';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
        <div className="flex justify-center mb-4">
          <div className="w-36 h-36 flex items-center justify-center bg-gray-200 rounded-full text-4xl font-bold">
            {String(currentUser.name).charAt(0)}
          </div>
        </div>
        <h2 className="text-2xl text-center mb-2">{currentUser.name}</h2>
        <p className="text-center text-lg">Student Roll No: {currentUser.rollNum}</p>
        <p className="text-center text-lg">Class: {sclassName.sclassName}</p>
        <p className="text-center text-lg">School: {studentSchool.schoolName}</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Date of Birth:</p>
            <p>January 1, 2000</p>
          </div>
          <div>
            <p className="font-bold">Gender:</p>
            <p>Male</p>
          </div>
          <div>
            <p className="font-bold">Email:</p>
            <p>john.doe@example.com</p>
          </div>
          <div>
            <p className="font-bold">Phone:</p>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <p className="font-bold">Address:</p>
            <p>123 Main Street, City, Country</p>
          </div>
          <div>
            <p className="font-bold">Emergency Contact:</p>
            <p>(987) 654-3210</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
