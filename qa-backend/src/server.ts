require("dotenv").config();
import express from "express";
import cors from "cors";
import { myDataSource } from "./data-source";
import {
  authRoutes,
  departmentRoutes,
  evaluationRoutes,
  facultyRoutes,
  teacherRoutes,
  questionRoutes,
  AnswerRoutes,
  subjectRoutes,
} from "./routes";
import { logger } from "./lib";

const app = express();
app.use(cors());
app.use(express.json());

// routes => domain.com/api/dynamicRoutes
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/form", evaluationRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", AnswerRoutes);

const PORT = process.env.PORT || 1111;
myDataSource
  .initialize()
  .then(() => {
    // start application after connection with database!
    app.listen(PORT, () => {
      logger.info(`🚀 app is running on PORT => ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error while connecting with database", err);
  });
