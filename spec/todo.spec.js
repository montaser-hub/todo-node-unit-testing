const request = require("supertest");
const app = require("../index");
const req = request(app);
const { clearDatabase } = require("../db.connection");
fdescribe("todo routes:", () => {
  let token,todoInDB;
  beforeAll(async () => {
    let user = { name: "samar", email: "samer@samer.com", password: "123" };
    await req.post("/user/signup").send(user);
    let res = await req
      .post("/user/login")
      .send({ email: user.email, password: user.password });
    token = res.body.data;
  });
  it("send req=> get(/todo), should get all todo=[]", async () => {
    let res = await req.get("/todo");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveSize(0);
  });
  it("send req=> post(/todo), should add todo", async () => {
    let res = await req.post("/todo").send({ title: "eat breakfast" }).set({ authorization: token });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("eat breakfast");
   todoInDB= res.body.data
  });
  it("send req=> post(/todo), should add todo with no auth", async () => {
    let res = await req.post("/todo").send({ title: "eat breakfast" })
    expect(res.status).toBe(401);
    expect(res.body.message).toContain("login first");
  });
  it("send req=> post(/todo), should add todo with no auth", async () => {
    let res = await req.post("/todo").send({ title: "e" }).set({ authorization: token });
    expect(res.status).toBe(500);
    expect(res.body.message).toContain("less than 3");
  });
  it("send req=> get(/todo/id), should get the just added todo", async () => {
    let res = await req.get("/todo/"+todoInDB._id).set({ authorization: token });;
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(todoInDB);
  });
  afterAll(async () => {
    await clearDatabase();
  });
});
