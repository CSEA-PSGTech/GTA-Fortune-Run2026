import Registration from "../models/Registration.js";
import crypto from "node:crypto";

const generateRegistrationId = () => {
  const randomCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `GTA-2026-${randomCode}`;
};

export const createRegistration = async (req, res) => {
  try {
    const { members } = req.body;

    // 1. Validate crew size
    if (!Array.isArray(members) || members.length < 2 || members.length > 3) {
      return res.status(400).json({
        message: "A crew must have 2 or 3 members.",
      });
    }

    // 2. Validate required fields
    for (const member of members) {
      if (!member.name?.trim() || !member.rollNo?.trim() || !member.phone?.trim()) {
        return res.status(400).json({
          message: "All member fields are required.",
        });
      }

      if (!/^[0-9]{10}$/.test(member.phone)) {
        return res.status(400).json({
          message: "Phone numbers must contain exactly 10 digits.",
        });
      }
    }

    // 3. Check duplicate roll numbers within the crew
    const rollNumbers = members.map((member) =>
      member.rollNo.trim().toUpperCase()
    );

    if (new Set(rollNumbers).size !== rollNumbers.length) {
      return res.status(400).json({
        message: "A crew cannot contain duplicate roll numbers.",
      });
    }

    // 4. Check whether any member has already registered
    const existingRegistration = await Registration.findOne({
      "members.rollNo": { $in: rollNumbers },
    });

    if (existingRegistration) {
      return res.status(409).json({
        message: "One or more members have already registered.",
      });
    }

    // 5. Generate a unique registration ID
    let registrationId;

    do {
      registrationId = generateRegistrationId();
    } while (await Registration.exists({ registrationId }));

    // 6. Save registration
    const registration = await Registration.create({
      registrationId,
      members: members.map((member) => ({
        name: member.name.trim(),
        rollNo: member.rollNo.trim().toUpperCase(),
        phone: member.phone.trim(),
      })),
    });

    // 7. Send response
    return res.status(201).json({
      message: "Registration successful.",
      registrationId: registration.registrationId,
      members: registration.members,
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Something went wrong while registering.",
    });
  }
};