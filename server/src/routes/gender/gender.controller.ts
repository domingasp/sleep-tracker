import { NextFunction, Request, Response, Router } from "express";
import { getGenders } from "./gender.service";

const router = Router();

/**
 * Get all genders
 * @route {GET} /api/genders
 * @returns genders list of genders
 */
router.get(
  "/genders",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const genders = await getGenders();
      res.json(genders);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
