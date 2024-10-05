const supertest= require("supertest")
const app = require("..")
const { clearDatabase } = require("../db.connection")
const req=supertest(app)

fdescribe("todo routes:",()=>{
 let mockUser= {name:"ali",email:"asd@asd.com",password:"1234"}
 let token,todoInDB
 afterAll(async()=>{
       await clearDatabase()
    })
    beforeAll(async () => {
        await req.post("/user/signup").send(mockUser)
       let res= await req.post("/user/login").send(mockUser)
       token= res.body.data
    })
 it("get req(/todo/): res has todo=[]",async () => {
        let res= await req.get("/todo")
        expect(res.status).toBe(200)
        expect(res.body.data).toEqual([])
    })
    it("post req(/todo): res has the just added todo",async()=>{

        let res= await req.post("/todo").send({title:"read a book"}).set({authorization:token})
        expect(res.status).toBe(201)
        expect(res.body.data.title).toBe("read a book")
        todoInDB=res.body.data
    })
    it("post req(/todo) with no auth: res has the just added todo",async()=>{

        let res= await req.post("/todo").send({title:"read a book"})
        expect(res.status).toBe(401)
        expect(res.body.message).toContain("login first")
    })
    it("get req(/todo/id): res has the todo",async()=>{
        let res= await req.get("/todo/"+todoInDB._id).set({authorization:token})
        expect(res.body.data).toEqual(todoInDB)
    })
})