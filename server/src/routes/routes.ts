import { Router } from "express";
import genderController from "./gender/gender.controller";
import sleepRecordController from "./sleep-record/sleep-record.controller";

const api = Router().use(genderController).use(sleepRecordController);

export default Router().use("/api", api);
