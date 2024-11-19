const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// REGISTRO DE USUARIO
router.post('/user', authController.register);

// LOGIN DO USUARIO
router.post('/user', authController.login);

// GET /user
router.get('./user', (req, res) => {
    res.send('Usuário encontrado');
});

// POST /user
router.post('/user', (req, res) => {
    res.send('Usuário cadastrado');
});

// PUT /user
router.put('/user', (req, res) => {
    res.send('Usuário Atualizado');
});

// DELETE /user
router.delete('/user', (req, res) => {
    res.send('Usuário Deletado');
});

module.exports = router;
