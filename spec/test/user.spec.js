
const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

const request = supertest(app);

describe("user routes", () => {
 it("GET /user should respond with status 200 and []", async () => {
    let res = await request.get("/user");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
 it("POST /user/signup should respond with status 201 and the new user", async () => {
    let mockUser={name:"Ali",email:"ali@test.com",password:"1234"}
    let res = await request.post("/user/signup").send(mockUser);
    expect(res.status).toBe(201);
    expect(res.body.data.email).toEqual(mockUser.email);
  });
 it("POST /user/login should respond with status 200 and token", async () => {
    let mockUser={name:"Ahmed",email:"ahmed@test.com",password:"1234"}
    await request.post("/user/signup").send(mockUser)
    let res = await request.post("/user/login").send(mockUser);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined()
  });
 it("POST /user/login with wrong password should respond with status 200 and token", async () => {
    let mockUser={name:"Ahmed",email:"ahmed@test.com",password:"1234"}
    
    let res = await request.post("/user/login").send({email:mockUser.email,password:"xxxx"});
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/password/)
  });

  afterAll(async ()=>{
   await clearDatabase()
  })
});