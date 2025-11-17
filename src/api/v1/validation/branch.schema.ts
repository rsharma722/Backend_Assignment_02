import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     BranchCreate:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           example: "Winnipeg Campuss"
 *         address:
 *           type: string
 *           example: "190 Princess St, Winnipeg, MB"
 *         phone:
 *           type: string
 *           example: "+1-431-355-0100"
 *     BranchUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 */
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