import { Router } from "express";
import * as c from "../controllers/employeeController";

const router = Router();

router.post("/", c.createEmployee);
router.get("/", c.getAllEmployees);
router.get("/:id", c.getEmployeeById);
router.put("/:id", c.updateEmployee);
router.delete("/:id", c.deleteEmployee);

router.get("/branch/:branchId", c.getEmployeesForBranch);
router.get("/department/:department", c.getEmployeesByDepartment);

export default router;
