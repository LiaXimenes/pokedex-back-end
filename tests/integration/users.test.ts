import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";


beforeAll(async () => {
  await init();
});

// beforeEach(async () => {
//   await clearDatabase();
// });

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  // it("should answer status 201", async () => {
  //   const email: string = "test@test.com";
  //   const password: string = "12345";
  //   const confirmPassword: string = "12345"

  //   const body = {email, password, confirmPassword} 

  //   const response = await supertest(app).post("/sign-up").send(body);
  //   expect(response.status).toBe(201);
  // });

  it("should answer status 409 if email already registered", async () => {
    const email: string = "test@test.com";
    const password: string = "12345";
    const confirmPassword: string = "12345"

    const body = {email, password, confirmPassword} 

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(409);
  });

  it("should answer status 400 if password and confirmPassword are different", async () => {
    const email: string = "test@test.com";
    const password: string = "12345";
    const confirmPassword: string = "123456"

    const body = {email, password, confirmPassword} 

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 if password is not provided", async () => {
    const email: string = "test@test.com";
    const password: string = "";
    const confirmPassword: string = "12345"

    const body = {email, password, confirmPassword} 

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 if email is not provided", async () => {
    const email: string = "";
    const password: string = "12345";
    const confirmPassword: string = "12345"

    const body = {email, password, confirmPassword} 

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(400);
  });

});

describe("POST /sign-in", () => {
  it("should answer status 200", async () => {
    const email: string = "test@test.com";
    const password: string = "12345";

    const body = {email, password}

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.status).toBe(200);
  });

  it("should answer with token", async () => {
    const email: string = "test@test.com";
    const password: string = "12345";

    const body = {email, password}

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.text.length).not.toBe(0);
  });

  it("should answer status 400 if password is not provided", async () => {
    const email: string = "test@test.com";
    const password: string = "";

    const body = {email, password} 

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 if email is not provided", async () => {
    const email: string = "";
    const password: string = "12345";


    const body = {email, password} 

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer status 401 if password is not matched with the hash in the bank", async () => {
    const email: string = "test@test.com";
    const password: string = "123456";

    const body = {email, password} 

    const response = await supertest(app).post("/sign-in").send(body);
    expect(response.status).toBe(401);
  });

});
