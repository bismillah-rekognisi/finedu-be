import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthController from "./src/controller/auth.controller.js";
import UserRepository from "./src/repository/user.repository.js";
import AuthService from "./src/service/auth.service.js";
import createAuthRoute from "./src/routes/auth.route.js";
import createRoleRoute from "./src/routes/role.route.js";
import createBusinessCategoryRoute from "./src/routes/business-category.route.js";
import createBusinessRoute from "./src/routes/business.route.js";
import createGoalRoute from "./src/routes/goal.route.js";
import createTransactionCategoryRoute from "./src/routes/transaction-category.route.js";
import createTransactionRoute from "./src/routes/transaction.route.js";
import errorHandler from "./src/middleware/errorHandler.js";
import RoleRepository from "./src/repository/role.repository.js";
import BusinessCategoryRepository from "./src/repository/business-category.repository.js";
import BusinessRepository from "./src/repository/business.repository.js";
import GoalRepository from "./src/repository/goal.repository.js";
import TransactionCategoryRepository from "./src/repository/transaction-category.repository.js";
import TransactionRepository from "./src/repository/transaction.repository.js";
import RoleService from "./src/service/role.service.js";
import BusinessCategoryService from "./src/service/business-category.service.js";
import BusinessService from "./src/service/business.service.js";
import GoalService from "./src/service/goal.service.js";
import TransactionCategoryService from "./src/service/transaction-category.service.js";
import TransactionService from "./src/service/transaction.service.js";
import TransactionCategoryController from "./src/controller/transaction-category.controller.js";
import TransactionController from "./src/controller/transaction.controller.js";
import RoleController from "./src/controller/role.controller.js";
import BusinessCategoryController from "./src/controller/business-category.controller.js";
import BusinessController from "./src/controller/business.controller.js";
import GoalController from "./src/controller/goal.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Repo Init
const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const businessCategoryRepo = new BusinessCategoryRepository();
const businessRepo = new BusinessRepository();
const goalRepo = new GoalRepository();
const transactionCategoryRepo = new TransactionCategoryRepository();
const transactionRepo = new TransactionRepository();

// Service Init
const authService = new AuthService(userRepo);
const roleService = new RoleService(roleRepo);
const businessCategoryService = new BusinessCategoryService(businessCategoryRepo);
const businessService = new BusinessService(businessRepo);
const goalService = new GoalService(goalRepo);
const transactionCategoryService = new TransactionCategoryService(transactionCategoryRepo);
const transactionService = new TransactionService(transactionRepo, businessService);

// Controller Init
const authController = new AuthController(authService);
const roleController = new RoleController(roleService);
const businessCategoryController = new BusinessCategoryController(businessCategoryService);
const businessController = new BusinessController(businessService);
const goalController = new GoalController(goalService);
const transactionCategoryController = new TransactionCategoryController(transactionCategoryService);
const transactionController = new TransactionController(transactionService);

// Router Init
const authRouter = createAuthRoute(authController);
const roleRouter = createRoleRoute(roleController);
const businessCategoryRouter = createBusinessCategoryRoute(businessCategoryController);
const businessRouter = createBusinessRoute(businessController);
const goalRouter = createGoalRoute(goalController);
const transactionCategoryRouter = createTransactionCategoryRoute(transactionCategoryController);
const transactionRouter = createTransactionRoute(transactionController);

app.use("/auth", authRouter);
app.use("/roles", roleRouter);
app.use("/business-categories", businessCategoryRouter);
app.use("/businesses", businessRouter);
app.use("/goals", goalRouter);
app.use("/transaction-categories", transactionCategoryRouter);
app.use("/transactions", transactionRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
