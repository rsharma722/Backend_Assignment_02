import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     EmployeeCreate:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           example: "Ravdeep Sharma"
 *         position:
 *           type: string
 *           example: "Backend Developer"
 *         department:
 *           type: string
 *           example: "Engineering"
 *         email:
 *           type: string
 *           format: email
 *           example: "rsharma1@rrc.ca"
 *         phone:
 *           type: string
 *           example: "+1-431-555-9876"
 *         branchId:
 *           type: string
 *           example: "branch_001"
 *     EmployeeUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         department:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         branchId:
 *           type: string
 */

export const createEmployeeSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80).required(),
    position: Joi.string().trim().min(2).max(80).required(),
    department: Joi.string().trim().min(2).max(80).required(),
    email: Joi.string().trim().lowercase().email().required(),
    phone: Joi.string().trim().min(3).max(20).optional(),
    branchId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

export const updateEmployeeSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80),
    position: Joi.string().trim().min(2).max(80),
    department: Joi.string().trim().min(2).max(80),
    email: Joi.string().trim().lowercase().email(),
    phone: Joi.string().trim().min(3).max(20),
    branchId: Joi.alternatives().try(Joi.string(), Joi.number()),
}).min(1);
