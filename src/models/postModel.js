// Tudo que for responsabilidade de modelo vai ficar aqui

import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js" // Importa a função para conectar ao banco de dados

// Conecta ao banco de dados utilizando a string de conexão obtida das variáveis de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Obtém o banco de dados 'Imersão-InstaBytes' e a coleção 'posts'
    const db = conexao.db("Imersão-InstaBytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("Imersão-InstaBytes");
    const colecao = db.collection("posts");
    
    return colecao.insertOne(novoPost);
}

// função para atualizar novo post
export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersão-InstaBytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}
