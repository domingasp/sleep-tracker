import dayjs from "dayjs";
import z from "zod";
import { SleepRecord } from "../../../types/api";
import { api } from "../../../lib/api-client";
import { MutationConfig } from "../../../lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersQueryOptions } from "../../users/api/get-users";
import { getRecentSleepRecordsQueryOptions } from "../../users/api/get-recent-sleep-records";

export const createSleepRecordInputSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, {
      message: "Name must have at least 1 character",
    })
    .max(100, { message: "Name must not be longer than 100 characters" })
    .regex(
      // TODO more robust full name regex
      /^[a-z ,.'-]+$/i,
      { message: "Letters and the following characters , . ' - only" }
    ),
  gender: z.union([
    z
      .string({
        invalid_type_error: "Gender must be a string",
      })
      .min(1, {
        message: "Gender must have at least 1 character",
      })
      .max(50, { message: "Gender must not be longer than 50 characters" })
      .optional(),
    z.literal(""),
    z.null(),
  ]),
  hoursSlept: z
    .number({
      required_error: "Hours Slept is required",
      invalid_type_error: "Hours slept must be a number (decimals supported)",
    })
    .gt(0, { message: "Hours slept must be greater than 0" })
    .lte(24, { message: "Hours slept must be less than or equal to 24" }),
  date: z
    .preprocess(
      (val) => {
        const parsedDate = new Date(val as string);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      },
      z.date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format",
      })
    )
    .refine((date) => dayjs(date).isBefore(dayjs().add(-1, "day")), {
      message: "Date must be in the past",
    }),
});

export type CreateSleepRecordInput = z.infer<
  typeof createSleepRecordInputSchema
>;

export const createSleepRecord = ({
  data,
}: {
  data: CreateSleepRecordInput;
}): Promise<SleepRecord> => {
  return api.post(`/sleep-records`, {
    ...data,
    date: dayjs(data.date).format("YYYY-MM-DD"),
  });
};

type UseCreateSleepRecordOptions = {
  mutationConfig?: MutationConfig<typeof createSleepRecord>;
};

export const useCreateSleepRecord = ({
  mutationConfig,
}: UseCreateSleepRecordOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getRecentSleepRecordsQueryOptions(args[0].userId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createSleepRecord,
  });
};
