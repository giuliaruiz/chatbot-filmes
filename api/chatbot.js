export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ erro: "Método não permitido. Use POST." });
    }

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

    const mensagem = req.body.mensagem?.toLowerCase();
    if (!mensagem) {
        return res.status(400).json({ erro: "Nenhuma mensagem recebida." });
    }

    const regex = /(\d+)?\s*filmes?\s*(?:de|para|d[êé])\s*(ação|comédia|drama|ficção|terror|romance|animação|suspense|musical)/i;
    const match = mensagem.match(regex);
    
    if (!match) {
        return res.json({ resposta: "Não entendi seu pedido. Tente algo como '3 filmes de ação'." });
    }

    const quantidade = parseInt(match[1] || 1, 10);
    const categoria = match[2].toLowerCase();

    if (!filmes[categoria]) {
        return res.json({ resposta: "Essa categoria não existe." });
    }

    const sugestoes = filmes[categoria].sort(() => 0.5 - Math.random()).slice(0, quantidade);
    res.json({ resposta: `Sugestão de filmes de ${categoria}: ${sugestoes.join(", ")}` });
}
