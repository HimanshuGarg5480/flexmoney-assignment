import Batch from "../models/Batch.js";
import Enrollment from "../models/Enrollment.js";
// Create a new batch
const createBatch = async (req, res) => {
  try {
    const { batchTime } = req.body;
    let batch = await Batch.find({ batchTime});
    if (batch.length) {
      return res.status(400).json({ message: "batch already existed" });
    }
    batch = new Batch({ batchTime });
    await batch.save();
    res.status(201).send(batch);
  } catch (error) {
    console.log("error",error);
    res.status(400).send({ message: "Server error" });
  }
};

// Get all batches
const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find({});
    res.status(200).send(batches);
  } catch (error) {
    console.log("error",error);

    res.status(500).send({ message: "Server error" });
  }
};

// Delete a batch by ID
const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).send({message:"batch does not exist"});
    }
    await Enrollment.deleteMany({ batchId: req.params.id });
    res.send(batch);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ message: "Server error" });
  }
};

export {createBatch,getBatches,deleteBatch}