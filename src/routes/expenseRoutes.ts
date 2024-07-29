import { Router } from "express";

import { authenticateToken } from "../middleware/authMiddleware";
import expenseController from "../controllers/expenseController";

const router = Router();

router.get("/profile", authenticateToken, expenseController.getUserProfile);

router.post("/expense", authenticateToken, expenseController.addExpense);
router.get("/expense", authenticateToken, expenseController.getExpense);
router.get("/getAllExpense", authenticateToken, expenseController.getAllExpense);

router.get("/downloadAllExpenseCSV", authenticateToken, expenseController.getAllUserExpenseCSV);
router.get("/downloadMyExpenseCSV", authenticateToken, expenseController.getIndividualUserExpenseCSV);

router.get("/downloadAllExpenseExcel", authenticateToken, expenseController.getAllUserExpenseExcel);
router.get("/downloadMyExpenseExcel", authenticateToken, expenseController.getIndividualUserExpenseCSV);

export default router;
