import { Router } from "express";
import * as c from "../controllers/employeeController";
import { validate } from "../middleware/validate";
import {
    createEmployeeSchema,
    updateEmployeeSchema,
} from "../validation/employee.schema";

const router = Router();

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeCreate'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Validation error
 */

router.post("/", validate(createEmployeeSchema), c.createEmployee);
/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/", c.getAllEmployees);
/**
 * @openapi
 * /employees/branch/{branchId}:
 *   get:
 *     summary: Get employees for a specific branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employees for the branch
 */
router.get("/branch/:branchId", c.getEmployeesForBranch);

/**
 * @openapi
 * /employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employees for the department
 */
router.get("/department/:department", c.getEmployeesByDepartment);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by id
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
router.get("/:id", c.getEmployeeById);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by id
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Employee not found
 */
router.put("/:id", validate(updateEmployeeSchema), c.updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by id
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", c.deleteEmployee);

export default router;