import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as svc from "../services/branchService";

export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body || {};
  if (!name || !address || !phone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields" });
  }
  const b = svc.create({ name, address, phone });
  res.status(HTTP_STATUS.CREATED).json(b);
};

export const getAllBranches = (_req: Request, res: Response) =>
  res.status(HTTP_STATUS.OK).json(svc.getAll());

export const getBranchById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const b = svc.getById(id);
  if (!b) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  res.status(HTTP_STATUS.OK).json(b);
};

export const updateBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const updated = svc.update(id, req.body || {});
  if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  res.status(HTTP_STATUS.OK).json(updated);
};

export const deleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const ok = svc.remove(id);
  if (!ok) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Branch not found" });
  res.status(HTTP_STATUS.OK).json({ message: "Branch deleted" });
};
