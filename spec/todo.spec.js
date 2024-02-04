const request = require('supertest');
const app = require('..');
const { clearDatabase } = require('../db.connection');


const req = request(app)
describe("todo routes", () => {
    afterAll(async () => {
        await clearDatabase()
    })
    let userInDB, token, todoInDB
    beforeAll(async () => {
        let mockUser = { name: "nada", email: "asd@yahoo.com", password: "123" }

        let res1 = await req.post("/user/signup").send(mockUser)
        userInDB = res1.body.data
        let res2 = await req.post("/user/login").send(mockUser)
        token = res2.body.token
    })
    it("expect get(/todo) to res has all todos", async () => {
        let res = await req.get("/todo/")
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(0)
    })
    it("expect post(/todo) to add a todo", async () => {
        let res = await req.post("/todo").send({ title: "eating launch" }).set({ authorization: token })
        expect(res.status).toBe(201)
        todoInDB = res.body.data
    })
    it("expect get(/todo/id) with no auth to get message to login first", async () => {
        let res = await req.get("/todo/" + todoInDB._id)
        expect(res.body.message).toContain("please login first")
    })
    it("expect get(/todo/id) with valid auth to get message to login first", async () => {
        let res = await req.get("/todo/" + todoInDB._id).set({ authorization: token })
        expect(res.body.data.title).toContain("eating")
    })
    it("expect delete(/todo/id) to delete all todos", async () => {
        let res=await req.delete("/todo/").set({ authorization: token })
        expect(res.body.message).toBe("todos have been deleted successfully")
     })
})