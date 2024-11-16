const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/user');

const app = express();
const PORT = 5000;

// Middleware para interpretar JSON
app.use(express.json());

app.use(cors())

// Conectar ao MongoDB
const MONGO_URI = 'mongodb+srv://pguerra872:12345@library.rh7qd.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca_somativa'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err.message))

// Rotas
app.use('/books', booksRoutes); // Rota de livros
app.use('/user', usersRoutes);  // Rota de usuários

// Endpoint padrão
app.get('/', (req, res) => {
    res.send('Bem-vindo à API!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}/`);
});
