const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const mongoose = require('mongoose');


// GET /books
router.get('/books', (req, res) => {
    res.send('Lista de livros');
});

// POST /books
router.post('/', async (req, res) => {
    const { title, author, year, image } = req.body;

    try {
        const newBook = new Book({ title, author, year, image });
        await newBook.save();
        res.status(201).json({ message: 'Livro criado com sucesso!', book: newBook });
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
        res.status(500).json({ error: 'Erro ao salvar livro no banco de dados' });
    }
});

// PUT books
router.put('/books', (req, res) => {
    res.send('Livro Atualizado!');
});

// DELETE books
router.delete('/books', (req, res) => {
    res.send('Livro Deletado!');
});

module.exports = router;

