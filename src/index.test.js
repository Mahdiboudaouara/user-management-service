const request = require("supertest");
const { app } = require("./app");
const { faker } = require("@faker-js/faker");
const db = require("./config");

afterAll((done) => {
    // Close the database connection
    db.end(done);
});


describe("registerUser", () => {
    test("should register a new user and return a 200 status code", async () => {
        let randomName = faker.name.fullName();
        let randomEmail = faker.internet.email();
        let randomPassword = faker.internet.password();
        let randomBalance = faker.random.numeric(7);
        const response = await request(app).post("/backend/user/register").send({
            name: randomName,
            email: randomEmail,
            password: randomPassword,
            balance: randomBalance,
        });
        expect(response.statusCode).toBe(200);
    });

    test("should return a 400 status code if user already exists", async () => {
        const req = {
            body: {
                name: "John Doe",
                email: "oussema422oussema@gmail.com",
                password: "password123",
                balance: 100,
            },
        };
        const response = await request(app)
            .post("/backend/user/register")
            .send(req.body);
        expect(response.statusCode).toBe(400);
    });
});

describe("loginUser", () => {
  test("should log in a user with correct credentials and return a token", async () => {
    const req = {
      body: {
        email: "oussema@gmail.com",
        password: "123456",
      },
    };
    const response = await request(app).post("/backend/user/login").send(req.body);
    console.log("response body:", response.header); // add this line
    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty("auth-token");
  });

    test("should return a 400 status code if email is wrong", async () => {
        const req = {
            body: {
                email: "nonexistent@example.com",
                password: "password123",
            },
        };
        const response = await request(app).post("/backend/user/login").send(req.body);
        expect(response.statusCode).toBe(400);
    });

    test("should return a 400 status code if password is wrong", async () => {
        const req = {
            body: {
                email: "oussema422oussema@gmail.com",
                password: "wrongpassword",
            },
        };
        const response = await request(app).post("/backend/user/login").send(req.body);
        expect(response.statusCode).toBe(400);
    });
});

describe("one field is missing", () => {
    test("should respond with a status code of 400", async () => {
        const bodyData = [
            { name: "username", email: "email@test.com", balance: 0 },
            { email: "test@gmail.com", password: "helloworld", balance: 0 },
            { name: "besbes", password: "helloworld", balance: 0 },
        ];
        for (const body of bodyData) {
            const response = await request(app).post("/backend/user/register").send(body);
            expect(response.statusCode).toBe(400);
        }
    });
});
