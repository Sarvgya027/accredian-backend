import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import referralRoutes from "./src/routes/referral.routes.js";

const app = express();

dotenv.config();
app.use(cors());

app.use(express.json());

app.use("/api/referral", referralRoutes);

app.listen(3000, () => {
  console.log("server started on 3000");
});
