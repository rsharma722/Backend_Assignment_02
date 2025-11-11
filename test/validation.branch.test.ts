import { branchCreateSchema } from "../src/api/v1/validation/branch.schema";

describe("branchCreateSchema", () => {
  it("accepts valid payload", async () => {
    const ok = { name: "Rav", address: "144 Main", phone: "+1 431-374-4350" };
    await expect(branchCreateSchema.validateAsync(ok)).resolves.toBeTruthy();
  });
  it("rejects bad phone", async () => {
    const bad = { name: "Rav", address: "144 Main", phone: "abc" };
    await expect(branchCreateSchema.validateAsync(bad)).rejects.toBeTruthy();
  });
});
