import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        const mensagensDeErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join(";");
        super(`Erros -> ${mensagensDeErro}`)
    }
}

export default ErroValidacao