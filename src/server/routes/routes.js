import express from "express";
import emailFetch from "../endpoints/emailFetch.js";

const router = express.Router();

router.post("/api/subscribe", emailFetch );

export default router;
