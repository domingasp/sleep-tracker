import request from "supertest";
import app from "../app";

test('root responds with "Hello!"', async () => {
  const res = await request(app).get("/");

  expect(res.statusCode).toEqual(200);
  expect(res.text).toBe("Hello!");
});
