import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res, next) {
        try {
            const listaLivro = await livro.find({})
            res.status(200).json(listaLivro)
        } catch (erro) {
            next(erro)
        }
    };

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if(!autorEncontrado) {
                return res.status(404).send("Autor não encontrado para cadastrar o livro!")
            }
            const livroCompleto = {
                ...novoLivro, 
                autor: { ...autorEncontrado._doc}
            };
            const novoLivroCriado = await livro.create(livroCompleto);
            
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
            const livroEncontrado = await livro.findById(req.params.id)
            const nomeLivro = livroEncontrado.title
            res
            .status(200).json({
                livro: livroEncontrado,
                message: `O livro ${nomeLivro} foi encontrado!`
            })
        } catch (erro) {
            next(erro)
        }
    };

    static async alterarLivro(req, res, next) {
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
        } catch (erro) {
            next(erro)
        }
    };

    static async deletarLivro(req, res, next) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id)
            res.status(200).json({
                livro: livroDeletado,
                message: "Livro deletado."
            })
        } catch (erro) {
            next(erro)
        }

    };

    static async buscarLivroPorEditora(req, res, next) {
        try{
            const editora = req.query.editora
            const livroDasEditoras = await livro.find({ editora: editora })
            res.status(200).json({
                livros: livroDasEditoras
            })
        } catch(erro) {
            next(erro)
        }
    }


};


export default LivroController;
