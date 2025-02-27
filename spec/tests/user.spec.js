
const supertest= require("supertest")
const app = require("../..")
const { clearDatabase } = require("../../db.connection")
const req=supertest(app)

describe("user routes:",()=>{
    let mockUser= {name:"ali",email:"asd@asd.com",password:"1234"}
    let userInDB
    afterAll(async()=>{
       await clearDatabase()
    })
    it("get req(/user/): res has users=[]",async () => {
        let res= await req.get("/user")
        expect(res.status).toBe(200)
        expect(res.body.data).toEqual([])
    })
    it("post req(/user/signup): res has the just added user with status=200",async () => {
       let res=await req.post("/user/signup").send(mockUser)
       expect(res.body.data.email).toEqual(mockUser.email)
       expect(res.status).toBe(201)
        userInDB= res.body.data
    })
    it("post req(/user/login): res has token with status=200",async () => {
        let res= await req.post("/user/login").send(mockUser)

        expect(res.body.data).toBeDefined()
        expect(res.status).toBe(200)
    })
    it("post req(/user/login) with invalid password: res has message with status=401",async () => {
        let res= await req.post("/user/login").send({email:mockUser.email,password:"asdasd"})

        expect(res.body.message).toContain("password")
        expect(res.status).toBe(401)
    })
    it("get req(/user/id): res has user ",async function () {
        let res= await req.get("/user/"+userInDB._id)

        expect(res.body.data).toEqual(userInDB)
        expect(res.status).toBe(200)

    })
    
})