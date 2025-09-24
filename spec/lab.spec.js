const supertest = require("supertest"); //that allows us to test http requests
const app = require(".."); //the express app
const { clearDatabase } = require("../db.connection"); //to clear the database
const e = require("express");
const request = supertest(app); //supertest instance

describe("lab testing:", () => {
  let user = { email: "test@test.com", password: "1234", name: "Ali" };
  let token, idTodoInDB, userId;
  beforeAll(async () => {
    await request.post("/user/signup").send(user);
    let res = await request.post("/user/login").send(user);
    token = res.body.data;
  });
  
    afterAll( async () => {
      await clearDatabase()
  })

  describe("users routes:", () => {
    it("GET /user/search should respond with the correct user with the name requested", async () => {
      // Note: user name must be sent in request query not request params

      await request.post("/user/signup").send(user);

      let res = await request.get("/user/search?name=Ali");

      // expect(request.query.name).toBeTruthy()
      expect(res.status).toBe(200);

      expect(res.body.data.name).toEqual("Ali");
    });

    it("GET /user/search with invalid name should respond with status 404 and the message", async () => {
      let res = await request.get("/user/search?name=Mohamed");
      expect(res.status).toBe(404);
    });
  });

  describe("todos routes:", () => {
    it("PATCH /todo/ with id only should respond with res status 400 and a message", async () => {
      let res = await request
        .patch("/todo/" + idTodoInDB)
        .send({})
        .set({ authorization: token });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        "must provide title and id to edit todo"
      );
    });
    it("PATCH /todo/ with id and title should respond with status 200 and the new todo", async () => {
      let res = await request
        .post("/todo")
        .send({ title: "new todo" })
        .set({ authorization: token })
        let id = res.body.data._id
        
        let res2 = await request
        .patch("/todo/" + id)
        .send({ title: "new title" })
        .set({ authorization: token });
      expect(res2.status).toBe(200);
      expect(res2.body.data.title).toEqual("new title");
    });

    it("GET  /todo/user should respond with the user's all todos", async () => {
      let res = await request
        .get("/todo/user/")
        .set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveSize(1);
    });
      it( "GET  /todo/user for a user hasn't any todo, should respond with status 200 and a message", async() => {
          let user2 = { email: "test23@test.com", password: "13234", name: "A3hmed" };
          await request.post( "/user/signup" ).send( user2 );
          let login = await request.post( "/user/login" ).send( user2 );
         token = login.body.data
          let res = await request
        .get("/todo/user/")
              .set( { authorization: token } );
          console.log(res.body.data);
          expect( res.status ).toBe( 200 );
          
      expect(res.body.message).toContain("Couldn't find any todos for");
    });
  });
});
