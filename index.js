const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Banco de dados simples de filmes
const filmes = {
    ação: [
        "Mad Max: Estrada da Fúria", "John Wick", "Duro de Matar", "Gladiador",
        "Operação Resgate", "Fúria no Asfalto", "Código de Honra", "Velozes e Furiosos",
        "Resgate Impossível", "O Protetor", "Missão Impossível", "Invasão do Subsolo",
        "Ataque Noturno", "Soldado Solitário", "Guerra Urbana", "Falcão de Aço",
        "Batalha Final", "A Última Missão", "Operação Sombra", "Exército de Elite",
        "Corrida Contra o Tempo", "Herói Anônimo", "Ataque Relâmpago", "Operação Implacável",
        "O Resgate", "Combate Extremo", "Fúria Indomável", "Vingança Letal",
        "Ação Total", "Operação Tempestade", "Fúria do Dragão", "Última Linha de Defesa",
        "Rota da Fúria", "Impacto Mortal", "Fogo Cruzado", "Força Bruta",
        "Operação Centelha", "Velozes na Escuridão", "Contra-Ataque", "Fúria Urbana",
        "Guerra de Titãs", "Missão Implacável", "Batalha de Titãs", "Operação Fênix",
        "Ataque Implacável", "Resgate Total", "Força de Ação", "Operação Justiça",
        "Rasgo de Aço", "A Batalha Final"
    ],
    comédia: [
        "Superbad", "Se Beber, Não Case!", "As Branquelas", "Gente Grande",
        "Tira a Mão Dessa", "A Grande Comédia", "Risadas Garantidas", "Festa de Risos",
        "Comédia de Erros", "Noites de Gargalhada", "O Melhor da Comédia", "Humor Sem Limites",
        "Pé na Jaca", "Rindo à Toa", "Sorriso Contagiante", "A Comédia da Vida",
        "Engraçados e Divertidos", "No Humor da Cidade", "Alegria Total", "Risada Incontrolável",
        "A Piada do Momento", "Humor em Alta", "Os Engraçados", "Diversão Garantida",
        "Risos e Confusões", "Comédia Sem Fim", "O Riso da Sorte", "Histórias Engraçadas",
        "Aventuras Cômicas", "Mistério Divertido", "Rindo Até Cair", "A Festa do Riso",
        "Humor na Veia", "Comédia Surreal", "Risadas da Noite", "Confusões e Gargalhadas",
        "Humor e Trapalhadas", "O Show dos Engraçados", "A Comédia Improvável", "Risada Final",
        "Engraçado Demais", "A comédia do cotidiano", "A Riso de Ouro", "Humor em Dose Dupla",
        "Risos em Série", "Confusão Cômica", "Humor em Movimento", "O Riso é o Melhor Remédio",
        "Comédia Extrema", "Os Reis da Comédia"
    ],
    drama: [
        "À Espera de um Milagre", "Clube da Luta", "Forrest Gump", "O Curioso Caso de Benjamin Button",
        "Caminhos da Vida", "Sombras do Passado", "O Peso da Verdade", "Coração Partido",
        "Além do Horizonte", "Dias de Chuva", "A Última Promessa", "Segredos da Alma",
        "Vidas Entrelaçadas", "Histórias de Amor", "O Silêncio das Palavras", "A Dor do Adeus",
        "Entre Dois Mundos", "Caminhos Cruzados", "A Jornada Interior", "Memórias Esquecidas",
        "Fragmentos de Esperança", "Vozes do Passado", "O Olhar Profundo", "Marcas do Destino",
        "Laços de Família", "Entre Sombras e Luz", "A Caminhada", "Ecos do Coração",
        "O Fardo da Verdade", "Dias Inesquecíveis", "Coração Valente", "Destino Inesperado",
        "História de Um Sonho", "O Último Suspiro", "Caminho da Redenção", "Rostos da Vida",
        "Lágrimas no Olhar", "Sussurros do Silêncio", "Entre a Vida e a Morte", "Encontros e Despedidas",
        "A Cura da Dor", "O Chamado do Coração", "Vidas em Transformação", "A Força do Amor",
        "Além da Esperança", "O Despertar", "A Última Carta", "O Eco do Tempo",
        "Sombras do Destino", "Reflexos da Alma"
    ],
    ficção: [
        "Interestelar", "Blade Runner 2049", "A Origem", "Matrix",
        "Planeta dos Macacos", "2001: Uma Odisséia no Espaço", "A Guerra dos Mundos", "Inception",
        "O Quinto Elemento", "Avatar", "Distrito 9", "Ex Machina",
        "Aniquilação", "O Homem Duplicado", "Looper: Assassinos do Futuro", "Transcendence",
        "Efeito Borboleta", "No Limite do Universo", "Fim dos Tempos", "Cronos",
        "Além do Tempo", "Viagem ao Centro da Terra", "O Universo Paralelo", "Mundos Conectados",
        "Realidade Alternativa", "Além da Realidade", "Dimensão Desconhecida", "O Portal do Tempo",
        "Universo Infinito", "O Enigma do Espaço", "Céus de Fogo", "Horizonte de Eventos",
        "A Máquina do Tempo", "O Caminho Estelar", "Fronteiras do Infinito", "Mente Quântica",
        "Realidade Fragmentada", "O Labirinto do Tempo", "Vórtice Espacial", "O Olho do Cosmos",
        "A Última Fronteira", "Ruptura Temporal", "Mundos em Colisão", "Horizonte Desconhecido",
        "Entre Galáxias", "O Segredo do Universo", "Estrelas em Guerra", "Ecos do Espaço",
        "A Conexão", "Fragmentos de Realidade"
    ],
    terror: [
        "O Exorcista", "Invocação do Mal", "Halloween", "It: A Coisa",
        "A Noite dos Mortos-Vivos", "O Massacre da Serra Elétrica", "A Morte do Silêncio", "Sussurros na Escuridão",
        "Casa Assombrada", "O Ritual", "A Vingança do Espírito", "Pesadelo em Elm Street",
        "A Maldição", "Sombras da Morte", "O Despertar dos Mortos", "O Espírito da Noite",
        "A Sombra", "Entre o Medo e a Loucura", "O Segredo da Mansão", "Noite de Terror",
        "A Última Vigília", "Assombração", "O Grito", "O Silêncio Assustador",
        "O Hospício", "O Legado", "Sangue Frio", "O Ritual Proibido",
        "Ecos do Mal", "A Dama de Branco", "O Chamado", "Noite Sem Fim",
        "O Cemitério", "A Presença", "A Marca do Mal", "A Casa do Terror",
        "O Pacto", "Vulto na Escuridão", "O Crepúsculo", "O Último Suspiro",
        "O Abismo", "Caminho da Morte", "A Sombra do Medo", "Vozes da Morte",
        "O Labirinto Macabro", "Fúria dos Mortos", "O Despertar do Mal", "Sombras do Passado",
        "O Inominável", "A Última Chamada"
    ]
};

