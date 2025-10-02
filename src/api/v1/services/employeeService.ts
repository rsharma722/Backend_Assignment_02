import { employees, Employee } from "../../../data/employees";

export type NewEmployee = Omit<Employee, "id">;

export const getAll = (): Employee[] => employees;

export const getById = (id: number): Employee | undefined =>
    employees.find(e => e.id === id);

export const create = (data: NewEmployee): Employee => {
    const nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const emp: Employee = { id: nextId, ...data };
    employees.push(emp);
    return emp;
};

export const update = (id: number, updates: Partial<NewEmployee>): Employee | null => {
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return null;
    employees[idx] = { ...employees[idx], ...updates };
    return employees[idx];
};

export const remove = (id: number): boolean => {
    const idx = employees.findIndex(e => e.id === id);
    if (idx === -1) return false;
    employees.splice(idx, 1);
    return true;
};

export const byBranch = (branchId: number): Employee[] =>
    employees.filter(e => e.branchId === branchId);

export const byDepartment = (dept: string): Employee[] =>
    employees.filter(e => e.department.toLowerCase() === dept.toLowerCase());