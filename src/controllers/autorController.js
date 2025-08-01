import {autor} from "../models/Autor.js"

class AutorController {

    static async listarAutores (req, res, next) {
        try {
            const listaAutores = await autor.find({})
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

            if (autorEncontrado) {
                res.status(200).json({
                    autor: autorEncontrado,
                    message: `O autor ${nomeAutor} foi encontrado!`
                })
                return;
            } 
            res.status(404).send("Autor não encontrado!")
        } catch (erro) {
            next(erro)
        }
    };

    static async alterarAutor(req, res, next) {
        try{
            const id = req.params.id
            const autorAtual = await autor.findById(id)
            const autorAlterado = await autor.findByIdAndUpdate(id, req.body, {new: true})
            if(autorAtual) {
                res.status(200).json({
                    autor: autorAlterado,
                    message: `Autor ${autorAtual.nome} Alterado com sucesso`
                })
                return
            }
            res.status(404).send("Autor não encontrado")
        } catch (erro) {
            next(erro)
        }
    };

    static async deletarAutor(req, res, next) {
        try {
            const autorDeletado = await autor.findOneAndDelete(req.params.id)
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
