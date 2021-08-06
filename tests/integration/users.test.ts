import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
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
  it("should answer status 200", async () => {
    const email: string = "test@gmail.com";
    const password: string = "12345";
    const confirmPassword: string = "12345"

    const body = {email, password, confirmPassword} 

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(200);
  });
});

describe("POST /sign-in", () => {
  it("should answer status 200", async () => {
    const email: string = "test@gmail.com";
    const password: string = "12345";

    const body = {email, password}

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(200);
  });
});
