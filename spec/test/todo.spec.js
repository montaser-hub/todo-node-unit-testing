
const supertest = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");

const request = supertest(app);

describe("todo routes", () => {
    let token
    beforeAll(async () => {
        let user={name:"Ali",email:"test@test.com",password:"1234"}
        await request.post("/user/signup").send(user)
        let res=await request.post("/user/login").send(user)
        token= res.body.data
    })
 it("GET /todo should respond with status 200 and []", async () => {
    let res = await request.get("/todo");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("Post /todo with no auth should respond with 401 and not authorized",async () => {
    let response= await request.post("/todo").send({title:"take some rest"})
    expect(response.status).toBe(401)
    expect(response.body.message).toMatch(/login first/)
  })
  it("Post /todo with auth should respond with status 201 and the new todo",async () => {

    let response= await request.post("/todo").send({title:"take some rest"}).set({authorization:token})
    expect(response.status).toBe(201)
    expect(response.body.data.title).toEqual("take some rest")
  })

  it("GET /todo/id should respond with status 200 and todo with id",async () => {
    let res=await request.post("/todo").send({title:"sleep for 1 h"}).set({authorization:token})
    let id= res.body.data._id
    let response= await request.get("/todo/"+id).set({authorization:token})
    expect(response.status).toBe(200)
    expect(response.body.data.title).toBe("sleep for 1 h")
  })

  afterAll(async ()=>{
   await clearDatabase()
  })
});