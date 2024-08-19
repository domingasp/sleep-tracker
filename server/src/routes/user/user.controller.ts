import { NextFunction, Request, Response, Router } from "express";
import { getUsers } from "./user.service";

const router = Router();

router.get(
  "/users",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
