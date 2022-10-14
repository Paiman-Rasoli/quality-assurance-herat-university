require("dotenv").config();
import express from "express";
import cors from "cors";
import { myDataSource } from "./data-source";
import { authRoutes } from "./routes";
import { logger } from "./lib";

const app = express();
app.use(cors());
app.use(express.json());

// auth route
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 1111;
myDataSource
  .initialize()
  .then(() => {
    // start application after connection with database!
    app.listen(PORT, () => {
      logger.info(`app is running on PORT => ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error while connecting with database", err);
  });
