const request = require("supertest");
const app = require("../server");

describe("Courses API", () => {
  it("GET /courses should return 200", async () => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
  });
});