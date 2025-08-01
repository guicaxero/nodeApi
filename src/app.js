import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipularErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulardor404.js";

const connect = await connectDatabase();

connect.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connect.once("open", () => {
    console.log("Conexão com o mongodb feita com sucesso");
})

const app = express();
routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipularErros)



export default app;
