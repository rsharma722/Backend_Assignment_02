import { Router } from "express";
import * as c from "../controllers/employeeController";
import { validate } from "../middleware/validate";
    import {
    createEmployeeSchema,
    updateEmployeeSchema,
} from "../validation/employee.schema";

const router = Router();

router.post("/", validate(createEmployeeSchema), c.createEmployee);
router.get("/", c.getAllEmployees);
router.get("/:id", c.getEmployeeById);
router.put("/:id", validate(updateEmployeeSchema), c.updateEmployee);
router.delete("/:id", c.deleteEmployee);

router.get("/branch/:branchId", c.getEmployeesForBranch);
router.get("/department/:department", c.getEmployeesByDepartment);

export default router;
