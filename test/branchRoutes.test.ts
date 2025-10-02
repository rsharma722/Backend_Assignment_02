import request from "supertest";
import app from "../src/app";

describe("Branch routes", () => {
describe("POST /api/v1/branches", () => {
    it("should create branch (201)", async () => {
    const res = await request(app).post("/api/v1/branches").send({
        name:"New Branch", address:"123 Road", phone:"111-222"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    });
    it("should 400 when fields missing", async () => {
    const res = await request(app).post("/api/v1/branches").send({ name:"X" });
    expect(res.status).toBe(400);
    });
});

describe("GET /api/v1/branches", () => {
    it("should return array (200)", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
});

describe("GET /api/v1/branches/:id", () => {
    it("should return branch by id (200)", async () => {
    const res = await request(app).get("/api/v1/branches/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).get("/api/v1/branches/abc");
    expect(res.status).toBe(400);
    });
});

describe("PUT /api/v1/branches/:id", () => {
    it("should update branch (200)", async () => {
    const res = await request(app).put("/api/v1/branches/1").send({ phone:"999-000" });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("999-000");
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).put("/api/v1/branches/xyz").send({ phone:"x" });
    expect(res.status).toBe(400);
    });
});

describe("DELETE /api/v1/branches/:id", () => {
    it("should delete branch (200)", async () => {
    const created = await request(app).post("/api/v1/branches").send({
        name:"TempB", address:"Addr", phone:"000"
    });
    const id = created.body.id;
    const res = await request(app).delete(`/api/v1/branches/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).delete("/api/v1/branches/??");
    expect([400,404]).toContain(res.status);
    });
});
});
