const express = require('express');
const connectDB = require('./config/db')
const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/user');

const app = express();
const PORT = 5000;

// Middleware para interpretar JSON
app.use(express.json());

// Conectar ao MongoDB
connectDB();

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
