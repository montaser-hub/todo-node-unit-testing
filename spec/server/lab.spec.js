const supertest = require("supertest")
const app = require("../..")
const { connectToDatabase, clearDatabase } = require("../../db.connection")

const request = supertest(app)
xdescribe("lab testing:", () => {
    

    describe("users routes:", () => {
        // Note: user name must be sent in req query not req params
        it("req to get(/search) expect to get the correct user with his name", async () => { })
        it("req to get(/search) with invalid name expect res status and res message to be as expected", async () => { })

        it("req to delete(/) expect res status to be 200 and a message sent in res", async () => { })
    })


    describe("todos routes:", () => {
        it("req to patch(/) and send id only expect res status and res message to be as expected", async () => { })
        it("req to patch(/) and send id , title expect res status and res to be as expected", async () => { })

        it("req to get( /user/:id) expect get user's todos", async () => {})
          
    })
    afterAll(async () => {
        await clearDatabase()
    })
})