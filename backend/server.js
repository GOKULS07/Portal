const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};
connectDB();

// Define Grievance Schema
const grievanceSchema = new mongoose.Schema(
  {
    facultyId: { type: String, required: true },
    issueType: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Solved", "Rejected"], default: "Pending" },
    rejectReason: { type: String, default: "" },
    name: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

const Grievance = mongoose.model("Grievance", grievanceSchema);

// ✅ API: Get all grievances (sorted by latest)
app.get("/api/grievances", async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    console.error("Error fetching grievances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API: Get grievance counts
app.get("/api/grievances/count", async (req, res) => {
  try {
    const pending = await Grievance.countDocuments({ status: "Pending" });
    const solved = await Grievance.countDocuments({ status: "Solved" });
    const rejected = await Grievance.countDocuments({ status: "Rejected" });

    res.json({ pending, solved, rejected });
  } catch (error) {
    console.error("Error fetching grievance counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API: Submit a new grievance
app.post("/api/grievances", async (req, res) => {
  try {
    const { facultyId, issueType, category, title, description, name, email } = req.body;

    if (!facultyId || !issueType || !category || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (issueType === "Non-Anonymous" && (!name || !email)) {
      return res.status(400).json({ error: "Name and email are required for non-anonymous grievances" });
    }

    const newGrievance = new Grievance({
      facultyId,
      issueType,
      category,
      title,
      description,
      name: issueType === "Non-Anonymous" ? name : undefined,
      email: issueType === "Non-Anonymous" ? email : undefined,
    });

    await newGrievance.save();
    res.status(201).json({ message: "Grievance submitted successfully", grievance: newGrievance });
  } catch (error) {
    console.error("Error submitting grievance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API: Update grievance status
app.put("/api/grievances/:id", async (req, res) => {
  try {
    const { status, reason } = req.body;
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ error: "Grievance not found" });
    }

    grievance.status = status;
    if (status === "Rejected") {
      grievance.rejectReason = reason || "No reason provided"; // Ensure a reason is given for rejection
    }

    await grievance.save();
    res.json({ message: "Grievance updated successfully", grievance });
  } catch (error) {
    console.error("Error updating grievance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ API: Delete a grievance
app.delete("/api/grievances/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndDelete(req.params.id);
    if (!grievance) {
      return res.status(404).json({ error: "Grievance not found" });
    }
    res.json({ message: "Grievance deleted successfully" });
  } catch (error) {
    console.error("Error deleting grievance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
