import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NotFound from "../erros/NotFound.js";

// eslint-disable-next-line no-unused-vars
function manipularErros(erro, req, res, next) {
    if ( erro instanceof mongoose.Error.CastError) {
        return new RequisicaoIncorreta().enviarResposta(res);
    }
    if(erro instanceof mongoose.Error.ValidationError) {
        return new ErroValidacao(erro).enviarResposta(res);
    }
    if(erro instanceof NotFound) {
        return erro.enviarResposta(res);
    }
   new ErroBase().enviarResposta(res)
}

export default manipularErros
