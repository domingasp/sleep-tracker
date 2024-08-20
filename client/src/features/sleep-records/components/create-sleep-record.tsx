import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  CreateSleepRecordInput,
  createSleepRecordInputSchema,
  useCreateSleepRecord,
} from "../api/create-sleep-record";
import {
  Alert,
  Button,
  Card,
  Center,
  Collapse,
  Divider,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBedFilled,
  IconDeviceFloppy,
  IconInfoOctagon,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useGenders } from "../../genders/api/get-genders";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";

export function CreateSleepRecord() {
  const [responseErrorMessage, setResponseErrorMessage] = useState<
    string | undefined
  >(undefined);
  const navigate = useNavigate();
  const gendersQuery = useGenders();
  const genders = gendersQuery.data;

  const createSleepRecordMutation = useCreateSleepRecord({
    mutationConfig: {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Sleep record successfully added",
        });
        navigate("/");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          const responseData = err.response?.data;
          if ("msg" in responseData) {
            setResponseErrorMessage(responseData.msg);
          } else {
            setResponseErrorMessage(err.response?.data);
          }
        } else {
          setResponseErrorMessage("An error occured trying to submit the form");
        }
      },
    },
  });

  // TODO generalise into a component for easy reuse
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateSleepRecordInput>({
    defaultValues: {
      hoursSlept: 8,
      date: dayjs().add(-1, "days").toDate(),
    },
    resolver: zodResolver(createSleepRecordInputSchema),
  });
  const onSubmit = handleSubmit((data) => {
    setResponseErrorMessage(undefined);
    createSleepRecordMutation.mutate({ data });
  });

  return (
    <Center>
      <Card maw={500} w="100%">
        <form onSubmit={onSubmit}>
          <Stack>
            <Group px="sm" justify="space-between">
              <Title order={2}>Add Sleep</Title>

              <IconBedFilled size={38} />
            </Group>

            <Divider />

            <Collapse in={responseErrorMessage !== undefined}>
              {responseErrorMessage && (
                <Alert
                  variant="light"
                  color="red"
                  title="An error occured"
                  icon={<IconInfoOctagon />}
                >
                  {responseErrorMessage}
                </Alert>
              )}
            </Collapse>

            <Group w="100%" align="flex-end">
              <TextInput
                flex={1}
                label="Name"
                {...register("name")}
                error={errors["name"]?.message}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    flex={1}
                    label="Gender"
                    description="Optional"
                    {...field}
                    data={
                      genders?.map((gender) => ({
                        label: gender.name,
                        value: gender.name,
                      })) ?? []
                    }
                    clearable
                  />
                )}
              />
            </Group>

            <Group w="100%">
              <Controller
                name="hoursSlept"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Hours Slept"
                    min={0}
                    max={24}
                    flex={1}
                    {...field}
                  />
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    label="Date"
                    maxDate={dayjs().add(-1, "days").toDate()}
                    flex={1}
                    {...field}
                  />
                )}
              />
            </Group>
          </Stack>

          <Button
            size="sm"
            leftSection={<IconDeviceFloppy />}
            type="submit"
            disabled={!isValid}
            mt="xl"
          >
            Add
          </Button>
        </form>
      </Card>
    </Center>
  );
}
