import { Router } from "express";
import genderController from "./gender/gender.controller";
import sleepRecordController from "./sleep-record/sleep-record.controller";
import userController from "./user/user.controller";

const api = Router()
  .use(genderController)
  .use(sleepRecordController)
  .use(userController);

export default Router().use("/api", api);
