import request from "supertest";
import app from "../src/index";
describe("Rutas de Auth", () => {
    it("Login correcto retorna token", async () => {
        const res = await request(app).post("/api/login").send({
            email: "juan@gmail.com",
            password: "1"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
    it("Login incorrecto retorna 401", async () => {
        const res = await request(app).post("/api/login").send({
            email: "juan@gmail.com",
            password: "123456"
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("error");
    });
});