import request from "supertest";
import app from "../src/index";
describe("Rutas de Usuario", () => {
    it("Crear usuario, retorna el nuevo usuario", async () => {
    const rest = await request(app).post("/api/user").send(
    {
        nombre: "Pedro",
        apellido: "Perez",
        correo: "pedro@gmail.com",
        telefono: "1111",
        fechaRegistro: "2025-09-21T18:01:20.088Z",
        password: "1",
        rolId: 2
    });
});
});