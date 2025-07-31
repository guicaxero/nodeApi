import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            const listaLivro = await livro.find({})
            res.status(200).json(listaLivro)
        } catch (erro) {
            res
            .status(500)
            .json({message: `${erro.message} - Requisição falhou`});
        }
    };

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: { ...autorEncontrado._doc}};
            const novoLivroCriado = await livro.create(livroCompleto);
            res.status(201).json({ 
                    message: "Livro adicionado com sucesso",
                    livro: novoLivroCriado
                })
        } catch (error) {
            res
            .status(500).json({
                message: `${error.message} - Falha ao adicionar um livro`
            });
        }
    };

    static async buscarLivro(req, res) {
        try{
            const livroEncontrado = await livro.findById(req.params.id)
            const nomeLivro = livroEncontrado.title
            res
            .status(200).json({
                livro: livroEncontrado,
                message: `O livro ${nomeLivro} foi encontrado!`
            })
        } catch (error) {
            res.status(500).json({
                message: `Erro na requisição: ${error.message}`
            })
        }
    };

    static async alterarLivro(req, res) {
        try{
            const livroAlterado = await livro.findByIdAndUpdate(
                req.params.id,
                {title: req.body.title},
                {new: true}
            )
            res.status(200).json({
                livro: livroAlterado,
                message: `Livro ${livroAlterado.title} Alterado com sucesso`
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Requisição falhou`
            })
        }
    };

    static async deletarLivro(req, res) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id)
            res.status(200).json({
                livro: livroDeletado,
                message: "Livro deletado."
            })
        } catch (error) {
            res.status(500).json({
                message: `${error.message} - Requisição falhou`
            })
        }

    };

    static async buscarLivroPorEditora(req, res) {
        try{
            const editora = req.query.editora
            const livroDasEditoras = await livro.find({ editora: editora })
            res.status(200).json({
                livros: livroDasEditoras
            })
        } catch(error) {
            res.status(500).json({
                message: `${error.message} - Falha na requisição`
            })
        }
    }


};


export default LivroController;
