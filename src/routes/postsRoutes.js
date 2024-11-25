//Tudo que for responsabilidade da rota vai ficar aqui

import express from "express";
import multer from "multer";
import { listAllPosts, postAllPosts, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest: "./uploads", storage})


const routes = (app) => {
app.use(express.json()); // Permite que o servidor entenda dados enviados em formato JSON

app.use(cors(corsOptions));

// Rota para obter todos os postss
app.get("/posts", listAllPosts);
// Rota para criar um novo post
app.post("/posts", postAllPosts);
app.post("/upload", upload.single("imagem"), uploadImagem);
// rota para atualizar um post
app.put("/upload/:id", atualizarNovoPost)
}

export default routes; 

