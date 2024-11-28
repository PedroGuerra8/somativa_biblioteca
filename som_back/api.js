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
app.use('/api/user', usersRoutes);  // Rota de usuários

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});
