const request = require('supertest');
const app = require('..');


const req=request(app)
describe("default route",()=>{
    it("expect get(/) to res has all todos",async()=>{
      let res= await req.get("/")
      expect(res.status).toBe(200)
      expect(res.body.todos.length).toBe(0)
    })
})