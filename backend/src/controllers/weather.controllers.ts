import { Request, Response, NextFunction } from "express";
import { getWeatherFor } from "../services/weather.services";


export const obtenerClima = async (req: Request, res: Response) => {

    const ciudad = String(req.query.ciudad || "");
    const fecha = String(req.query.fecha || "");

    if (!ciudad || !fecha) {
        return res.status(400).json({ status: "error", message: " Ciudad y fecha son requeridos" });
    }

    try {
        const resultado = await getWeatherFor(ciudad, fecha);

        if (!resultado.found) {
            return res.status(404).json({ status: "error", message: resultado.message });
        }

        return res.status(200).json({ status: "success", data: resultado });

    } catch (error) {

        return res.status(500).json({ status: "error", message: "Error al obtener el clima" });

    }
}