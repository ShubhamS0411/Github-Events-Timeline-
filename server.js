import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cronjob from "node-cron";
import router from "./src/server/routes/routes.js";
import sendUpdates from "./src/server/endpoints/sendUpdates.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


cronjob.schedule("* * * * *", () => {
  sendUpdates();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
