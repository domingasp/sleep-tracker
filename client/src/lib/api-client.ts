import axios from "axios";
import { env } from "../config/env";
import { notifications } from "@mantine/notifications";

export const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message;
    notifications.show({
      color: "red",
      title: "Error",
      message,
    });
    return Promise.reject(error);
  }
);
