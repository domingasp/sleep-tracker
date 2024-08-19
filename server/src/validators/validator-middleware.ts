import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * validates a request body
 * @param validator the Zod validation object that will be used
 */
export const validateRequest =
  (validator: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validator.parseAsync({ body: req.body });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ msg: err.issues[0].message });
      }

      return res.status(500).send("error making request");
    }
  };
