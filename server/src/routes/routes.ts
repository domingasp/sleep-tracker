import { Router } from "express";
import genderController from "./gender/gender.controller";

const api = Router().use(genderController);

export default Router().use("/api", api);
