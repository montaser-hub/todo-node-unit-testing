# 📝 Todo API with Unit Testing (Node.js + Jasmine)

This project is a **Todo RESTful API** built using **Node.js, Express, and MongoDB** with **JWT-based authentication**.  
The app is fully covered with **unit & integration tests** using **Jasmine + Supertest**.

---

## 🚀 Features

### User Module
- `POST /user/signup` → Create a new user  
- `POST /user/login` → Authenticate user and return JWT  
- `GET /user/` → Get all users  
- `GET /user/:id` → Get user by ID  
- `GET /user/search?name=` → Search user by name  
- `DELETE /user/` → Delete all users  

### Todo Module
- `GET /todo/` → Get all todos  
- `POST /todo/` → Create a todo (**requires login**)  
- `GET /todo/:id` → Get a todo by ID (**requires login**)  
- `PATCH /todo/:id` → Update a todo’s title (**requires login**)  
- `GET /todo/user` → Get all todos for the logged-in user  
- `DELETE /todo/` → Delete all todos (**requires login**)  

### Root Routes
- `GET /` → API root health check  
- `GET /xxx` → Handle 404 Not Found  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MongoDB, Mongoose  
- **Authentication**: JWT (jsonwebtoken, bcryptjs)  
- **Environment**: dotenv, nodemon  
- **Testing**: Jasmine, Supertest, jasmine-spec-reporter  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/montaser-hub/todo-node-unit-testing.git
cd todo-node-unit-testing

# Install dependencies
npm install
