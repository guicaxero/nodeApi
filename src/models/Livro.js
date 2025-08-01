import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Título obrigatório"] },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {type: autorSchema, required: [true, "Para cadastrar um livro é necessário um autor!"]}
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;