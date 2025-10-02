import request from "supertest";
import app from "../src/app";

describe("Employee routes", () => {

describe("POST /api/v1/employees", () => {
    it("should create employee (201)", async () => {
    const payload = { name:"Test", position:"Teller", department:"Operations", email:"t@e.com", phone:"111", branchId:1 };
    const res = await request(app).post("/api/v1/employees").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test");
    });
    it("should 400 when required fields missing", async () => {
    const res = await request(app).post("/api/v1/employees").send({ name:"OnlyName" });
    expect(res.status).toBe(400);
    });
});


describe("GET /api/v1/employees", () => {
    it("should return array (200)", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
});

describe("GET /api/v1/employees/:id", () => {
    it("should return employee by id (200)", async () => {
    const res = await request(app).get("/api/v1/employees/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).get("/api/v1/employees/abc");
    expect(res.status).toBe(400);
    });
});

describe("PUT /api/v1/employees/:id", () => {
    it("should update employee (200)", async () => {
    const res = await request(app).put("/api/v1/employees/1").send({ phone: "999-999" });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe("999-999");
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).put("/api/v1/employees/xyz").send({ phone:"x" });
    expect(res.status).toBe(400);
    });
});

describe("DELETE /api/v1/employees/:id", () => {
    it("should delete employee (200)", async () => {
    const created = await request(app).post("/api/v1/employees").send({
        name: "Temp", position:"Teller", department:"Operations", email:"temp@e.com", phone:"000", branchId:1
    });
    const id = created.body.id;
    const res = await request(app).delete(`/api/v1/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    });
    it("should 400 for invalid id", async () => {
    const res = await request(app).delete("/api/v1/employees/??");
    expect([400,404]).toContain(res.status);
    });
});

describe("GET /api/v1/employees/branch/:branchId", () => {
    it("should return employees for branch (200)", async () => {
    const res = await request(app).get("/api/v1/employees/branch/1");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
    it("should 400 for invalid branch id", async () => {
    const res = await request(app).get("/api/v1/employees/branch/abc");
    expect(res.status).toBe(400);
    });
});

describe("GET /api/v1/employees/department/:department", () => {
    it("should return employees by department (200)", async () => {
    const res = await request(app).get("/api/v1/employees/department/Loans");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
    it("should 400 when missing department", async () => {
    const res = await request(app).get("/api/v1/employees/department/");
    expect([400,404]).toContain(res.status);
    });
});
});
