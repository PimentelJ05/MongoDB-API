import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listAllPosts(req, res) {
  // Chama a função para obter os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia uma resposta com status 200 (OK) e os posts no formato JSON
  res.status(200).json(posts);
}

//função para criar um post
export async function postAllPosts(req, res) { 
  const newPost = req.body;
  try {
    const postCriado = await criarPost(newPost);
    res.status(200).json(postCriado); // Utilizando status 201 (Created) para indicar criação bem-sucedida
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requsição"})
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
  };

  try  {
      const postCriado = await criarPost(novoPost);
      const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)
      res.status(200).json(postCriado);  
  } catch(erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res) { 
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;


  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    } // um objeto com as informações de um novo post

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado); // Utilizando status 201 (Created) para indicar criação bem-sucedida
  } catch (error) {
    console.error(error.message);
    res.status(500).json({"Erro":"Falha na requsição"})
  }
}