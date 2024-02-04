const request = require('supertest');
const app = require('..');
const { clearDatabase } = require('../db.connection');


const req = request(app)
describe("user routes", () => {
    afterAll(async () => {
        await clearDatabase()
    })
    let mockUser = { name: "nada", email: "asd@yahoo.com", password: "123" }
    let userInDB
    it("expect get(/user) to res has all todos", async () => {
        let res = await req.get("/user/")
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(0)
    })
    it("expect post(/user/signup) and valid user then getting res correctly", async () => {
        let res = await req.post("/user/signup").send(mockUser)
        expect(res.status).toBe(201)
        expect(res.body.data.name).toBe(mockUser.name)
        userInDB= res.body.data
    })
    it("expect get(/user) to res has all todos after adding", async () => {
        let res = await req.get("/user/")
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(1)
        // userInDB= res.body.data[0]
    })
    it("expect post(/user/login) and valid user then login correctly", async () => {
        let res = await req.post("/user/login").send(mockUser)
        expect(res.status).toBe(200)
        expect(res.body.token).toBeDefined()
    })
    it("expect post(/user/login) and invalid user to not login ", async () => {
        let res = await req.post("/user/login").send({email:mockUser.email,password:"12"})
        expect(res.status).toBe(401)
        expect(res.body.message).toContain("Invalid")
    })
    it("expect get(/user/id) and valid id to get user in db", async () => {
       let res=await req.get("/user/"+userInDB._id)
       expect(res.body.data.password).toBe(userInDB.password)
    })
    

})