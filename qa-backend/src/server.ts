import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { myDataSource } from "./data-source";

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 1111;
myDataSource
  .initialize()
  .then(() => {
    // start application after connection with database!
    app.listen(PORT, () => {
      console.log(`app is running on PORT => ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting with database", err);
  });
