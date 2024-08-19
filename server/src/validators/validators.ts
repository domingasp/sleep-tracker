import dayjs from "dayjs";
import { z } from "zod";

export const createSleepRecordValidator = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, {
        message: "Name must have at least 1 character",
      })
      .max(100, { message: "Name must not be longer than 100 characters" }),
    gender: z
      .string({
        invalid_type_error: "Gender must be a string",
      })
      .min(1, {
        message: "Gender must have at least 1 character",
      })
      .max(50, { message: "Gender must not be longer than 50 characters" })
      .optional(),
    hoursSlept: z
      .number({
        required_error: "hoursSlept is required",
        invalid_type_error: "Hours slept must be a number (decimals supported)",
      })
      .gt(0, { message: "Hours slept must be greater than 0" })
      .lte(24, { message: "Hours slept must be less than or equal to 24" }),
    date: z
      .string({
        required_error: "date is required",
      })
      .date("Date format must match YYYY-MM-DD")
      .refine(
        (date) => dayjs(date) < dayjs().add(-1, "day"),
        "Date must be in the past"
      ),
  }),
});
