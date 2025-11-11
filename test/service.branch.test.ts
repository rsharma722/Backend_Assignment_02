import * as svc from "../src/api/v1/services/branchService";
import * as repo from "../src/api/v1/repositories/firestoreRepository";

describe("branch service (all funcs)", () => {
  beforeEach(() => jest.restoreAllMocks());

  it("getAll returns array", async () => {
    jest.spyOn(repo, "getDocuments").mockResolvedValue({
      docs: [{ id: "1", data: () => ({ name: "X", address: "123", phone: "111-1111" }) }],
    } as any);

    const list = await svc.getAll();
    expect(Array.isArray(list)).toBe(true);
    expect(list[0].id).toBe("1");
  });

  it("create returns created branch", async () => {
    jest.spyOn(repo, "createDocument").mockResolvedValue("b1");
    jest.spyOn(repo, "getDocumentById").mockResolvedValue({
      id: "b1",
      exists: true,
      data: () => ({ name: "X", address: "123", phone: "111-1111" }),
    } as any);

    const b = await svc.create({ name: "X", address: "123", phone: "111-1111" } as any);
    expect(b).toHaveProperty("id", "b1");
  });

  it("getById returns item or undefined", async () => {
    jest.spyOn(repo, "getDocumentById").mockResolvedValue({
      id: "1",
      exists: true,
      data: () => ({ name: "Y", address: "234", phone: "222-2222" }),
    } as any);

    const got = await svc.getById("1");
    expect(got?.id).toBe("1");
  });

  it("update returns updated item", async () => {
    jest.spyOn(repo, "getDocumentById")
      .mockResolvedValueOnce({ id: "1", exists: true, data: () => ({}) } as any);
    jest.spyOn(repo, "updateDocument").mockResolvedValue();
    jest.spyOn(repo, "getDocumentById")
      .mockResolvedValueOnce({
        id: "1",
        exists: true,
        data: () => ({ name: "Z", address: "345", phone: "999-0000" }),
      } as any);

    const upd = await svc.update("1", { phone: "999-0000" } as any);
    expect(upd?.phone).toBe("999-0000");
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
});
