import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json());

// Registration routes
app.use("/api/registrations", registrationRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();