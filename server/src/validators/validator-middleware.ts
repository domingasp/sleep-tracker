import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * validates a request body
 * @param validator the Zod validation object that will be used
 * @param type the type of validator
 */
export const validateRequest =
  (validator: AnyZodObject, type: "body" | "params" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (type == "body") {
        await validator.parseAsync(req.body);
      } else if (type == "params") {
        await validator.parseAsync(req.params);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send({ msg: err.issues[0].message });
      }

      return res.status(500).send("error making request");
    }
  };
