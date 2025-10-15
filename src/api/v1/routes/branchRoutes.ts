import { Router } from "express";
import * as c from "../controllers/branchController";
import { validate } from "../middleware/validate";
import { branchCreateSchema, branchUpdateSchema } from "../validation/branch.schema";

const router = Router();

router.post("/", validate(branchCreateSchema), c.createBranch);
router.get("/", c.getAllBranches);
router.get("/:id", c.getBranchById);
router.put("/:id", validate(branchUpdateSchema), c.updateBranch);
router.delete("/:id", c.deleteBranch);

export default router;
