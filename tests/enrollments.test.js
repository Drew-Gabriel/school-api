const request = require("supertest");
const app = require("../server");

describe("Enrollments API", () => {
  it("GET /enrollments should return 200", async () => {
    const res = await request(app).get("/enrollments");
    expect(res.statusCode).toBe(200);
  });
});