import Payment from "../models/Payment.js";

const createPayment = async (req, res) => {
  try {
    let {batchId, amount } = req.body;
    const userId = req.user.id;
    if (!amount) {
      amount = 500;
    }

    // Store payment details in DB
    const newPayment = new Payment({
      userId,
      batchId,
      amount,
      status: "success",
    });

    await newPayment.save();

    res.status(200).json({
      message: "Payment successful",
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("userId","name email age role phone").populate("batchId");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getPayments = async (req, res) => {
    try {
      const userId = req.user.id;
      const payments = await Payment.find({userId}).populate("batchId");
      res.status(200).json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export { createPayment, getAllPayments, getPayments};
