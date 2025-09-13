import express from "express";
import dotenv from "dotenv";
import AuthController from "./controller/auth.controller.js";
import UserRepository from "./repository/user.repository.js";
import AuthService from "./service/auth.service.js";
import createAuthRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService);

const authRouter = createAuthRoute(authController);

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
