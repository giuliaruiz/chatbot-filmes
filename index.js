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
    ],
    romance: [
        "Orgulho e Preconceito", "Diário de uma Paixão", "Como Eu Era Antes de Você", "Simplesmente Acontece", 
        "Um Lugar Chamado Notting Hill", "Amor à Segunda Vista", "O Melhor de Mim", "P.S. Eu Te Amo", 
        "Questão de Tempo", "A Culpa é das Estrelas", "Me Chame Pelo Seu Nome", "Um Amor para Recordar", 
        "Cartas para Julieta", "Antes do Amanhecer", "Antes do Pôr do Sol", "Antes da Meia-Noite", 
        "O Segredo de Brokeback Mountain", "500 Dias com Ela", "Adoráveis Mulheres", "Titanic", 
        "O Lado Bom da Vida", "Amor & Outras Drogas", "A Proposta", "O Casamento do Meu Melhor Amigo", 
        "Um Porto Seguro", "Simplesmente Amor", "O Amor Não Tira Férias", "Orgulho & Sedução", 
        "Um Dia", "Ghost: Do Outro Lado da Vida", "Jerry Maguire: A Grande Virada", "O Guarda-Costas", 
        "Um Senhor Estagiário", "Comer, Rezar, Amar", "Tudo e Todas as Coisas", 
        "A Sociedade Literária e a Torta de Casca de Batata", "O Sol Também É Uma Estrela", 
        "Retrato de uma Jovem em Chamas", "Razão e Sensibilidade", "A Casa do Lago", 
        "O Melhor Amigo da Noiva", "Doentes de Amor", "Para Todos os Garotos que Já Amei", 
        "Ricos de Amor", "Nasce Uma Estrela", "Querido John", "Amor à Primeira Vista", 
        "Dois é Bom, Três é Demais", "Enquanto Você Dormia", "Afinado no Amor"
    ],
    animação: [
        "Toy Story", "O Rei Leão", "Shrek", "Procurando Nemo", "Divertida Mente", "A Viagem de Chihiro", 
        "Up - Altas Aventuras", "O Estranho Mundo de Jack", "Ratatouille", "WALL-E", "Monstros S.A.", 
        "A Bela e a Fera", "Encanto", "Como Treinar o Seu Dragão", "Mogli: O Menino Lobo", 
        "Meu Malvado Favorito", "O Menino e o Mundo", "Coraline e o Mundo Secreto", "Frozen", 
        "O Serviço de Entregas da Kiki", "O Túmulo dos Vagalumes", "Princesa Mononoke", 
        "O Castelo Animado", "Os Incríveis", "Viva - A Vida é uma Festa", "Madagascar", 
        "Kung Fu Panda", "Luca", "Super Mario Bros: O Filme", "Elementos", "Pinóquio", 
        "O Gigante de Ferro", "Detona Ralph", "Zootopia", "A Era do Gelo", "Os Croods", 
        "O Pequeno Príncipe", "Uma Aventura Lego", "Tá Chovendo Hambúrguer", 
        "Sing: Quem Canta Seus Males Espanta", "As Aventuras de Tintim", 
        "O Lorax: Em Busca da Trúfula Perdida", "O Bom Dinossauro", "O Rei Leão (2019)", 
        "Enrolados", "Moana", "Pets: A Vida Secreta dos Bichos", "Homem-Aranha no Aranhaverso", 
        "Lightyear", "Bob Esponja: O Filme"
    ],
    suspense: [
        "Seven: Os Sete Crimes Capitais", "O Sexto Sentido", "Iluminado", "O Silêncio dos Inocentes", 
        "Ilha do Medo", "Clube da Luta", "Psicose", "Corra!", "Cisne Negro", "O Homem Invisível", 
        "Pânico", "Fragmentado", "Bird Box", "O Chamado", "Um Lugar Silencioso", "Hereditário", 
        "O Poço", "Parasita", "Mãe!", "A Órfã", "O Jogo", "O Presente", "O Sequestro do Metrô 123", 
        "Intriga Internacional", "O Exorcista", "Prenda-me se For Capaz", "Oldboy", "Identidade", 
        "Mistério no Mediterrâneo", "O Código Da Vinci", "Os Outros", "O Nevoeiro", "Zodíaco", 
        "A Vila", "O Colecionador de Ossos", "O Grito", "A Chave Mestra", "O Hospedeiro", 
        "Não! Não Olhe!", "Janela Indiscreta", "Presságio", "O Espião que Sabia Demais", 
        "Perigo por Encomenda", "O Poço", "Telefone Preto", "As Viúvas", "Freaks", 
        "A Garota no Trem", "Tempo", "O Pacto"
    ],
    musical: [
        "O Rei do Show", "La La Land: Cantando Estações", "Mamma Mia!", "Os Miseráveis", "Grease: Nos Tempos da Brilhantina", 
        "O Fantasma da Ópera", "Caminhos da Floresta", "Moulin Rouge!", "Chicago", "High School Musical", 
        "A Noviça Rebelde", "Encantada", "A Bela e a Fera", "Cats", "West Side Story", "O Estranho Mundo de Jack", 
        "Sweeney Todd: O Barbeiro Demoníaco da Rua Fleet", "Frozen", "Hairspray", "Hamilton", 
        "Sing - Quem Canta Seus Males Espanta", "Viva - A Vida é uma Festa", "Rocketman", "Bohemian Rhapsody", 
        "Aladdin", "O Rei Leão", "Trolls", "Burlesque", "Os Saltimbancos Trapalhões", "A Pequena Sereia", 
        "O Mágico de Oz", "Tick, Tick... Boom!", "Mary Poppins", "Cantando na Chuva", "Dançando no Escuro", 
        "A Escola do Rock", "Into the Woods", "Judy: Muito Além do Arco-Íris", "Amor, Sublime Amor", 
        "A Fantástica Fábrica de Chocolate", "Descendentes", "José: O Rei dos Sonhos", "O Caminho para El Dorado", 
        "The Rocky Horror Picture Show", "Hercules", "Os Smurfs: A Vila Perdida", "Os Muppets", "Bingo: O Rei das Manhãs", 
        "Hair", "A Vida é uma Festa"
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

// Mapeamento de números escritos por extenso para seus equivalentes numéricos
const numerosPorExtenso = {
  "um": 1,
  "uma": 1,
  "dois": 2,
  "duas": 2,
  "três": 3,
  "quatro": 4,
  "cinco": 5,
  "seis": 6,
  "sete": 7,
  "oito": 8,
  "nove": 9,
  "dez": 10,
  "onze": 11,
  "doze": 12,
  "treze": 13,
  "quatorze": 14,
  "quinze": 15,
  "dezesseis": 16,
  "dezessete": 17,
  "dezoito": 18,
  "dezenove": 19,
  "vinte": 20,
  "vinte e um": 21,
  "vinte e dois": 22,
  "vinte e três": 23,
  "vinte e quatro": 24,
  "vinte e cinco": 25,
  "vinte e seis": 26,
  "vinte e sete": 27,
  "vinte e oito": 28,
  "vinte e nove": 29,
  "trinta": 30,
  "trinta e um": 31,
  "trinta e dois": 32,
  "trinta e três": 33,
  "trinta e quatro": 34,
  "trinta e cinco": 35,
  "trinta e seis": 36,
  "trinta e sete": 37,
  "trinta e oito": 38,
  "trinta e nove": 39,
  "quarenta": 40,
  "quarenta e um": 41,
  "quarenta e dois": 42,
  "quarenta e três": 43,
  "quarenta e quatro": 44,
  "quarenta e cinco": 45,
  "quarenta e seis": 46,
  "quarenta e sete": 47,
  "quarenta e oito": 48,
  "quarenta e nove": 49,
  "cinquenta": 50,
  "cinquenta e um": 51,
  "cinquenta e dois": 52,
  "cinquenta e três": 53,
  "cinquenta e quatro": 54,
  "cinquenta e cinco": 55,
  "cinquenta e seis": 56,
  "cinquenta e sete": 57,
  "cinquenta e oito": 58,
  "cinquenta e nove": 59,
  "sessenta": 60,
  "sessenta e um": 61,
  "sessenta e dois": 62,
  "sessenta e três": 63,
  "sessenta e quatro": 64,
  "sessenta e cinco": 65,
  "sessenta e seis": 66,
  "sessenta e sete": 67,
  "sessenta e oito": 68,
  "sessenta e nove": 69,
  "setenta": 70,
  "setenta e um": 71,
  "setenta e dois": 72,
  "setenta e três": 73,
  "setenta e quatro": 74,
  "setenta e cinco": 75,
  "setenta e seis": 76,
  "setenta e sete": 77,
  "setenta e oito": 78,
  "setenta e nove": 79,
  "oitenta": 80,
  "oitenta e um": 81,
  "oitenta e dois": 82,
  "oitenta e três": 83,
  "oitenta e quatro": 84,
  "oitenta e cinco": 85,
  "oitenta e seis": 86,
  "oitenta e sete": 87,
  "oitenta e oito": 88,
  "oitenta e nove": 89,
  "noventa": 90,
  "noventa e um": 91,
  "noventa e dois": 92,
  "noventa e três": 93,
  "noventa e quatro": 94,
  "noventa e cinco": 95,
  "noventa e seis": 96,
  "noventa e sete": 97,
  "noventa e oito": 98,
  "noventa e nove": 99,
  "cem": 100
};

// Array com os números por extenso (deve conter os mesmos termos do mapeamento)
// Ordenado de forma decrescente para capturar termos compostos primeiro.
const numerosExtensoArray = [
  "cem",
  "noventa e nove", "noventa e oito", "noventa e sete", "noventa e seis", "noventa e cinco", "noventa e quatro", "noventa e três", "noventa e dois", "noventa e um", "noventa",
  "oitenta e nove", "oitenta e oito", "oitenta e sete", "oitenta e seis", "oitenta e cinco", "oitenta e quatro", "oitenta e três", "oitenta e dois", "oitenta e um", "oitenta",
  "setenta e nove", "setenta e oito", "setenta e sete", "setenta e seis", "setenta e cinco", "setenta e quatro", "setenta e três", "setenta e dois", "setenta e um", "setenta",
  "sessenta e nove", "sessenta e oito", "sessenta e sete", "sessenta e seis", "sessenta e cinco", "sessenta e quatro", "sessenta e três", "sessenta e dois", "sessenta e um", "sessenta",
  "cinquenta e nove", "cinquenta e oito", "cinquenta e sete", "cinquenta e seis", "cinquenta e cinco", "cinquenta e quatro", "cinquenta e três", "cinquenta e dois", "cinquenta e um", "cinquenta",
  "quarenta e nove", "quarenta e oito", "quarenta e sete", "quarenta e seis", "quarenta e cinco", "quarenta e quatro", "quarenta e três", "quarenta e dois", "quarenta e um", "quarenta",
  "trinta e nove", "trinta e oito", "trinta e sete", "trinta e seis", "trinta e cinco", "trinta e quatro", "trinta e três", "trinta e dois", "trinta e um", "trinta",
  "vinte e nove", "vinte e oito", "vinte e sete", "vinte e seis", "vinte e cinco", "vinte e quatro", "vinte e três", "vinte e dois", "vinte e um", "vinte",
  "dezenove", "dezoito", "dezessete", "dezesseis", "quinze", "quatorze", "treze", "doze", "onze",
  "dez", "nove", "oito", "sete", "seis", "cinco", "quatro", "três", "duas", "dois", "uma", "um"
];

// Cria dinamicamente o grupo para a regex
const numerosExtensoGroup = numerosExtensoArray.map(str => str.replace(/ /g, "\\s+")).join("|");

// Função para extrair um pedido do tipo "3 filmes de ação" ou "três filmes de comédia"
// A regex captura tanto números em dígitos quanto números escritos por extenso.
function extrairPedido(mensagem) {
    // Removendo apenas as vírgulas, mantendo os espaços
    const textoLimpo = mensagem.replace(/,/g, ' ');
    // Regex:
    // - Captura opcionalmente um número em dígitos ou um número por extenso, com limites de palavra.
    // - Em seguida, torna "filme(s)" e o conector opcional, e captura a categoria.
    const regex = new RegExp(`\\b((-?\\d+)|(${numerosExtensoGroup}))\\b\\s*(?:filmes?\\s*)?(?:de|para|d[êé])?\\s*(ação|comédia|drama|ficção|terror|romance|animação|suspense|musical)`, "i");
    const match = textoLimpo.match(regex);
    if (match) {
        let quantidade;
        if (match[2]) {
            // Se for dígito
            quantidade = parseInt(match[2], 10);
        } else if (match[3]) {
            // Se for número por extenso
            const palavra = match[3].toLowerCase();
            quantidade = numerosPorExtenso[palavra];
        } else {
            // Padrão: 1
            quantidade = 1;
        }
        
        // Validação: se a quantidade for inválida (< 1)
        if (!Number.isInteger(quantidade) || quantidade < 1) {
            return { error: "Por favor insira um valor válido!" };
        }
        const categoria = match[4].toLowerCase();
        if (filmes[categoria]) {
            return { categoria, quantidade };
        }
    }
    return null;
}

function extrairPedido(mensagem) {
    // Remove apenas as vírgulas, mantendo os espaços e o "e"
    const textoLimpo = mensagem.replace(/,/g, ' ');
    // Regex:
    // - Captura opcionalmente um número em dígitos (somente dígitos, sem sinal negativo)
    //   ou um número por extenso, com limites de palavra.
    // - Em seguida, torna "filme(s)" e o conector opcional, e captura a categoria.
    const regex = new RegExp(`\\b((\\d+)|(${numerosExtensoGroup}))\\b\\s*(?:filmes?\\s*)?(?:de|para|d[êé])?\\s*(ação|comédia|drama|ficção|terror|romance|animação|suspense|musical)`, "i");
    const match = textoLimpo.match(regex);
    if (match) {
        let quantidade;
        if (match[2]) {
            // Se for dígito (já que não permitimos sinal negativo)
            quantidade = parseInt(match[2], 10);
        } else if (match[3]) {
            // Se for número por extenso
            const palavra = match[3].toLowerCase();
            quantidade = numerosPorExtenso[palavra];
        } else {
            // Padrão: 1
            quantidade = 1;
        }
        
        // Validação: se a quantidade for menor que 1
        if (!Number.isInteger(quantidade) || quantidade < 1) {
            return { error: "por favor insira um valor válido" };
        }
        const categoria = match[4].toLowerCase();
        if (filmes[categoria]) {
            return { categoria, quantidade };
        }
    }
    return null;
}



// Lista de palavras que indicam pedidos de recomendação
const palavrasPedido = [
    "agora", "mais", "outros", "outro", "indique", "me indique", "me dê", "me mostre",
    "quero ver", "quero assistir", "sugira", "dê uma sugestão", "indica", "me de",
    "ação", "comédia", "drama", "ficção", "terror", "romance", "animação", "suspense", "musical"
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
        
        // Primeiro, verifica se a mensagem contém um pedido numérico ou por extenso, ex: "3 filmes de ação" ou "três filmes de comédia"
        const pedido = extrairPedido(mensagem);
        if (pedido) {
            // Se houver erro na extração, retorna a mensagem de erro
            if (pedido.error) {
                return res.json({ resposta: pedido.error });
            }
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
            respostaGerada = "Olá! Para receber uma sugestão, informe uma categoria por vez desejada (ação, comédia, drama, ficção, terror, romance, animação, suspense ou musical), ou um pedido como 'Me indique 3 filmes de ação'.";
            atualizarConversa(idConversa, respostaGerada);
            return res.json({ resposta: respostaGerada });
        }
        
        // Se mencionar "filme" ou "sugestão" sem indicar categoria
        if (mensagem.includes("filme") || mensagem.includes("sugestão")) {
            respostaGerada = "Por favor, informe uma categoria por vez desejada (ação, comédia, drama, ficção, terror, romance, animação, suspense ou musical) ou um pedido como 'Me indique 3 filmes de ação'.";
            atualizarConversa(idConversa, respostaGerada);
            return res.json({ resposta: respostaGerada });
        }
        
        // Caso não entenda a mensagem
        respostaGerada = "Desculpe, não entendi sua solicitação. Informe uma categoria por vez desejada (ação, comédia, drama, ficção, terror, romance, animação, suspense ou musical) ou um pedido como 'Me indique 3 filmes de ação'.";
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
