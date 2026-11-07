
import mongoose from "mongoose";

const registeredRollNumberSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    match: /^2\d[ZN]\d{3}$/,
  },

  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
});

const RegisteredRollNumber = mongoose.model(
  "RegisteredRollNumber",
  registeredRollNumberSchema
);

export default RegisteredRollNumber;
