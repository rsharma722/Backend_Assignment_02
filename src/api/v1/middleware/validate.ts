import Joi from "joi";
import { RequestHandler } from "express";

export const validate =
(schema: Joi.ObjectSchema, part: "body"|"query"|"params" = "body"): RequestHandler =>
async (req, res, next) => {
    try {
    const value = await schema.validateAsync(req[part], { abortEarly: false, stripUnknown: true });
    req[part] = value;
    next();
    } catch (err: any) {
    res.status(400).json({
        success: false,
        error: "Validation failed",
        details: err?.details?.map((d: any) => d.message)
    });
    }
};
