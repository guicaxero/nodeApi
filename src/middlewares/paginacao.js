import NotFound from "../erros/NotFound.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try{
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(":")

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem)

        const resultado = req.resultado

        if( limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado
                .find()
                .skip( (pagina - 1) * limite )
                .limit(limite)
                .sort({ [campoOrdenacao]: ordem })


            if (!resultadoPaginado.length) {
                return next(new NotFound("Nenhum livro encontrado."))
            }
            return res.status(200).json(resultadoPaginado)
        }

        next(new RequisicaoIncorreta())
    } catch (erro) {
        next(erro)
    }

}


export default paginar