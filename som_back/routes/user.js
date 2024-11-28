const express = require('express');
const authController = require('../controllers/authController');
const User = require('../models/user');
const router = express.Router();

// REGISTRO DE USUARIO
router.post('/', authController.register);

// LOGIN DO USUARIO
router.post('/', authController.login);

// GET /user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();  // Consulta todos os usuários
        res.status(200).json(users);  // Envia os usuários como resposta
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar os usuários' });
    }
});


// POST /user
router.post('/', (req, res) => {
    res.send('Usuário cadastrado');
});

// PUT /user/:id
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;

    // Criação de um objeto com os campos a serem atualizados
    const updatedFields = {};
    
    // Verificando se cada campo foi enviado e adicionando ao objeto de atualização
    if (username) updatedFields.username = username;
    if (password) updatedFields.password = password;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields }, // Atualiza somente os campos que foram enviados
            { new: true }
        );

        // Caso o usuário não seja encontrado
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Retorna o usuário atualizado
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', User: updatedUser });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário no banco de dados' });
    }
});

// DELETE /user/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);  // Deleta o usuário com o id fornecido

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });  // Caso o usuário não exista
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });  // Resposta de sucesso
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error });  // Em caso de erro no banco de dados
    }
});

module.exports = router;
