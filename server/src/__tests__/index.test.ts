import request from "supertest";
import app from "../app";

test('root path responds with "API is running on /api"', async () => {
  const res = await request(app).get("/");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ status: "API is running on /api" });
});
