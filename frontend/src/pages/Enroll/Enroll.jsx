import React, { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../utils/toasts";
import months from "../../constants/months.js";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollmentDetails } from "../../../redux/features/user/userSlice.js";

const EnrolledBatch = ({ enrollmentDetails }) => {

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen flex justify-center items-center px-6 md:px-12">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full text-center">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Enrollment Details
        </h2>

        {/* Enrollment Info */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md text-gray-800">
          <h3 className="text-2xl font-semibold text-yellow-600">
            ✅ Enrolled Successfully
          </h3>
          <p className="text-lg mt-2">
            You are enrolled in the{" "}
            <span className="font-bold">{enrollmentDetails.batchTime}</span>{" "}
            batch.
          </p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h4 className="font-semibold">📅 Month & Year:</h4>
            <p>Feb {enrollmentDetails.year}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h4 className="font-semibold">⏰ Batch Time:</h4>
            <p>{enrollmentDetails.batchTime}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h4 className="font-semibold">💰 Amount Paid:</h4>
            <p>₹500</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h4 className="font-semibold">💳 Payment Status:</h4>
            <p
              className={`font-bold ${
                enrollmentDetails.paymentStatus === "completed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {enrollmentDetails.paymentStatus.charAt(0).toUpperCase() +
                enrollmentDetails.paymentStatus.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnrollForm = ({ batches, selectedBatch, closeForm, isFormVisible }) => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: user?.age || "",
    phone: user?.phone || "",
    batch: selectedBatch || (batches.length > 0 ? batches[0] : ""),
  });
  const [beginPayment, setBeginPayment] = useState(false);
  const dispatch = useDispatch();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterNow = (e) => {
    e.preventDefault();
    setBeginPayment(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response1 = await fetch("/server/api/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchId: formData.batch._id,
        }),
      });

      const paymentDetail = await response1.json();
      if (response1.ok) {
        notifySuccess("payment successfull");
      }

      const date = new Date();

      const reqBody = {
        batchId: formData.batch._id,
        paymentId: paymentDetail.payment._id,
        paymentStatus: "completed",
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };


      const response2 = await fetch("/server/api/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const enrollmentDetails = await response2.json();
      dispatch(setEnrollmentDetails(enrollmentDetails.enrollment));
      notifySuccess("enrolled successfully");
    } catch (error) {
      console.log("error", error);
      notifyError(error.message);
    }
  };
  useEffect(() => {
    if (selectedBatch) {
      setFormData((prev) => ({ ...prev, batch: selectedBatch }));
    }
  }, [selectedBatch]);
  return (
    <div
      className={`fixed top-0 right-0 z-10 h-full w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-500 ${
        isFormVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Form Header */}
      <div className="flex justify-between items-center p-2 bg-yellow-500 text-white">
        <h3 className="text-xl font-semibold">Register for yoga class</h3>
        <button onClick={closeForm} className="text-2xl font-bold">
          &times;
        </button>
      </div>

      {/* Registration Form */}
      <div className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="tel"
              name="age"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your Age"
            />
          </div>

          {/* Batch Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Batch</label>
            <select
              id="Batch"
              name="batch"
              value={formData.batch._id} // Use batch ID
              onChange={(e) => {
                const selectedBatch = batches.find(
                  (batch) => batch._id === e.target.value
                );
                setFormData({ ...formData, batch: selectedBatch });
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            >
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchTime}
                </option>
              ))}
            </select>
          </div>

          {beginPayment && (
            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                type="tel"
                name="price"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                value={500}
              />
            </div>
          )}
          {beginPayment ? (
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
            >
              pay now
            </button>
          ) : (
            <button
              onClick={handleRegisterNow}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
            >
              Register Now
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const EnrollPage = () => {
  // Available Batches
  const date = new Date();
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { enrollmentDetails } = useSelector((state) => state.user);

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedBatch(null);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch("/server/api/batch/");
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.log("error", error);
        notifyError("no batch found");
      }
    };
    fetchBatches();
  }, []);

  if (enrollmentDetails) {
    return <EnrolledBatch enrollmentDetails={enrollmentDetails} />;
  }
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen flex justify-center items-center px-6 pt-14 md:px-12">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl text-center">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Select Your Batch for {months[date.getMonth()]}
        </h2>

        {/* Batch List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batches &&
            batches?.map((batch) => (
              <div
                key={batch._id}
                className={`bg-yellow-100 p-6 rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105 ${
                  selectedBatch?.id === batch.id
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 text-gray-700"
                }`}
                onClick={() => handleSelectBatch(batch)}
              >
                <p className="text-lg">{batch.batchTime}</p>
              </div>
            ))}
        </div>

        {/* No Batch Selected */}
        {!selectedBatch && (
          <p className="text-gray-600 mt-6">Please select a batch to enroll.</p>
        )}
      </div>

      <EnrollForm
        batches={batches}
        selectedBatch={selectedBatch}
        closeForm={closeForm}
        isFormVisible={isFormVisible}
      />
    </div>
  );
};

export default EnrollPage;
