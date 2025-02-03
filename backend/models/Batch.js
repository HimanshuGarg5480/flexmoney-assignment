import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchTime: {
    type: String,
    required: true,
    enum: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"],
  },
});

export default mongoose.model("Batch", batchSchema);
