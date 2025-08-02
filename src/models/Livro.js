import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Título obrigatório"] },
    editora: { 
        type: String,
        enum: {
            values: ["Wizard", "Jambo"],
            message: "A editora {VALUE} não é valida!"
        }
     },
    preco: { type: Number },
    paginas: { 
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 5000;
            },
            message: "O número de páginas deve ser entre 10 a 5000. Valor inserido {VALUE}"
        }
     },
    autor: {type: autorSchema, required: [true, "Para cadastrar um livro é necessário um autor!"]}
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;