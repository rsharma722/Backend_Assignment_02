import Joi from "joi";

const updateBranchSchema = Joi.object({
name: Joi.string().min(2).max(100),
address: Joi.string().min(5).max(200),
phone: Joi.string().min(7).max(20),
}).min(1);

describe("updateBranchSchema (local)", () => {
it("accepts partial update", async () => {
    await expect(updateBranchSchema.validateAsync({ phone: "123-4567" }))
    .resolves.toBeTruthy();
});

it("rejects empty body", async () => {
    await expect(updateBranchSchema.validateAsync({}))
    .rejects.toBeTruthy();
});
});
