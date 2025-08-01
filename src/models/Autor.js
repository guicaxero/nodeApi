import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, "O nome é do autor(a) obrigatório!"] },
    idade: { type: Number }
}, {versionKey: false});

const autor = mongoose.model("autores", autorSchema)


export {autor, autorSchema}