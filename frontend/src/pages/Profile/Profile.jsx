import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const {user} = useSelector((state)=>state.user);

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen flex justify-center items-center pt-5 px-6 md:px-12">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full text-center">
        {/* Personal Info */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">📧 Name:</h4>
              <p>{user.name}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">📧 Email:</h4>
              <p>{user.email}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">📞 Phone:</h4>
              <p>{user.phone}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">🎂 Age:</h4>
              <p>{user.age} years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
