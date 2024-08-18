const request =require("supertest")
const app= require("../index")
const req=request(app)
const {clearDatabase}=require("../db.connection")
describe("user routes:",()=>{
    let userInDB;
    it("send req=> get(/user), should get all user=[]",async()=>{
      let res= await req.get("/user")
        expect(res.status).toBe(200)
        expect(res.body.data).toHaveSize(0)
    })
    it("send req=> post(/user/signup), should add user",async()=>{
       let res=await req.post("/user/signup").send({name:"ali",email:"asd@asd.com",password:"1234"})
       expect(res.status).toBe(201)
       expect(res.body.data).toEqual( jasmine.objectContaining({email:"asd@asd.com"}) )
        userInDB=res.body.data
    })
    it("send req=> post(/user/login) with valid email ,should send token in res",async()=>{
        let res=await req.post("/user/login").send({email:"asd@asd.com",password:"1234"})
        expect(res.status).toBe(200)
        expect(res.body.data).toBeDefined()
    })
    it("send req=> post(/user/login) with invalid email ,should send token in res",async()=>{
        let res=await req.post("/user/login").send({email:"asd@.com",password:"1234"})
        expect(res.status).toBe(401)
        expect(res.body.message).toContain("Invalid email")
    })
    it("send req get(/user/id) , should get the user just added",async()=>{
       let res= await req.get("/user/"+userInDB._id)
       expect(res.body.data.email).toBe("asd@asd.com")
    })
    afterAll(async()=>{
       await clearDatabase()
    })
})