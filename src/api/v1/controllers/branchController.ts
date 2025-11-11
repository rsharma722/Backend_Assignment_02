import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as svc from "../services/branchService";

const isNumeric = (v?: string) => !!v && /^\d+$/.test(v);

export const createBranch = async (req: Request, res: Response) => {
try {
    const created = await svc.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json(created);
} catch {
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Failed to create branch" });
}
};

export const getAllBranches = async (_req: Request, res: Response) => {
try {
    const data = await svc.getAll();
    return res.status(HTTP_STATUS.OK).json(data);
} catch {
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Failed to fetch branches" });
}
};

export const getBranchById = async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    if (!isNumeric(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
    }
    const b = await svc.getById(id);
    if (!b) {
    return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }
    return res.status(HTTP_STATUS.OK).json({ ...b, id: Number(b.id) });
} catch {
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Failed to get branch" });
}
};

export const updateBranch = async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    if (!isNumeric(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
    }
    const updated = await svc.update(id, req.body || {});
    if (!updated) {
    return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }
    return res.status(HTTP_STATUS.OK).json({ ...updated, id: Number(updated.id) });
} catch {
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Failed to update branch" });
}
};

export const deleteBranch = async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    if (!isNumeric(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Invalid id" });
    }
    const ok = await svc.remove(id);
    if (!ok) {
    return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Branch not found" });
    }
    return res.status(HTTP_STATUS.OK).json({ message: "Branch deleted" });
} catch {
    return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: "Failed to delete branch" });
}
};
