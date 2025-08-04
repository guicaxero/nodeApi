import NotFound from "../erros/NotFound.js";
import { autor } from "../models/index.js";
import {livros} from "../models/index.js";

class LivroController {

    static async listarLivros (req, res, next) {
        try {
            const listaLivro = await livros.find({})
            if (!listaLivro.length) {
                next(new NotFound("Nenhum livro encontrado."))
            }
            res.status(200).json(listaLivro)
        } catch (erro) {
            next(erro)
        }
    };

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if (!autorEncontrado) {
                return next(new NotFound("É necessário um autor para cadastrar um livro!"));
            } 
            const livroCompleto = {
                ...novoLivro, 
                autor: { ...autorEncontrado._doc}
            };
            const novoLivroCriado = await livros.create(livroCompleto);
            
            res.status(201).json({ 
                    message: "Livro adicionado com sucesso",
                    livro: novoLivroCriado
                })
        } catch (erro) {
            next(erro)
        }
    };

    static async buscarLivro(req, res, next) {
        try{
            const livroEncontrado = await livros.findById(req.params.id)
            if(!livroEncontrado) {
                return next(new NotFound("Livro não encontrado!"));
            }

            const nomeLivro = livroEncontrado.title
            res.status(200).json({
                livro: livroEncontrado,
                message: `O livro ${nomeLivro} foi encontrado!`
            })
        } catch (erro) {
            next(erro)
        }
    };

    static async alterarLivro(req, res, next) {
        try{
            const id = req.params.id
            const livroAlterado = await livros.findByIdAndUpdate(id, req.body, {new: true})
            if(!livroAlterado) {
                return next(new NotFound("livro não encontrado!"))
            }

            res.status(200).json({
                livro: livroAlterado,
                message: `Livro ${livroAlterado.title} Alterado com sucesso`
            })
        } catch (erro) {
            next(erro)
        }
    };

    static async deletarLivro(req, res, next) {
        try {
            const livroDeletado = await livros.findByIdAndDelete(req.params.id)
            if (!livroDeletado) {
                return next(new NotFound("Livro não encontrado!"));
            }

            res.status(200).json({
                livro: livroDeletado,
                message: "Livro deletado."
            })
        } catch (erro) {
            next(erro)
        }

    };

    static async buscarLivroPorParametro(req, res, next) {
        try{
            const busca = await processaBusca(req.query)

            const livroResultado = await livros.find(busca)
            if( !livroResultado.length ) {
                return res.status(200).json({
                    livro: [],
                    message: "Não foi encontrado nenhum livro!"
                })
                // return next(new NotFound("Não foi encontrado nenhum livro!"))
            }

            res.status(200).json({
                livros: livroResultado
            })
        } catch(erro) {
            next(erro)
        }
    }

    
};

async function processaBusca(params) {
    const {editora, title, minPaginas, maxPaginas, nomeAutor} = params;

    const busca = {};

    if (minPaginas || maxPaginas) busca.paginas = {}

    if (minPaginas) busca.paginas.$gte = Number(minPaginas)
    if (maxPaginas) busca.paginas.$lte = Number(maxPaginas)

    if (editora) busca.editora = editora;
    if (title) busca.title = { $regex: title, $options: "i" };

    if (nomeAutor) {
        busca["autor.nome"] = { $regex: nomeAutor, $options: "i" } 
    }
    return busca
}


export default LivroController;
