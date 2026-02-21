import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} from "../controllers/customerController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCustomers);
router.post("/", addCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;

