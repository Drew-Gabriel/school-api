const request = require("supertest");
const app = require("../server");

describe("Instructors API", () => {
  it("GET /instructors should return 200", async () => {
    const res = await request(app).get("/instructors");
    expect(res.statusCode).toBe(200);
  });
});