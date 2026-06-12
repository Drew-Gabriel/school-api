const request = require("supertest");
const app = require("../server");
const { initDb } = require("../db/connect");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await initDb();
});

describe("Students API", () => {
  it("GET /students should return 200", async () => {
    const res = await request(app).get("/students");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});