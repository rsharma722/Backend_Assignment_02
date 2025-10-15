import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type Schemas = Partial<{
  body: Joi.ObjectSchema<any>;
  params: Joi.ObjectSchema<any>;
  query: Joi.ObjectSchema<any>;
}>;

export const validateRequest = (schemas: Schemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parts: Array<keyof Schemas> = ["params", "query", "body"];
    for (const part of parts) {
      const schema = schemas[part];
      if (!schema) continue;

      const { error, value } = schema.validate((req as any)[part], {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          error: error.details.map(d => d.message).join("; "),
        });
      }
      (req as any)[part] = value;
    }
    next();
  };
