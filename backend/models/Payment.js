import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  batchId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  amount: { type: Number, default: 500 },
  status: { type: String, enum: ["success", "failed"], required: true },
});

export default mongoose.model("Payment", paymentSchema);
