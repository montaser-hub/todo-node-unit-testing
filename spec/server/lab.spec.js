const supertest = require("supertest")
const app = require("../..")
const { clearDatabase } = require("../../db.connection")

const request = supertest(app)
describe("lab testing:", () => {
    let mockUser, userInDB, token, mockTodo, todoInDB
    beforeAll(async () => {
        mockUser = { name: "sals", email: "ss@test.com", password: "123" }
        let res = await request.post("/user/signup").send(mockUser)
        userInDB = res.body.data
        let res2 = await request.post("/user/login").send(mockUser)
        token = res2.body.token
        mockTodo = { title: "xxxxx" }
        let res3 = await request.post("/todo").send(mockTodo).set({ authorization: token })
        todoInDB = res3.body.data
    })
    describe("users routes:", () => {
        // Note: user name must be sent in req query not req params
        it("req to get(/search) expect to get the correct user with his name", async () => {
            let res = await request.get("/user/search").query({ name: mockUser.name })
            expect(res.body.data).toEqual(userInDB)
            expect(res.status).toBe(200)
        })
        it("req to get(/search) with invalid name expect res status and res message to be as expected", async () => {
            let res = await request.get("/user/search").query({ name: "mockUser.name" })
            expect(res.body.message).toContain("There is no user")
            expect(res.status).toBe(200)
        })

        it("req to delete(/) expect res status to be 200 and a message sent in res", async () => {
            let res = await request.delete("/user/")
            expect(res.body.message).toContain("deleted successfully")
            expect(res.status).toBe(200)
        })
    })


    describe("todos routes:", () => {
        let mockUser2, userInDB2, token2
        beforeAll(async () => {
            mockUser2 = { name: "sals", email: "ss@test.com", password: "123" }
            let res = await request.post("/user/signup").send(mockUser2)
            userInDB2 = res.body.data
            let res2 = await request.post("/user/login").send(mockUser2)
            token2 = res2.body.token
        })
        it("req to patch(/) and send id only expect res status and res message to be as expected", async () => {
            let res = await request.patch("/todo/" + todoInDB._id).send({ title: todoInDB.title })
            expect(res.body.message).toContain("please login first")
            expect(res.status).toBe(401)
        })
        it("req to patch(/) and send id , title expect res status and res to be as expected", async () => {
            let res = await request.patch("/todo/" + todoInDB._id).send({ title: "new ..." }).set({ authorization: token })
            expect(res.body.data.title).toEqual("new ...")
            expect(res.status).toBe(200)
        })

        it("req to get( /user) expect to get all user's todos", async () => {
            let res = await request.get("/todo/user").set({ authorization: token })
            expect(res.body.data.length).toEqual(1)
            expect(res.status).toBe(200)
        })
        it("req to get( /user) expect to not get any todos for user has no todo", async () => {
            let res = await request.get("/todo/user").set({ authorization: token2 })
            expect(res.body.message).toContain("Couldn't find any todos ")
            expect(res.status).toBe(200)
        })

    })
    afterAll(async () => {
        await clearDatabase()
    })
})