import { NextFunction, Request, Response, Router } from "express";
import { validateRequest } from "../../validators/validator-middleware";
import { createSleepRecordValidator } from "../../validators/validators";
import { createSleepRecord } from "./sleep-record.service";

const router = Router();

router.post(
  "/sleep-records",
  [validateRequest(createSleepRecordValidator)],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sleepRecord = await createSleepRecord(req.body);
      res.status(201).json(sleepRecord);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
