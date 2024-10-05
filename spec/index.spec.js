const supertest= require("supertest")
const app = require("..")
const req=supertest(app)

describe("default routes:",()=>{
    it("get req(/): res has todos=[] with status=200",async()=>{
      let res= await req.get("/")

      expect(res.status).toBe(200)
      expect(res.body.data).toEqual([])
    })
    it("get req(/xx): res has 'not found' with status=404",async()=>{
      let res= await req.get("/xx")

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Not found")
    })
})