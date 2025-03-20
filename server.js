import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import user from "./routes/user.routes.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON डेटा को एक्सेप्ट करने के लिए

// Routes
app.use("/api/users", user);
// app.use("/api/product", productRoutes);
// MongoDB कनेक्शन
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  .then(() => console.log("✅ MongoDB कनेक्ट हो गया"))
  .catch(err => console.log("❌ MongoDB कनेक्ट नहीं हुआ:", err));

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 सर्वर चल रहा है: http://localhost:${PORT}`));