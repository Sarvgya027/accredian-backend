import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const createReferral = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { referrer, referrerEmail, referee, refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: { referrer, referrerEmail, referee, refereeEmail },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: "You have been referred!",
      text: `Hi ${referee},\n\n${referrer} has referred you for a course.\n\nBest Regards,\nAccredian`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Referral registered and email sent!' });
  } catch (error) {
    console.log(error.message);
  }
};
