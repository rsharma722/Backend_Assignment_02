import * as svc from "../src/api/v1/services/employeeService";
import * as repo from "../src/api/v1/repositories/firestoreRepository";

describe("employee service", () => {
  beforeEach(() => jest.spyOn(repo, "getDocuments").mockResolvedValue({
    docs: [{ id: "e1", data: () => ({ name:"Rav", email:"rsharma1@rrc.ca", position:"Eng", branchId:"b1" }) }]
  } as any));

  it("getAll returns mapped docs", async () => {
    const items = await svc.getAll();
    expect(items[0].id).toBe("e1");
  });
});
