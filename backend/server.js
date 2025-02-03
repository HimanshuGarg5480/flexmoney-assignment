import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes); 
app.use("/api/batch", batchRoutes); 
app.use("/api/payment", paymentRoutes); 
app.use("/api/enroll", enrollmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
