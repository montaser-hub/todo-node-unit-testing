const request = require('supertest');
const app = require('..');


const req=request(app)
describe("default route",()=>{
    it("expect get(/) to res has all todos",async()=>{
      let res= await req.get("/")
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
    })
    it("expect get(/xx) to res with not found",async()=>{
      let res= await req.get("/xx")
      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Not found")
    })
})