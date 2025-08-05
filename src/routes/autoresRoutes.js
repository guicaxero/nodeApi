import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginacao.js";

const routes = express.Router();


routes.get("/autores", AutorController.listarAutores, paginar)
routes.get("/autores/:id", AutorController.buscarAutor)
routes.post("/autores", AutorController.cadastrarAutor)
routes.put("/autores/:id", AutorController.alterarAutor)
routes.delete("/autores/:id", AutorController.deletarAutor)

export default routes;