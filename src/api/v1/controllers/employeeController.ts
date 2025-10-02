import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as svc from "../services/employeeService";

export const createEmployee = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body || {};
  if (!name || !position || !department || !email || !phone || branchId == null) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields" });
  }
  const emp = svc.create({ name, position, department, email, phone, branchId });
  res.status(HTTP_STATUS.CREATED).json(emp);
};

export const getAllEmployees = (_req: Request, res: Response) =>
  res.status(HTTP_STATUS.OK).json(svc.getAll());

export const getEmployeeById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const emp = svc.getById(id);
  if (!emp) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  res.status(HTTP_STATUS.OK).json(emp);
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const updated = svc.update(id, req.body || {});
  if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  res.status(HTTP_STATUS.OK).json(updated);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
  const ok = svc.remove(id);
  if (!ok) return res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Employee not found" });
  res.status(HTTP_STATUS.OK).json({ message: "Employee deleted" });
};

export const getEmployeesForBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  if (Number.isNaN(branchId)) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid branch id" });
  res.status(HTTP_STATUS.OK).json(svc.byBranch(branchId));
};

export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const dept = req.params.department;
  if (!dept) return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing department" });
  res.status(HTTP_STATUS.OK).json(svc.byDepartment(dept));
};
