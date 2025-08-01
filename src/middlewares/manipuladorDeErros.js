import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipularErros(erro, req, res, next) {
    if ( erro instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
        return;    
    }
    if(erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res)
        return;  
    }
   new ErroBase().enviarResposta(res)
}

export default manipularErros
