const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/user');
const path = require('path')



const MONGO_URI = process.env.MONGO_URI; // Obtém a string de conexão do .env

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err.message));

const app = express();
const PORT = 4000;

// Middleware para interpretar JSON
app.use(express.json());

app.use(cors())

const authController = require('./controllers/authController')

// Rotas
app.use('/api/books', booksRoutes); // Rota de livros
app.use('/user', usersRoutes);  // Rota de usuários

// Serve arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});


// Configuração do multer para uploads das imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // define o diretório onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo: uma combinação de timestamp e o nome original
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage: storage});