
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import connectDB from "./config/database.js";
import RegisteredRollNumber from "./models/RegisteredRollNumber.js";

import {
  createRegistration,
  getRegistration,
} from "./controllers/registrationController.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// CORS configuration
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON requests
app.use(express.json({ limit: "10kb" }));

// Rate limiter for registration submissions
const registrationLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many registration attempts. Please try again shortly.",
  },
});

// Rate limiter for registration lookups
const lookupLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again shortly.",
  },
});

// API routes
app.post(
  "/api/registrations",
  registrationLimiter,
  createRegistration
);

app.get(
  "/api/registrations/:registrationId",
  lookupLimiter,
  getRegistration
);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    message:
      err.status === 413
        ? "Request payload is too large."
        : "Internal server error.",
  });
});

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    await RegisteredRollNumber.init();
    console.log("Roll number unique index ready");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
