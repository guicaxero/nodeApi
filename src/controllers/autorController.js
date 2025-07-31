import {autor} from "../models/Autor.js"

class AutorController {

    static async listarAutores (req, res) {
        try {
            const listaAutores = await autor.find({})
            res.status(200).json(listaAutores)
        } catch (erro) {
            res
            .status(500)
            .json({message: `${erro.message} - Requisição falhou`});
        }
    };

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body)
            res.status(201).json({ 
                    message: "Autor adicionado com sucesso",
                    livro: novoAutor
                })
        } catch (error) {
            res
            .status(500).json({
                message: `${erro.message} - Falha ao adicionar um livro`
            });
        }
    };

    static async buscarAutor(req, res) {
        try{
            const autorEncontrado = await autor.findById(req.params.id)
            const nomeAutor = autorEncontrado.nome
            res
            .status(200).json({
                autor: autorEncontrado,
                message: `O autor ${nomeAutor} foi encontrado!`
            })
        } catch (error) {
            res.status(500).json({
                message: `Erro na requisição: ${error.message}`
            })
        }
    };

    static async alterarAutor(req, res) {
        try{
            const id = req.params.id
            const autorAtual = await autor.findById(id)
            const autorAlterado = await autor.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json({
                autor: autorAlterado,
                message: `Autor ${autorAtual.nome} Alterado com sucesso`
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Requisição falhou`
            })
        }
    };

    static async deletarAutor(req, res) {
        try {
            const autorDeletado = await autor.findOneAndDelete(req.params.id)
            res.status(200).json({
                autor: autorDeletado,
                message: "Autor deletado."
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Requisição falhou`
            })
        }

    };


};


export default AutorController;