// Objeto para armazenar o histórico das conversas (por identificador)
const conversas = {};

// Atualiza o histórico da conversa com uma nova resposta
function atualizarConversa(id, resposta) {
    if (!conversas[id]) {
        conversas[id] = { respostas: new Set() };
    }
    conversas[id].respostas.add(resposta);
}

// Função para extrair um pedido do tipo "3 filmes de ação"
// O regex procura o padrão em qualquer parte da mensagem.
function extrairPedido(mensagem) {
    // Removendo conectores que possam atrapalhar (por exemplo, "e", ",")
    const textoLimpo = mensagem.replace(/\b(e|,)\b/gi, ' ');
    const regex = /(\d+)\s*filmes?\s*(?:de|para|d[êé])\s*(ação|comédia|drama|ficção|terror)/i;
    const match = textoLimpo.match(regex);
    if (match) {
        const quantidade = parseInt(match[1], 10);
        const categoria = match[2].toLowerCase();
        if (filmes[categoria]) {
            return { categoria, quantidade };
        }
    }
    return null;
}

// Lista de palavras que indicam pedidos de recomendação
const palavrasPedido = [
    "indique", "me indique", "me dê", "me mostre", "quero ver", "quero assistir", "sugira", "dê uma sugestão", "indica", "me de"
];

// Função para detectar se a mensagem é um pedido simples (sem quantidade explícita)
function isPedidoSimples(mensagem) {
    const contemPedido = palavrasPedido.some(palavra => mensagem.includes(palavra));
    const categoriaEncontrada = Object.keys(filmes).find(cat =>
        new RegExp(`\\b${cat}\\b`, "i").test(mensagem)
    );
    return contemPedido && !!categoriaEncontrada;
}

