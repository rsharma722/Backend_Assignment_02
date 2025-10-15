import { updateEmployeeSchema } from "../src/api/v1/validation/employee.schema";

describe("employeeUpdateSchema", () => {
it("accepts partial update", async () => {
    await expect(updateEmployeeSchema.validateAsync({ phone: "999-9999" }))
    .resolves.toBeTruthy();
});

it("rejects empty body", async () => {
    await expect(updateEmployeeSchema.validateAsync({}))
    .rejects.toBeTruthy();
});
});
