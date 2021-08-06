import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase, populateSession } from "../utils/database";


beforeAll(async () => {
  await init();
});

// beforeEach(async () => {
//   //await clearDatabase();

//   //await populateSession();
// });

afterAll(async () => {
  await getConnection().close();
});

describe("GET /pokemons", () => {
    it("should answer status 200", async () => {
      const response = await supertest(app).get("/pokemons").set("authorization", "Bearer validToken");
      expect(response.status).toBe(200);
    });
  
    it("should answer with pokemons", async () => {
      const response = await supertest(app).get("/pokemons").set("authorization", "Bearer validToken");
      expect(response.body.length).not.toBe(0);
    });
});

describe("POST /my-pokemons/:id/add", () => {
  it("should answer status 200", async () => {
    const response = await supertest(app).post("/my-pokemons/1/add").set("authorization", "Bearer validToken");;
    expect(response.status).toBe(200);
  });
});

describe("POST /my-pokemons/:id/remove", () => {
  it("should answer status 200", async () => {
    const response = await supertest(app).post("/my-pokemons/1/remove").set("authorization", "Bearer validToken");;
    expect(response.status).toBe(200);
  });
});
  