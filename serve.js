// Criando nosso servidor

import express from "express"; // Importa a biblioteca Express para criar o servidor web
import 'dotenv/config'; // Carrega as variáveis de ambiente a partir do arquivo .env
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do Express para iniciar o servidor

app.use(express.static("uploads")); //servir arquivos estaticos 

routes(app);

// Define a porta em que o servidor irá escutar
app.listen(3000, () => {
    console.log("Servidor escutando...");
});





// para acessar: localhost:3000/posts 