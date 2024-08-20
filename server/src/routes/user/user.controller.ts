import { NextFunction, Request, Response, Router } from "express";
import { getSleepTotalsByDateRange, getUsers } from "./user.service";
import { GetUsersSchema } from "../../validators/schema";
import { validateRequest } from "../../validators/validator-middleware";
import dayjs from "dayjs";

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

router.get(
  "/users/:userId/recent-sleep-records",
  [validateRequest(GetUsersSchema, "params")],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params.userId);
      const endDate = dayjs().add(-1, "days");
      const startDate = endDate.add(-7, "days");

      const recentSleepRecords = await getSleepTotalsByDateRange(
        userId,
        startDate.toDate(),
        endDate.toDate()
      );

      res.json(recentSleepRecords);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
