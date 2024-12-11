const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
        res.status(201).json({ usernamme: user.username });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
