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

app.post('/purchase', async (req, res) => {
    const { username, items, total } = req.body;

    if (!username || !items || items.length === 0) {
        return res.status(400).json({ message: 'Dados inválidos para a compra' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const purchase = await prisma.purchase.create({
            data: {
                userId: user.id,
                items: JSON.stringify(items),
                total,
                date: new Date(),
            },
        });

        res.status(201).json({ message: 'Compra salva com sucesso', purchase });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar compra', error: error.message });
    }
});

app.get('/history/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Busca as compras do usuário
        const purchases = await prisma.purchase.findMany({
            where: { userId: user.id },
        });

        // Converte itens de volta de JSON para objeto
        const formattedPurchases = purchases.map(purchase => ({
            ...purchase,
            items: JSON.parse(purchase.items),
        }));

        res.status(200).json(formattedPurchases);
    } catch (error) {
        console.error('Erro ao buscar histórico:', error.message);
        res.status(500).json({ message: 'Erro ao buscar histórico', error: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
