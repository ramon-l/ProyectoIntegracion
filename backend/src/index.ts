import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import usuariosRoutes from "./routes/usuarios.routes";
import reservasRoutes from "./routes/reservas.routes";
import mesasRoutes from "./routes/mesas.routes";
import rolesRoutes from "./routes/roles.routes";
import login from "./routes/loggin.routes";
import weatherRoutes from "./routes/weather.routes";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(errorHandler);

app.use('/api', usuariosRoutes);
app.use('/api', reservasRoutes);
app.use('/api', mesasRoutes);
app.use('/api', rolesRoutes);
app.use('/api', login);
app.use('/api', weatherRoutes);

app.listen(3000, () => {
     console.log(`Servidor en http://localhost:${PORT}`);
}
)