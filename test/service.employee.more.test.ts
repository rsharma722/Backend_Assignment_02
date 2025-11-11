import * as svc from "../src/api/v1/services/employeeService";
import * as repo from "../src/api/v1/repositories/firestoreRepository";

describe("employee service (remaining funcs)", () => {
  beforeEach(() => jest.restoreAllMocks());

  it("create returns employee", async () => {
    jest.spyOn(repo, "createDocument").mockResolvedValue("newEmp");
    jest.spyOn(repo, "getDocumentById").mockResolvedValue({
      id: "newEmp",
      exists: true,
      data: () => ({
        name: "A",
        position: "Teller",
        department: "Ops",
        email: "a@x.com",
        phone: "111",
        branchId: "1",
        createdAt: "x",
        updatedAt: "x",
      }),
    } as any);

    const e = await svc.create({
      name: "A",
      position: "Teller",
      department: "Ops",
      email: "a@x.com",
      phone: "111",
      branchId: "1",
    } as any);
    expect(e).toHaveProperty("id", "newEmp");
  });

  it("getById returns item", async () => {
    jest.spyOn(repo, "getDocumentById").mockResolvedValue({
      id: "1",
      exists: true,
      data: () => ({
        name: "B",
        position: "Teller",
        department: "Ops",
        email: "b@x.com",
        phone: "111",
        branchId: "1",
        createdAt: "x",
        updatedAt: "x",
      }),
    } as any);

    const got = await svc.getById("1");
    expect(got?.id).toBe("1");
  });

  it("update returns updated", async () => {
    jest.spyOn(repo, "getDocumentById")
      .mockResolvedValueOnce({ id: "1", exists: true, data: () => ({}) } as any); 
    jest.spyOn(repo, "updateDocument").mockResolvedValue();
    jest.spyOn(repo, "getDocumentById")
      .mockResolvedValueOnce({
        id: "1",
        exists: true,
        data: () => ({
          name: "C",
          position: "Teller",
          department: "Ops",
          email: "c@x.com",
          phone: "999-9999",
          branchId: "1",
          createdAt: "x",
          updatedAt: "x",
        }),
      } as any);

    const upd = await svc.update("1", { phone: "999-9999" } as any);
    expect(upd?.phone).toBe("999-9999");
  });

  it("remove returns true", async () => {
    jest.spyOn(repo, "getDocumentById").mockResolvedValue({
      id: "1",
      exists: true,
      data: () => ({}),
    } as any);
    jest.spyOn(repo, "deleteDocument").mockResolvedValue();

    const ok = await svc.remove("1");
    expect(ok).toBe(true);
  });

  it("byBranch filters", async () => {
    jest.spyOn(repo, "getDocuments").mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ branchId: "1" }) },
        { id: "2", data: () => ({ branchId: "2" }) },
      ],
    } as any);

    const list = await svc.byBranch("1");
    expect(list.map((x) => x.id)).toEqual(["1"]);
  });

  it("byDepartment filters", async () => {
    jest.spyOn(repo, "getDocuments").mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ department: "Ops" }) },
        { id: "2", data: () => ({ department: "Loans" }) },
      ],
    } as any);

    const list = await svc.byDepartment("Ops");
    expect(list.map((x) => x.id)).toEqual(["1"]);
  });
});
