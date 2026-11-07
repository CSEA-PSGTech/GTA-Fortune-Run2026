import express from "express";

import {
  createRegistration,
  getRegistration,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", createRegistration);
router.get("/:registrationId", getRegistration);

export default router;