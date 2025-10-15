import { createEmployeeSchema } from "../src/api/v1/validation/employee.schema";

describe("employeeCreateSchema", () => {
  it("accepts valid payload", async () => {
    const ok = {
      name: "Rav",
      email: "rsharma@rrc.ca",
      position: "Engineer",
      department: "Operations", 
      phone: "4313744350",
      branchId: "b1",
    };
    await expect(createEmployeeSchema.validateAsync(ok)).resolves.toBeTruthy();
  });

  it("rejects invalid email", async () => {
    const bad = {
      name: "Rav",
      email: "nope",
      position: "Engineer",
      department: "Operations",
      phone: "4313744350",
      branchId: "b1",
    };
    await expect(createEmployeeSchema.validateAsync(bad)).rejects.toBeTruthy();
  });
});
