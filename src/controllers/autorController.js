import { autor } from "../models/index.js"
import NotFound from "../erros/NotFound.js"

class AutorController {

    static async listarAutores (req, res, next) {
        try {
            const listaAutores = await autor.find({})
            if (!listaAutores.length) {
                next(new NotFound("Nenhum autor encontrado."))
            }
            res.status(200).json(listaAutores)
        } catch (erro) {
            next(erro)
        }
    };

    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body)
            res.status(201).json({ 
                    message: "Autor adicionado com sucesso",
                    livro: novoAutor
                })
        } catch (erro) {
            next(erro)
        }
    };

    static async buscarAutor(req, res, next) {
        try{
            const id = req.params.id
            const autorEncontrado = await autor.findById(id)
            const nomeAutor = autorEncontrado?.nome

            if (!autorEncontrado) {
                return next(new NotFound("Autor não encontrado!"));
            } 
            res.status(200).json({
                autor: autorEncontrado,
                message: `O autor ${nomeAutor} foi encontrado!`
            })
        } catch (erro) {
            next(erro)
        }
    };

    static async alterarAutor(req, res, next) {
        try{
            const id = req.params.id
            const autorAtual = await autor.findById(id)
            const autorAlterado = await autor.findByIdAndUpdate(id, req.body, {new: true})
            if(!autorAtual) {
                return next(new NotFound("Autor não encontrado"));
            }
            res.status(200).json({
                autor: autorAlterado,
                message: `Autor ${autorAtual.nome} Alterado com sucesso`
            })
        } catch (erro) {
            next(erro)
        }
    };

    static async deletarAutor(req, res, next) {
        try {
            const autorDeletado = await autor.findByIdAndDelete(req.params.id)
            if(!autorDeletado) {
                return next(new NotFound("Autor não encontrado!"));
            }
            res.status(200).json({
                autor: autorDeletado,
                message: "Autor deletado."
            })
        } catch (erro) {
            next(erro)
        }

    };


};


export default AutorController;
