const express = require('express');
const router = express.Router();
const bookSchema = require("../models/books");
const books = require('../models/books');

// Rota GET para listar todos os livros
router.get('/', async (req, res) => {
    try {
        const books = await bookSchema.find();  // Consulta todos os livros
        res.status(200).json(books);  // Envia os livros como resposta
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ message: 'Erro ao buscar os livros', error });
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
router.put('/:id', async (req, res) => {
    const { title, author, year, image } = req.body;

    // Criação de um objeto com os campos a serem atualizados
    const updatedFields = {};
    
    // Verificando se cada campo foi enviado e adicionando ao objeto de atualização
    if (title) updatedFields.title = title;
    if (author) updatedFields.author = author;
    if (year) updatedFields.year = year;
    if (image) updatedFields.image = image;

    try {
        const updatedBook = await bookSchema.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields }, // Atualiza somente os campos que foram enviados
            { new: true }
        );

        // Caso o livro não seja encontrado
        if (!updatedBook) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        // Retorna o livro atualizado
        res.status(200).json({ message: 'Livro atualizado com sucesso!', book: updatedBook });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ error: 'Erro ao atualizar livro no banco de dados' });
    }
});


// DELETE /books/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await bookSchema.findByIdAndDelete(req.params.id);  // Deleta o livro com o id fornecido

        if (!deletedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });  // Caso o livro não exista
        }

        res.status(200).json({ message: 'Livro deletado com sucesso' });  // Resposta de sucesso
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({ message: 'Erro ao deletar livro', error });  // Em caso de erro no banco de dados
    }
});

module.exports = router;
