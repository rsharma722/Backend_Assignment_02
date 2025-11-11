import { Router } from "express";
import * as c from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchCreateSchema, branchUpdateSchema } from "../validation/branch.schema";

const router = Router();
/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchCreate'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", validate(branchCreateSchema), c.createBranch);

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: List of all branches
 */
router.get("/", c.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch found
 *       404:
 *         description: Branch not found
 */
router.get("/:id", c.getBranchById);
/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branches]
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
 *             $ref: '#/components/schemas/BranchUpdate'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Branch not found
 */
router.put("/:id", validate(branchUpdateSchema), c.updateBranch);
/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Branch deleted
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", c.deleteBranch);

export default router;