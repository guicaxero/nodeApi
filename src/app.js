import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connect = await connectDatabase();

connect.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connect.once("open", () => {
    console.log("Conexão com o mongodb feita com sucesso");
})

const app = express();
routes(app)



export default app;
