const express = require('express');
const serverless = require('serverless-http');
const app = express();

const port = process.env.PORT || 3000; // Não será utilizado, mas pode ficar para testes locais

app.use(express.json());

// Seu código de endpoints aqui...
// Exemplo:
app.post('/chatbot', (req, res) => {
    // Sua lógica do chatbot...
    res.json({ resposta: "Resposta do chatbot" });
});

// Se você precisar de outros endpoints, adicione-os aqui

// Exporta o app wrapped em uma função serverless
module.exports.handler = serverless(app);
