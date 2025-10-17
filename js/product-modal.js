/* ========================================
   PRODUCT MODAL - Product Details Display
   ======================================== */

// Get current language (synced with main site language system)
function getCurrentLanguage() {
    return localStorage.getItem('nyxstore-language') || 'pt';
}

// Product names in different languages
const productNames = {
    pt: {
        'Shika Beta': 'Shika Beta',
        'Shika Alpha': 'Shika Alpha',
        'Slash Bypass': 'Slash Bypass',
        'Unicore': 'Unicore',
        'Anti-Addict': 'Anti-Addict',
        'Uniwaves': 'Uniwaves',
        'Kittenwaves': 'Kittenwaves',
        'Unizone': 'Unizone'
    },
    en: {
        'Shika Beta': 'Shika Beta',
        'Shika Alpha': 'Shika Alpha',
        'Slash Bypass': 'Slash Bypass',
        'Unicore': 'Unicore',
        'Anti-Addict': 'Anti-Addict',
        'Uniwaves': 'Uniwaves',
        'Kittenwaves': 'Kittenwaves',
        'Unizone': 'Unizone'
    }
};

// Product Features Translations
const productTranslations = {
    pt: {
        'Shika Beta': {
            Player: ['Efeitos de Ataque', 'Elemento Customizado', 'Golpe Extra', 'Modo Deus', 'Energia Infinita', 'Stamina Infinita', 'Stamina de Wanderer Infinita', 'Phlogiston Infinito', 'Nightsoul Infinito', 'Stamina de Mavuika Infinita', 'Sem Clipping', 'Sem Cooldown de Habilidade', 'Sem Cooldown de Troca de Avatar', 'Sem Combate de Avatar', 'Sem Esconder Arma', 'Carregamento de Arco Instantâneo', 'Sem Cooldown de Sprint', 'Sem Cooldown de Habilidade de Veículo', 'Velocidade do Jogador'],
            World: ['Desafio Automático', 'Destruição Automática', 'Coleta Automática', 'Seelie Automático', 'Fala Automática', 'Pular Cinemáticas', 'Inimigos Burros', 'Visão Elemental Permanente', 'Tempo Falso', 'Combinação Rápida', 'Congelar Inimigos', 'Aura de Morte', 'Aspirador de Mobs', 'Jogo de Música Automático', 'Abrir Time Imediatamente'],
            Teleport: ['Teleporte de Baú', 'Teleporte de Mapa', 'Teleporte de Oculi', 'Teleporte de Missão'],
            Visual: ['ESP', 'Zoom de Câmera', 'Sem Censura', 'Modificador de FOV', 'Ícone GM', 'Modificador de Gráficos', 'Esconder Dano', 'Esconder Reação', 'Esconder UI', 'Sem Neblina', 'Sem Grama', 'Sem Neblina de Mapa', 'Paimon Seguindo', 'Modificador de Perfil', 'FPS Desbloqueado'],
            Misc: ['Saída Instantânea', 'Fetcher de URL Gacha']
        },
        'Shika Alpha': {
            Player: ['Efeitos de Ataque', 'Elemento Customizado', 'Golpe Extra', 'Modo Deus', 'Energia Infinita', 'Stamina Infinita', 'Stamina de Wanderer Infinita', 'Phlogiston Infinito', 'Nightsoul Infinito', 'Stamina de Mavuika Infinita', 'Sem Clipping', 'Sem Cooldown de Habilidade', 'Sem Cooldown de Troca de Avatar', 'Sem Combate de Avatar', 'Sem Esconder Arma', 'Carregamento de Arco Instantâneo', 'Sem Cooldown de Sprint', 'Sem Cooldown de Habilidade de Veículo', 'Velocidade do Jogador', 'Modificador de Chance de Crítico', 'Correr na Água', 'Impulso de Corrida', 'Impulso de Salto', 'Impulso de Voo', 'Impulso de Nado', 'Impulso de Mergulho'],
            World: ['Desafio Automático', 'Destruição Automática', 'Coleta Automática', 'Seelie Automático', 'Fala Automática', 'Pular Cinemáticas', 'Inimigos Burros', 'Visão Elemental Permanente', 'Tempo Falso', 'Combinação Rápida', 'Congelar Inimigos', 'Aura de Morte', 'Aspirador de Mobs', 'Jogo de Música Automático', 'Abrir Time Imediatamente', 'Ativar Teleporte Automático', 'Pesca Automática', 'Reivindicar Conquistas Automaticamente'],
            Teleport: ['Teleporte de Baú', 'Teleporte de Mapa', 'Teleporte de Oculi', 'Teleporte de Missão', 'Teleporte Customizado (Usado para auto-farm)'],
            Visual: ['ESP', 'Zoom de Câmera', 'Sem Censura', 'Modificador de FOV', 'Ícone GM', 'Modificador de Gráficos', 'Esconder Dano', 'Esconder Reação', 'Esconder UI', 'Sem Neblina', 'Sem Grama', 'Sem Neblina de Mapa', 'Paimon Seguindo', 'Modificador de Perfil', 'FPS Desbloqueado'],
            Misc: ['Saída Instantânea', 'Fetcher de URL Gacha']
        },
        'Slash Bypass': {
            Info: ['Bypass Cliente Side', 'Evita Banimento ao usar Shika', 'Dependendo das funções usadas, risco de ban existe', 'Proteção de Conta contra Anti-Cheat']
        },
        'Unicore': {
            'Mapa Interativo': [
                'Configurações',
                'Teleporte Rápido',
                'Escala de Imagem',
                'Configuração',
                'Carregar Itens',
                'Salvar Itens',
                'Lista de Filtros',
                'Marcos',
                'Pontos de Viagem',
                'Baú de Quebra-Cabeça',
                'Animais',
                'Especialidades Locais',
                'Minérios',
                'Madeira',
                'Baús',
                'Pesca',
                'Itens Especiais',
                'Inimigos',
                'Experiência',
                'Inventário / Materiais'
            ],
            Combate: [
                'Modificadores de Ataque',
                'Aura de Morte',
                'Multiplicador de Dano (0-30)',
                'Distância Máxima (0-20)',
                'Disparo Rápido',
                'Multiplicador de Ataque (0-100)',
                'Monstros / Animais / Minérios',
                'Dano em Área',
                'Multiplicador de Dano (0-30)',
                'Distância Máxima (0-20)',
                'Monstros / Animais',
                'Modificadores de Habilidade',
                'Redutor C/D',
                'Valor (0,1 - 0,9)',
                'Ultimate Infinito',
                'Modificadores de Inimigo',
                'Magnetizador',
                'Apenas Visível',
                'Distância Máxima (0-20)',
                'Monstros / Animais / Minérios',
                'Congelar Inimigo',
                'Inimigo Não Atacará'
            ],
            Jogador: [
                'Movimento',
                'Stamina Infinita',
                'Modo: Sobrepor / Bloquear',
                'Sem Clipping',
                'Velocidade (0 - 2.0)',
                'Defesa',
                'Modo Deus',
                'Sem Dano de Queda',
                'Efeitos',
                'Transparência do Personagem',
                'Coleta Automática',
                'Configurações',
                'Apenas Visível',
                'Distância Máxima (29m)',
                'Lista de Filtros',
                'Especialidades Locais',
                'Minérios',
                'Baús',
                'Inventário / Materiais',
                'Árvore / Outro'
            ],
            Teleportes: [
                'Teleporte do Mouse',
                'Desenhar Círculo',
                'Distância Máxima (1000m)',
                'Teleporte de Missão',
                'Entidades',
                'Desenhar Alvo para TP',
                'Seleção de Alvo',
                'Campo de Visão',
                'Distância (0-500)',
                'Lista de Filtros',
                'Pontos de Viagem',
                'Baú de Quebra-Cabeça',
                'Animais',
                'Especialidades Locais',
                'Minérios',
                'Baús',
                'Itens Especiais',
                'Inimigos',
                'Experiência',
                'Inventário / Materiais',
                'Customizado',
                'Configurações',
                'Desenhar Pontos',
                'Modo Loop (auto TP)',
                'Atraso Entre TP (0-60)',
                'Iniciar TP a partir do Primeiro Objeto',
                'Iniciar TP a partir do Objeto Selecionado',
                'Configuração',
                'Carregar Itens',
                'Salvar Itens',
                'Lista de Pontos',
                'Criar Novo',
                'Teleportar'
            ],
            Utilitário: [
                'Diálogos',
                'Diálogos Automáticos',
                'Pular Automático',
                'Escolha Automática',
                'Acelerar Diálogos',
                'Pular Cinemáticas',
                'Ajustes Visuais',
                'Desbloqueador de FPS',
                'Ambiente',
                'Tempo Customizado',
                'Remover Neblina',
                'Automação',
                'Seelies Automáticas',
                'Distância Máxima (29m)',
                'Modificador de Perfil',
                'UID',
                'Nome',
                'Nível de Aventura',
                'Nível de Mundo',
                'Aniversário',
                'Assinatura'
            ]
        },
        'Anti-Addict': {
            Jogador: [
                'Efeitos de Ataque',
                'Sempre Crítico',
                'Modificador de Elemento',
                'Multiplicador de Ataque',
                'Modificadores de Avatar',
                'Velocidade',
                'Energia Infinita',
                'Sem Cooldown de Habilidade',
                'Sinalizadores do Cliente',
                'Desabilitar Barreira de Mundo',
                'Sempre Chat (ativar chat, mesmo antes do AR 5)',
                'Sempre Planar (ativar planador, mesmo antes do AR 5)',
                'Modo Deus',
                'Stamina Infinita',
                'Aura de Morte',
                'Matar inimigos automaticamente à vista, suporte ao abismo',
                'Teleporte de Mapa',
                'Teleportar para qualquer local no mapa visível'
            ],
            Mundo: [
                'Domínio Automático',
                'Pesca Automática',
                'Oculi Automático',
                'Missão Automática',
                'Completar partes das cadeias de missões imediatamente',
                'Seelie Automático',
                'Coletor de Gotas',
                'Coletar automaticamente itens do chão, no alcance máximo, quase instantaneamente!',
                'Velocidade do Jogo',
                'Alterar a velocidade com que o jogo é executado',
                'Coletor de Materiais',
                'Teleportar automaticamente e coletar especialidades locais',
                'Teleporte de Baú'
            ],
            Misc: [
                'Desbloqueador de Taxa de Quadros',
                'Pular Cinemática',
                'Pular cinemáticas pré-renderizadas/de cinema modernas',
                'Pular Abertura',
                'Pular a cinemática de abertura',
                'Modificador de UID',
                'Alterar o UID exibido no canto inferior direito'
            ]
        },
        'Uniwaves': {
            Visuais: [
                'Main - Mostrar Offscreen, Distância Máxima (1000m), Caixa, Nome, Distância',
                'Radar - Intervalo, Filtros, Lista',
                'Tesouro - Baú de Sonância, Monstro, NPC, Animal, Item',
                'Builder - Mostrar Offscreen, Mostrar Nomes de Debug, Distância Máxima (1000m), Caixa, Nome, Distância',
                'Config System - Carregar Itens, Salvar Itens, Filtros, Lista, Criar Novo'
            ],
            Combate: [
                'Attack Modifiers - Rapid Fire, Kill Aura, Delay Entre Golpes, Distância Máxima para Golpe',
                'Enemy Modifiers - Inimigos Burros, Magnetizador (Tipo: NPC / Monstro / Animal / Item, Distância Máxima 1000m, Intervalo de Vácuo, Valor FOV 0-180, Draw FOV)',
                'Aimbot - Tipo (NPC / Monstros / Animais), Distância Máxima (1000m), Valor FOV, Draw FOV',
                'Ability Modifiers - Sem Cooldown de Habilidade'
            ],
            Jogador: [
                'Elf - Noclip, Velocidade (x0 - x20), Stamina Infinita, Modo Deus',
                'No Fall Damage',
                'Character Transparency',
                'Profile Changer - Nome, Aniversário, UID, Nível de Aventura',
                'Auto Loot - Apenas Visível, Distância Máxima (1000m)',
                'Filters - Itens, Tesouro, Baú de Sonância'
            ],
            Teleporte: [
                'Main - Mouse Teleport (Alt+LMB), Draw Circle, Distância Máxima (1000m)',
                'Entities - Draw Target, Target Selection, Campo de Visão, Distância, Distância Máxima (1000m)',
                'Filters - Tesouro, Monstro, NPC, Animal, Item',
                'Custom - General (Show All, Config, Salvar Itens, Carregar Itens)',
                'Loop - Start, Delay Entre Teleportes',
                'Filters - Criar novo arquivo JSON TP',
                'Teleporte'
            ],
            Utility: [
                'Visual Tweaks - Mudador FOV (0-140), Câmera Livre, Desbloqueador FPS, Escala de Resolução',
                'Watermark - Logo, FPS, Time, Game',
                'Game Adjustments - Acelerar Jogo (RMB para configurar bind), Tempo Customizado',
                'Crosshair - Componentes e customização para mira in-game',
                'Config - Criar Novo, Criar de Clipboard, Atualizar'
            ]
        },
        'Kittenwaves': {
            Jogador: [
                'Modo Deus',
                'Multi-golpe',
                'Sem Cooldown',
                'Forçar Crítico',
                'Stamina Infinita',
                'Forte Infinita',
                'Energia Ultimate Infinita',
                'Energia Concerto Infinita',
                'Cadeia de Ressonância Máxima (Todos personagens R6)',
                'Buffs do Jogador (buffs de stat acumuláveis)',
                '+50% Taxa de Queda de Echo',
                '+50% Créditos de Shell',
                '+50% Quedas de Materiais',
                'Sem Queda',
                'Noclip',
                'Velocidade de Caminhada',
                'Aranha',
                'Entrar em Áreas Restritas'
            ],
            Mundo: [
                'Speedhack',
                'Killaura',
                'Aspirador de Entidades',
                'Inimigos Burros',
                'Forçar Botão Pular',
                'Pular Diálogo',
                'Sem Animação de Culinária',
                'Auto Mutterfly',
                'Auto Destruir',
                'Auto Saque',
                'Auto Absorver',
                'Intervalo de Interação Customizado'
            ],
            Visuais: [
                'ESP (Com grande seleção de filtros)',
                'Caixas',
                'Traçadores',
                'Distância',
                'Filtros de Materiais de Ascensão',
                'Filtros de Culinária & Síntese',
                'Filtros de Minério',
                'Filtros de Monstro',
                'Filtros de Quebra-cabeça'
            ],
            Teleporte: [
                'Teleporte de Mapa',
                'Teleporte de Baú',
                'Teleporte Customizado',
                'Grande seleção de listas de TP'
            ],
            Misc: [
                'Espreita',
                'Esconder UI',
                'Câmera Livre',
                'Trocador de UID',
                'Escala do Jogador',
                'Trocador de FOV',
                'Desbloqueador de FPS',
                'Exibição de FPS',
                'Economizador de CPU',
                'Configurações: Temas',
                'Atalhos',
                'Suporte Multi-idioma',
                'Russo, Chinês, Turco, Alemão, Indonésio, Tailandês, Vietnamita, Japonês, Italiano, Espanhol, Francês, etc...'
            ]
        },
        'Unizone': {
            Features: ['Em breve', 'Em breve', 'Em breve', 'Em breve', 'Em breve']
        }
    },
    en: {
        'Shika Beta': {
            Player: ['Attack Effects', 'Custom Element', 'Extra Hit', 'God Mode', 'Infinite Energy', 'Infinite Stamina', 'Infinite Wanderer Stamina', 'Infinite Phlogiston', 'Infinite Nightsoul', 'Infinite Mavuika Stamina', 'No Clip', 'No Skill Cooldown', 'No Avatar Change Cooldown', 'No Avatar Combat', 'No Hide Weapon', 'Instant Bow Charge', 'No Sprint Cooldown', 'No Vehicle Skill Cooldown', 'Player Speed'],
            World: ['Auto Challenge', 'Auto Destroy', 'Auto Loot', 'Auto Seelie', 'Auto Talk', 'Skip Cutscenes', 'Dumb Enemies', 'Permanent Elemental Sight', 'Fake Time', 'Fast Combine', 'Freeze Enemies', 'Kill Aura', 'Mob Vacuum', 'Auto Music Game', 'Open Team Inmediately'],
            Teleport: ['Chest Teleport', 'Map Teleport', 'Oculi Teleport', 'Quest Teleport'],
            Visual: ['ESP', 'Camera Zoom', 'No Censorship', 'FOV Changer', 'GM Icon', 'Graphics Changer', 'Hide Damage', 'Hide Reaction', 'Hide UI', 'No Fog', 'No Grass', 'No Map Fog', 'Paimon Follow', 'Profile Changer', 'Unlock FPS'],
            Misc: ['Instant Exit', 'Gacha Url Fetcher']
        },
        'Shika Alpha': {
            Player: ['Attack Effects', 'Custom Element', 'Extra Hit', 'God Mode', 'Infinite Energy', 'Infinite Stamina', 'Infinite Wanderer Stamina', 'Infinite Phlogiston', 'Infinite Nightsoul', 'Infinite Mavuika Stamina', 'No Clip', 'No Skill Cooldown', 'No Avatar Change Cooldown', 'No Avatar Combat', 'No Hide Weapon', 'Instant Bow Charge', 'No Sprint Cooldown', 'No Vehicle Skill Cooldown', 'Player Speed', 'Crit Chance Modifier', 'Run on Water', 'Run Boost', 'Jump Boost', 'Fly Boost', 'Swim Boost', 'Dive Boost'],
            World: ['Auto Challenge', 'Auto Destroy', 'Auto Loot', 'Auto Seelie', 'Auto Talk', 'Skip Cutscenes', 'Dumb Enemies', 'Permanent Elemental Sight', 'Fake Time', 'Fast Combine', 'Freeze Enemies', 'Kill Aura', 'Mob Vacuum', 'Auto Music Game', 'Open Team Inmediately', 'Auto Activate Teleport', 'Auto Fish', 'Auto Claim Achievements'],
            Teleport: ['Chest Teleport', 'Map Teleport', 'Oculi Teleport', 'Quest Teleport', 'Custom Teleport (Used for auto-farm)'],
            Visual: ['ESP', 'Camera Zoom', 'No Censorship', 'FOV Changer', 'GM Icon', 'Graphics Changer', 'Hide Damage', 'Hide Reaction', 'Hide UI', 'No Fog', 'No Grass', 'No Map Fog', 'Paimon Follow', 'Profile Changer', 'Unlock FPS'],
            Misc: ['Instant Exit', 'Gacha Url Fetcher']
        },
        'Slash Bypass': {
            Info: ['Client Side Bypass', 'Prevents Ban when using Shika', 'Depending on the features used, ban risk exists', 'Account Protection against Anti-Cheat']
        },
        'Unicore': {
            'Interactive Map': [
                'Settings',
                'Fast Teleport',
                'Image Scale',
                'Config',
                'Load Items',
                'Save Items',
                'Filters List',
                'Landmarks',
                'Waypoints',
                'Puzzle Chest',
                'Animals',
                'Local Specialities',
                'Ores',
                'Wood',
                'Chests',
                'Fishing',
                'Special Items',
                'Enemies',
                'Experience',
                'Inventory / Materials'
            ],
            Combat: [
                'Attack Modifiers',
                'Kill Aura',
                'Damage Multiplayer (0-30)',
                'Max Distance (0-20)',
                'Rapid-Fire',
                'Attack Multiplayer (0-100)',
                'Monsters / Animals / Ores',
                'Aoe-Damage',
                'Damage Multiplayer (0-30)',
                'Max Distance (0-20)',
                'Monters / Animals',
                'Ability Modifiers',
                'C/D Reducer',
                'Value (0,1 - 0,9)',
                'Infinite Ultimate',
                'Enemy Modifiers',
                'Magnetizer',
                'Visible Only',
                'Max Distance (0-20)',
                'Monters / Animals / Ores',
                'Freeze Enemy',
                'Enemy Won\'t Attack'
            ],
            Player: [
                'Movement',
                'Infinite Stamina',
                'Mode: Override / Lock',
                'Noclip',
                'Speed (0 - 2.0)',
                'Defence',
                'Godmode',
                'No Fall Damage',
                'Effects',
                'Character Transperancy',
                'Auto Loot',
                'Settings',
                'Visible Only',
                'Max Distance (29m)',
                'Filters List',
                'Local Specialities',
                'Ores',
                'Chests',
                'Inventory / Materials',
                'Tree / Other'
            ],
            Teleports: [
                'Mouse Teleport',
                'Draw Circle',
                'Max Distance (1000m)',
                'Quest Teleport',
                'Entities',
                'Draw Targer to TP',
                'Target Selection',
                'Field of View',
                'Distance (0-500)',
                'Filters List',
                'Waypoints',
                'Puzzle Chest',
                'Animals',
                'Local Specialities',
                'Ores',
                'Chests',
                'Special Items',
                'Enemies',
                'Experience',
                'Inventory / Materials',
                'Custom',
                'Settings',
                'Draw Points',
                'Loop Mode (auto TP)',
                'Delay Between TP (0-60)',
                'Start TP from First object',
                'Start TP from Selected object',
                'Config',
                'Load Items',
                'Save Items',
                'Points List',
                'Create New',
                'Teleport'
            ],
            Utility: [
                'Dialogs',
                'Auto Dialogs',
                'Auto-Skip',
                'Auto-Choise',
                'Speedup Dialogs',
                'Skip Cutscenes',
                'Visual Tweaks',
                'FPS Unlocker',
                'Envorio',
                'Custom Time',
                'Remove Fog',
                'Automation',
                'Auto Seelies',
                'Max Distance (29m)',
                'Profile Changer',
                'UID',
                'Name',
                'Adventure Level',
                'World Level',
                'Birthday',
                'Signature'
            ]
        },
        'Anti-Addict': {
            Player: [
                'Attack Effects',
                'Always Crit',
                'Element Changer',
                'Attack Multiplier',
                'Avatar Modifiers',
                'Speed',
                'Infinite Energy',
                'No Skill Cooldown',
                'Client Flags',
                'Disable World Barrier',
                'Always Chat (enable chat, even before AR 5)',
                'Always Glide (enable the glider, even before AR 5)',
                'God Mode',
                'Infinite Stamina',
                'Kill Aura',
                'Automatically kill enemies on sight, support abyss',
                'Map Teleport',
                'Teleport to any spot on the visible map'
            ],
            World: [
                'Auto Domain',
                'Auto Fish',
                'Auto Oculi',
                'Auto Quest',
                'Complete parts of quest chains immediately',
                'Auto Seelie',
                'Drop Gatherer',
                'Automatically pick up items on the floor, at maximum range, almost instantly!',
                'Game Speed',
                'Change the speed at which the game runs',
                'Material Gatherer',
                'Automatically teleport to & collect local specialties',
                'Chest Teleport'
            ],
            Misc: [
                'Frame Rate Unlocker',
                'Skip Cutscene',
                'Skip modern pre-rendered/cinematic cutscenes',
                'Skip Opening',
                'Skip the opening cutscene',
                'UID Changer',
                'Change the UID displayed in the bottom-right corner'
            ]
        },
        'Uniwaves': {
            Visuals: [
                'Main - Show Offscreen, Max Distance (1000m), Box, Name, Distance',
                'Radar - Range, Filters, List',
                'Treasure - Sonance Casket, Monster, NPC, Animal, Item',
                'Builder - Show Offscreen, Show Debug Names, Max Distance (1000m), Box, Name, Distance',
                'Config System - Load Items, Save Items, Filters, List, Create New'
            ],
            Combat: [
                'Attack Modifiers - Rapid Fire, Kill Aura, Delay Between Hits, Max Distance for Hit',
                'Enemy Modifiers - Dumb Enemies, Magnetizer (Type: NPC / Monster / Animal / Item, Max Distance 1000m, Vacuum Range distance, FOV Value 0-180, Draw FOV)',
                'Aimbot - Type (NPC / Monsters / Animals), Max Distance (1000m), FOV Value, Draw FOV',
                'Ability Modifiers - No Skill Cooldown'
            ],
            Player: [
                'Elf - Noclip, Speed (x0 - x20), Infinite Stamina, God Mode',
                'No Fall Damage',
                'Character Transparency',
                'Profile Changer - Name, Birthday, UID, Adventure Level',
                'Auto Loot - Visible Only, Max Distance (1000m)',
                'Filters - Items, Treasure, Sonance Casket'
            ],
            Teleport: [
                'Main - Mouse Teleport (Alt+LMB), Draw Circle, Max Distance (1000m)',
                'Entities - Draw Target, Target Selection, Field of View, Distance, Max Distance (1000m)',
                'Filters - Treasure, Monster, NPC, Animal, Item',
                'Custom - General (Show All, Config, Save Items, Load Items)',
                'Loop - Start, Delay Between',
                'Filters - Create new json TP file',
                'Teleport'
            ],
            Utility: [
                'Visual Tweaks - FOV Changer (0-140), Free Camera, FPS Unlocker, Resolution Scale',
                'Watermark - Logo, FPS, Time, Game',
                'Game Adjustments - Speedup Game (RMB to setup bind), Custom Time',
                'Crosshair - Components and customization for in game crosshair',
                'Config - Create New, Create From Clipboard, Refresh'
            ]
        },
        'Kittenwaves': {
            Player: [
                'Godmode',
                'Multihit',
                'No Cooldown',
                'Force Critical',
                'Infinite Stamina',
                'Infinite Forte',
                'Infinite Ultimate Energy',
                'Infinite Concerto Energy',
                'Max Resonance Chain (All characters R6)',
                'Player buffs (stackable stat buffs)',
                '+50% Echo Drop Rate',
                '+50% Shell Credits',
                '+50% Material Drops',
                'No Fall',
                'Noclip',
                'Walk Speed',
                'Spider',
                'Enter Restricted Areas'
            ],
            World: [
                'Speedhack',
                'Killaura',
                'Entity Vacuum',
                'Dumb Enemies',
                'Force Skip Button',
                'Skip Dialog',
                'No Cooking Animation',
                'Auto Mutterfly',
                'Auto Destroy',
                'Auto Loot',
                'Auto Absorb',
                'Custom Interaction Range'
            ],
            Visuals: [
                'ESP (With a large selection of filters)',
                'Boxes',
                'Tracers',
                'Distance',
                'Ascention Material filters',
                'Cooking & Synthesis filters',
                'Ore filters',
                'Monster filters',
                'Puzzle filters'
            ],
            Teleport: [
                'Map Teleport',
                'Chest Teleport',
                'Custom Teleport',
                'Large selection of TP lists'
            ],
            Misc: [
                'Peeking',
                'Hide UI',
                'Freecam',
                'UID Changer',
                'Player Scale',
                'FOV Changer',
                'FPS Unlocker',
                'FPS Display',
                'CPU Saver',
                'Settings: Themes',
                'Hotkeys',
                'Multi-language Support',
                'Russian, Chinese, Turkish, German, Indonesian, Thai, Vietnamese, Japanese, Italian, Spanish, French, etc...'
            ]
        },
        'Unizone': {
            Features: ['Coming Soon', 'Coming Soon', 'Coming Soon', 'Coming Soon', 'Coming Soon']
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const productImages = document.querySelectorAll('.product-image');
    const modalClose = document.querySelector('.modal-close');

    // Open modal when clicking on product image
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const imageSrc = this.getAttribute('src');
            const description = this.closest('.product-card').querySelector('.product-description').textContent;

            // Populate modal with product information
            const currentLang = getCurrentLanguage();
            const translatedName = productNames[currentLang][productName] || productName;
            document.getElementById('modalProductName').textContent = translatedName;
            document.getElementById('modalProductName').setAttribute('data-original-name', productName);
            document.getElementById('modalProductDescription').textContent = description;
            document.getElementById('modalProductImage').src = imageSrc;

            // Check if product has categorized features
            if (productTranslations[currentLang][productName]) {
                displayCategorizedFeatures(productName);
            } else {
                // Fallback to old system
                const featuresString = this.getAttribute('data-features');
                const features = featuresString ? featuresString.split(',') : [];
                displaySimpleFeatures(features);
            }

            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Add cursor pointer to indicate clickability
        image.style.cursor = 'pointer';
    });

    // Close modal when clicking the X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function displayCategorizedFeatures(productName) {
        const language = getCurrentLanguage();
        const categories = productTranslations[language][productName];
        const container = document.getElementById('featuresContainer');
        const featuresList = document.getElementById('modalProductFeatures');

        // Clear previous content
        container.innerHTML = '';
        featuresList.innerHTML = '';

        // Create category buttons
        const categoryNames = Object.keys(categories);
        categoryNames.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = 'category-filter-btn';
            if (index === 0) button.classList.add('active');
            button.textContent = category;
            button.dataset.category = category;

            button.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.category-filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked button
                this.classList.add('active');

                // Display features for selected category
                featuresList.innerHTML = '';
                const features = categories[category];
                features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
            });

            container.appendChild(button);
        });

        // Display features for the first category by default
        featuresList.innerHTML = '';
        const firstCategory = categoryNames[0];
        categories[firstCategory].forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }

    function displaySimpleFeatures(features) {
        const container = document.getElementById('featuresContainer');
        const featuresList = document.getElementById('modalProductFeatures');

        // Clear category buttons for non-categorized products
        container.innerHTML = '';
        featuresList.innerHTML = '';

        // Display simple features list
        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature.trim();
            featuresList.appendChild(li);
        });
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Listen for language changes and update modal if it's open
    window.addEventListener('languageChanged', function() {
        if (modal.style.display === 'block') {
            const currentLang = getCurrentLanguage();
            const originalProductName = document.getElementById('modalProductName').getAttribute('data-original-name');
            const translatedName = productNames[currentLang][originalProductName] || originalProductName;
            document.getElementById('modalProductName').textContent = translatedName;
            
            if (productTranslations[currentLang][originalProductName]) {
                displayCategorizedFeatures(originalProductName);
            }
        }
    });
});
