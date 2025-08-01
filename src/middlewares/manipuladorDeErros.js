import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipularErros(erro, req, res, next) {
    console.log(erro)
    if ( erro instanceof mongoose.Error.CastError) {
        res.status(400).send({message: `Dados fornecidos estão incorretos`});
        return;    
    }
    res.status(500).send(`${erro.message} - Falha na requisição`)
}

export default manipularErros
