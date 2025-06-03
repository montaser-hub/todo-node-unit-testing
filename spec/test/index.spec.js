const supertest = require("supertest");
const app = require("../..");

const request = supertest(app);
//grouping test cases (suite)
describe("index routes", () => {
  //test case (spec)
  it("GET / should respond with status 200 and []", async () => {
    let res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
  it("GET /xx should respond with status 404 and not found", async () => {
    let res = await request.get("/xx");
    expect(res.status).toEqual(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
