const express = require('express');
const router = express.Router();
const bookSchema = require("../models/books");
const books = require('../models/books');

// GET /books
router.get('/',async(req,res)=>{
    try{
        const books = await bookSchema.find(); // busca todos os livros com o metódo find
        res.status(200).json(books) // retorna a lista de livros
    }catch(error){
        res.status(500).json({message: 'Erro ao buscar os livros ',error}) // retorna o erro se houver
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

    // Validação dos dados
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Título, autor e ano são obrigatórios' });
    }

    try {
        const updatedBook = await bookSchema.findByIdAndUpdate(req.params.id,{ title, author, year, image }, { new: true });
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
router.delete('/api/books/:id',async(req,res)=>{
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Livro deletado com sucesso'});
    }catch(error){
        res.status(500).json({message:'Erro ao deletar livro',error});
    }

})

module.exports = router;
