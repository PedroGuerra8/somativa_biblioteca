const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Book = require("../models/books")

// Registro do usuário
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'Usuário registrado', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Login do usuário
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login realizado com sucesso', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login', error });
    }
};


// controllers/bookController.js
exports.createBook = async (req, res) => {
    const { title, author, year, image } = req.body;

    if (!title || !author || !year) {
        console.log('Erro de validação: Título, autor e ano são obrigatórios');
        return res.status(400).json({ error: 'Título, autor e ano são obrigatórios' });
    }

    try {
        console.log('Criando livro:', req.body);  // Log dos dados recebidos
        const newBook = new Book({ title, author, year, image });
        await newBook.save();
        console.log('Livro criado com sucesso:', newBook);

        res.status(201).json({
            message: 'Livro criado com sucesso!',
            book: newBook
        });
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
        res.status(500).json({ error: 'Erro ao salvar livro no banco de dados' });
    }
};

