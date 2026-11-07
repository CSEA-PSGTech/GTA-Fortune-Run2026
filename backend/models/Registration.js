import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rollNo: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
    },
    members: {
      type: [memberSchema],
      required: true,
      validate: {
        validator: (members) =>
          members.length >= 2 && members.length <= 3,
        message: "A crew must have 2 or 3 members.",
      },
    },
    status: {
      type: String,
      enum: ["Confirmed"],
      default: "Confirmed",
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model(
  "Registration",
  registrationSchema
);

export default Registration;