// Função para gerar sugestões para uma categoria sem repeti-las na conversa
function gerarRespostasCategoria(id, categoria, quantidade) {
    const opcoes = filmes[categoria];
    let respostas = [];
    // Filtra as opções ainda não usadas na conversa
    let opcoesNovas = opcoes.filter(filme => {
        const resp = `Que tal assistir "${filme}"? 🎬`;
        return !conversas[id].respostas.has(resp);
    });
    // Se não houver opções novas suficientes, utiliza todas as disponíveis
    if (opcoesNovas.length < quantidade) {
        opcoesNovas = [...opcoes];
    }
    // Seleciona aleatoriamente as sugestões
    for (let i = 0; i < quantidade; i++) {
        if (opcoesNovas.length === 0) break;
        const index = Math.floor(Math.random() * opcoesNovas.length);
        const filmeEscolhido = opcoesNovas.splice(index, 1)[0];
        respostas.push(`Que tal assistir "${filmeEscolhido}"? 🎬`);
    }
    return respostas;
}

// Rota de teste
app.get('/', (req, res) => {
    res.send('Chatbot de Filmes está online!');
});

// Endpoint /sugestao para teste individual (via query string)
app.get('/sugestao', (req, res) => {
    const categoria = req.query.categoria?.toLowerCase();
    if (!categoria || !filmes[categoria]) {
        return res.status(400).json({
            erro: "Categoria inválida ou não informada.",
            categorias_disponiveis: Object.keys(filmes)
        });
    }
    const idTeste = req.ip;
    if (!conversas[idTeste]) {
        conversas[idTeste] = { respostas: new Set() };
    }
    const respostas = gerarRespostasCategoria(idTeste, categoria, 1);
    const resposta = respostas[0];
    atualizarConversa(idTeste, resposta);
    res.json({
        mensagem: `Aqui está uma sugestão de filme na categoria "${categoria}":`,
        sugestao: resposta
    });
});

// Endpoint do chatbot para processar mensagens
app.post('/chatbot', (req, res) => {
    try {
        const mensagem = req.body.mensagem?.toLowerCase();
        // Identifica a conversa usando idUsuario ou req.ip
        const idConversa = req.body.idUsuario || req.ip;
        if (!mensagem) {
            return res.status(400).json({ erro: "Nenhuma mensagem recebida." });
        }
        if (!conversas[idConversa]) {
            conversas[idConversa] = { respostas: new Set() };
        }
        
        let respostaGerada = "";
        
        // Primeiro, verifica se a mensagem contém um pedido numérico, ex: "3 filmes de ação"
        const pedido = extrairPedido(mensagem);
        if (pedido) {
            const { categoria, quantidade } = pedido;
            const respostas = gerarRespostasCategoria(idConversa, categoria, quantidade);
            respostas.forEach(resp => atualizarConversa(idConversa, resp));
            return res.json({ resposta: { [categoria]: respostas } });
        }
        
        // Se não houver pedido numérico, verifica se é um pedido simples (variações)
        if (isPedidoSimples(mensagem)) {
            const categoriaEncontrada = Object.keys(filmes).find(cat =>
                new RegExp(`\\b${cat}\\b`, "i").test(mensagem)
            );
            if (categoriaEncontrada) {
                const respostas = gerarRespostasCategoria(idConversa, categoriaEncontrada, 1);
                respostaGerada = respostas[0];
                atualizarConversa(idConversa, respostaGerada);
                return res.json({ resposta: respostaGerada });
            }
        }
        
        // Em seguida, verifica se a mensagem é uma saudação
        if (mensagem.includes("olá") || mensagem.includes("oi") || mensagem.includes("ola") || mensagem.includes("oie")) {
            respostaGerada = "Olá! Para receber uma sugestão, informe a categoria desejada (ação, comédia, drama, ficção ou terror), ou um pedido como 'Me indique 3 filmes de ação'.";
            atualizarConversa(idConversa, respostaGerada);
            return res.json({ resposta: respostaGerada });
        }
        
        // Se mencionar "filme" ou "sugestão" sem indicar categoria
        if (mensagem.includes("filme") || mensagem.includes("sugestão")) {
            respostaGerada = "Por favor, informe a categoria desejada (ação, comédia, drama, ficção ou terror) ou um pedido como 'Me indique 3 filmes de ação'.";
            atualizarConversa(idConversa, respostaGerada);
            return res.json({ resposta: respostaGerada });
        }
        
        // Caso não entenda a mensagem
        respostaGerada = "Desculpe, não entendi sua solicitação. Informe uma categoria ou um pedido como 'Me indique 3 filmes de ação'.";
        atualizarConversa(idConversa, respostaGerada);
        return res.json({ resposta: respostaGerada });
    } catch (error) {
        console.error("Erro no endpoint /chatbot:", error);
        return res.status(500).json({ erro: "Erro interno do servidor." });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
