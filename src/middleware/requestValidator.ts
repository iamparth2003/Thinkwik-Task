import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.query, ...req.params };

    const validate = schema.validate(data);
    if (validate.error) {
     return res
        .status(400)
        .send({ message: validate?.error?.message || "Validation error" });
      ;
    }
    req.validatedData = validate.value;
    return next();
  };
};
