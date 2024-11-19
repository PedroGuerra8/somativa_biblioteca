const express = require('express');
const router = express.Router();
const bookSchema = require("../models/books")

// GET /books
router.get('/books', async (req, res) => {
    try {
        const books = await bookSchema.find();  // Recupera todos os livros do banco
        res.status(200).json(books);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ error: 'Erro ao buscar livros no banco de dados' });
    }
});

// POST /books
router.post('/', async (req, res) => {
    const { title, author, year, image } = req.body;
    console.log(title, author, year,);
    
    // Validação simples dos dados
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Título, autor e ano são obrigatórios' });
    }

    try {
        const newBook = new bookSchema({ title, author, year, image });
        await newBook.save();
        res.status(201).json({ message: 'Livro criado com sucesso!', book: newBook });
    } catch (error) {   
        console.error('Erro ao salvar livro:', error);
        res.status(500).json({ error: 'Erro ao salvar livro no banco de dados' });
    }
});

// PUT /books/:id
router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, year, image } = req.body;

    // Validação dos dados
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Título, autor e ano são obrigatórios' });
    }

    try {
        const updatedBook = await bookSchema.findByIdAndUpdate(id, { title, author, year, image }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro atualizado com sucesso!', book: updatedBook });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ error: 'Erro ao atualizar livro no banco de dados' });
    }
});

// DELETE /books/:id
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await bookSchema.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso!', book: deletedBook });
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ error: 'Erro ao deletar livro no banco de dados' });
    }
});

module.exports = router;
