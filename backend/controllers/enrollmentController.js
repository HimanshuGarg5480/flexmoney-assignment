import Enrollment from "../models/Enrollment.js";
import Batch from "../models/Batch.js";

export const enrollUser = async (req, res) => {
  try {
    const { batchId, month, year, paymentId } = req.body;
    const userId = req.user.id;

    // Check if batch exists
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Check if user is already enrolled for the month
    const existingEnrollment = await Enrollment.findOne({
      userId,
      month,
      year,
      paymentId
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "User already enrolled for this month" });
    }

    // Create Enrollment record
    const newEnrollment = new Enrollment({
      userId,
      batchId,
      month,
      year,
      paymentId,
      paymentStatus: "completed",
    });

    await newEnrollment.save();

    res.status(201).json({
      message: "Enrollment successful",
      enrollment: newEnrollment
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId })
      .populate("batchId")
      .populate("paymentId");

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserCurrentEnrollment = async (req,res)=>{
  try {
    const userId= req.user.id;
    const {month} = req.params;    
    const enrollmentDetails = await Enrollment.findOne({userId,month}).populate("batchId")
    .populate("paymentId");
    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log("error",error);
    res.status(500).json({message:"server error"});
  }
}

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("userId", "_id name email age phone role")
      .populate("batchId")
      .populate("paymentId");

    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Fetch all enrollments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
