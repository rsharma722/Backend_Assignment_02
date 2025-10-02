import { branches, Branch } from "../../../data/branches";

export type NewBranch = Omit<Branch, "id">;

export const getAll = (): Branch[] => branches;

export const getById = (id: number): Branch | undefined =>
  branches.find(b => b.id === id);

export const create = (data: NewBranch): Branch => {
  const nextId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;
  const b: Branch = { id: nextId, ...data };
  branches.push(b);
  return b;
};

export const update = (id: number, updates: Partial<NewBranch>): Branch | null => {
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return null;
  branches[idx] = { ...branches[idx], ...updates };
  return branches[idx];
};

export const remove = (id: number): boolean => {
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return false;
  branches.splice(idx, 1);
  return true;
};
