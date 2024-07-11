import express from "express";
import { body } from "express-validator";
import { createReferral } from "../controllers/referralController.js";

const router = express.Router();

router.post(
  "/",
  body("referrer").notEmpty(),
  body("referrerEmail").isEmail().notEmpty(),
  body("referee").notEmpty(),
  body("refereeEmail").isEmail().notEmpty(),
  createReferral
);

export default router;
  