import ErroBase from "./ErroBase.js";


class NotFound extends ErroBase {
    constructor(mensagem = "Pagina não encontrada") {
        super(mensagem, 404)
    }
}

export default NotFound