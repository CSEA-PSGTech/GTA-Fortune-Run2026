
import mongoose from "mongoose";
import crypto from "node:crypto";

import Registration from "../models/Registration.js";
import RegisteredRollNumber from "../models/RegisteredRollNumber.js";

const generateRegistrationId = () => {
  const randomCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `GTA-2026-${randomCode}`;
};

export const createRegistration = async (req, res) => {
  const { members } = req.body;

  // 1. Validate crew size
  if (!Array.isArray(members) || members.length < 2 || members.length > 3) {
    return res.status(400).json({
      message: "A crew must have 2 or 3 members.",
    });
  }

  // 2. Validate individual members
  const rollNumberPattern = /^2\d[zn]\d{3}$/i;

  for (const member of members) {
    if (
      !member.name?.trim() ||
      !member.rollNo?.trim() ||
      !member.phone?.trim()
    ) {
      return res.status(400).json({
        message: "All member fields are required.",
      });
    }

    if (!rollNumberPattern.test(member.rollNo.trim())) {
      return res.status(400).json({
        message: "Invalid roll number format. Expected format: 25z331.",
      });
    }

    if (!/^[0-9]{10}$/.test(member.phone.trim())) {
      return res.status(400).json({
        message: "Phone numbers must contain exactly 10 digits.",
      });
    }
  }

  // 3. Normalize roll numbers
  const normalizedMembers = members.map((member) => ({
    name: member.name.trim(),
    rollNo: member.rollNo.trim().toUpperCase(),
    phone: member.phone.trim(),
  }));

  const rollNumbers = normalizedMembers.map((member) => member.rollNo);

  // 4. Check duplicates within the same crew
  if (new Set(rollNumbers).size !== rollNumbers.length) {
    return res.status(400).json({
      message: "A crew cannot contain duplicate roll numbers.",
    });
  }

  const session = await mongoose.startSession();

  try {
    let savedRegistration;

    // 5. Atomically reserve roll numbers and save registration
    await session.withTransaction(async () => {
      const registration = new Registration({
        registrationId: generateRegistrationId(),
        members: normalizedMembers,
      });

      await registration.save({ session });

      await RegisteredRollNumber.insertMany(
        rollNumbers.map((rollNo) => ({
          rollNo,
          registration: registration._id,
        })),
        { session }
      );

      savedRegistration = registration;
    });

    // 6. Send successful response
    return res.status(201).json({
      message: "Registration successful.",
      registrationId: savedRegistration.registrationId,
      members: savedRegistration.members,
    });

  } catch (error) {
    console.error("Registration error:", error);

    // 7. Handle database-level duplicate errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "One or more members have already registered.",
      });
    }

    return res.status(500).json({
      message: "Something went wrong while registering.",
    });

  } finally {
    await session.endSession();
  }
};

export const getRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findOne({
      registrationId: registrationId.toUpperCase(),
    }).select("-__v");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    return res.status(200).json({
      registrationId: registration.registrationId,
      members: registration.members,
      status: registration.status,
      createdAt: registration.createdAt,
    });

  } catch (error) {
    console.error("Fetch registration error:", error);

    return res.status(500).json({
      message: "Unable to retrieve registration.",
    });
  }
};
