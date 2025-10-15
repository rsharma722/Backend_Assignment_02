import Joi from "joi";

export const branchCreateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  address: Joi.string().trim().min(5).max(240).required(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\-() ]{7,20}$/)
    .required(),
});

export const branchUpdateSchema = branchCreateSchema.fork(
  ["name", "address", "phone"],
  (schema) => schema.optional()
);
