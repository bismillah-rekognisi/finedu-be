import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthController from "./src/controller/auth.controller.js";
import UserRepository from "./src/repository/user.repository.js";
import AuthService from "./src/service/auth.service.js";
import createAuthRoute from "./src/routes/auth.route.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

const authRouter = createAuthRoute(authController);

app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
