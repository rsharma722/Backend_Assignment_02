import { Router } from "express";
import * as c from "../controllers/branchController";

const router = Router();

router.post("/", c.createBranch);
router.get("/", c.getAllBranches);
router.get("/:id", c.getBranchById);
router.put("/:id", c.updateBranch);
router.delete("/:id", c.deleteBranch);

export default router;
