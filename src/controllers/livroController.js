import NotFound from "../erros/NotFound.js";
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
            if (!autorEncontrado) {
                return next(new NotFound("É necessário um autor para cadastrar um livro!"));
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
            const livroAlterado = await livro.findByIdAndUpdate(id, req.body, {new: true})
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
            const livroDeletado = await livro.findByIdAndDelete(req.params.id)
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

    static async buscarLivroPorEditora(req, res, next) {
        try{
            const editora = req.query.editora
            const livroDasEditoras = await livro.find({ editora: editora })
            if( !livroDasEditoras) {
                return next(new NotFound("Não foi encontrado nenhum livro dessa editora!"))
            }

            res.status(200).json({
                livros: livroDasEditoras
            })
        } catch(erro) {
            next(erro)
        }
    }


};


export default LivroController;
