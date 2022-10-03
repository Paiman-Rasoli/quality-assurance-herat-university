import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`app is running on PORT => ${PORT}`);
});
