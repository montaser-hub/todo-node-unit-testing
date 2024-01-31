const { getAllUser, saveUser } = require("../../controllers/user")
const { connectToDatabase, clearDatabase } = require("../../db.connection")


//beforeAll //beforeEach //afterEach //afterAll
xdescribe("db user:",()=>{
    let mockUser
    beforeAll(async()=>{
        await connectToDatabase()
        mockUser={name:"ali",email:"xx@xx.com",password:"1234"}
    })
    it("get all user in the beginning",async()=>{
     let users= await getAllUser()

     expect(users.length).toBe(0)
    })
    it("add user",async()=>{
        
        let user= await saveUser(mockUser)
        expect(user.name).toBe(mockUser.name)        
    })
    it("get all user expect to get the user just been add",async()=>{

        let users= await getAllUser()
        expect(users.length).toBe(1)
        expect(users[0].name).toBe(mockUser.name)
    })
    afterAll(async()=>{
       await clearDatabase()
    })

    ///for lab
    describe("getUserByName:", () => {
        it("expect to get the just added user correctly by name", () => {
           
        })
    })
    describe("deleteAllUsers:", () => {
        it("expect to delete all users", () => {

        })
    })
})