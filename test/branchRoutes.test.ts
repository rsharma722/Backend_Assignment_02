import request from "supertest";
import app from "../src/app";

describe("Branch routes (minimal)", () => {
  describe("POST /api/v1/branches", () => {
    it("should create branch (201)", async () => {
      const res = await request(app).post("/api/v1/branches").send({
        name: "New Branch",
        address: "123 Road",
        phone: "111-222",
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
    });

    it("should 400 when fields missing", async () => {
      const res = await request(app).post("/api/v1/branches").send({ name: "X" });
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
});
