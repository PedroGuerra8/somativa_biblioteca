const express = require('express');
const router = express.Router();

// GET /books
router.get('/', (req, res) => {
    res.send('Lista de livros');
});

// POST /books
router.post('/', (req, res) => {
    res.send('Novo Livro Cadastrado!');
});

// PUT books
router.put('/', (req, res) => {
    res.send('Livro Atualizado!');
});

// DELETE books
router.delete('/', (req, res) => {
    res.send('Livro Deletado!');
});

module.exports = router;
