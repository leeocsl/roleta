import type { LaneKey } from './leagueChampions'

const englishItemNames: Record<string, string> = {
  'Mata-Craquens': 'Kraken Slayer',
  'Gume do Infinito': 'Infinity Edge',
  'Canhao Fumegante': 'Rapid Firecannon',
  'Lembrete Mortal': 'Mortal Reminder',
  'Anjo Guardiao': 'Guardian Angel',
  'Companheiro de Luden': "Luden's Companion",
  'Chama Sombria': 'Shadowflame',
  'Capuz da Morte de Rabadon': "Rabadon's Deathcap",
  'Cajado do Vazio': 'Void Staff',
  'Ampulheta de Zhonya': "Zhonya's Hourglass",
  Oportunidade: 'Opportunity',
  'Gume do Anoitecer': 'Edge of Night',
  'Rancor de Serylda': "Serylda's Grudge",
  'Cutelo Negro': 'Black Cleaver',
  'Danca da Morte': "Death's Dance",
  'Cegar, o Cutelo Sombrio': 'The Brutalizer',
  Sterak: "Sterak's Gage",
  'Couraca do Defunto': "Dead Man's Plate",
  'Jak Sho, o Inconstante': "Jak'Sho, The Protean",
  'Armadura de Espinhos': 'Thornmail',
  'Forca da Natureza': 'Force of Nature',
  'Pressagio de Randuin': "Randuin's Omen",
  'Regenerador de Pedra Lunar': 'Moonstone Renewer',
  Redencao: 'Redemption',
  'Turibulo Ardente': 'Ardent Censer',
  'Bencao de Mikael': "Mikael's Blessing",
  'Renovacao da Vigilia': 'Dawncore',
  'Convergencia de Zeke': "Zeke's Convergence",
  'Juramento do Cavaleiro': "Knight's Vow",
  'Medalhao dos Solari de Ferro': 'Locket of the Iron Solari',
  'Dente de Na Nashor': "Nashor's Tooth",
  'Criador de Fendas': 'Riftmaker',
  'Tormento de Liandry': "Liandry's Torment",
  'Arco Axiomatico': 'Axiom Arc',
  'Coracao Congelado': 'Frozen Heart',
}

const itemImageIds: Record<string, string> = {
  'Mata-Craquens': '6672',
  'Gume do Infinito': '3031',
  'Canhao Fumegante': '3094',
  'Lembrete Mortal': '3033',
  'Anjo Guardiao': '3026',
  'Companheiro de Luden': '6655',
  'Chama Sombria': '4645',
  'Capuz da Morte de Rabadon': '3089',
  'Cajado do Vazio': '3135',
  'Ampulheta de Zhonya': '3157',
  Oportunidade: '6692',
  'Gume do Anoitecer': '3814',
  'Rancor de Serylda': '6694',
  'Cutelo Negro': '3071',
  'Danca da Morte': '6333',
  'Cegar, o Cutelo Sombrio': '3134',
  Sterak: '3053',
  'Couraca do Defunto': '3742',
  'Jak Sho, o Inconstante': '6665',
  'Armadura de Espinhos': '3075',
  'Forca da Natureza': '4401',
  'Pressagio de Randuin': '3143',
  'Regenerador de Pedra Lunar': '6617',
  Redencao: '3107',
  'Turibulo Ardente': '3504',
  'Bencao de Mikael': '3222',
  'Renovacao da Vigilia': '6620',
  'Convergencia de Zeke': '3050',
  'Juramento do Cavaleiro': '3109',
  'Medalhao dos Solari de Ferro': '3190',
  'Dente de Na Nashor': '3115',
  'Criador de Fendas': '4633',
  'Tormento de Liandry': '6653',
  'Arco Axiomatico': '6696',
  'Coracao Congelado': '3110',
}

const englishAugmentNames: Record<string, string> = {
  'Alcance extra': 'Extra Range',
  'Velocidade de ataque': 'Attack Speed',
  'Dano critico': 'Critical Damage',
  'Roubo de vida': 'Life Steal',
  'Aceleracao de habilidade': 'Ability Haste',
  'Explosao arcana': 'Arcane Burst',
  'Mana sustentada': 'Sustained Mana',
  'Penetracao magica': 'Magic Penetration',
  Execucao: 'Execution',
  Mobilidade: 'Mobility',
  'Dano explosivo': 'Burst Damage',
  'Reset de abate': 'Takedown Reset',
  Tenacidade: 'Tenacity',
  'Dano sustentado': 'Sustained Damage',
  'Escudo em combate': 'Combat Shield',
  'Vida maxima': 'Maximum Health',
  'Resistencia adicional': 'Bonus Resistances',
  'Controle de grupo': 'Crowd Control',
  Regeneracao: 'Regeneration',
  'Forca de cura e escudo': 'Heal and Shield Power',
  'Protecao em area': 'Area Protection',
  'Escudo em area': 'Area Shield',
  'Cura em combate': 'Combat Healing',
}

const buildByStyle = {
  marksman: ['Mata-Craquens', 'Gume do Infinito', 'Canhao Fumegante', 'Lembrete Mortal', 'Anjo Guardiao'],
  mage: ['Companheiro de Luden', 'Chama Sombria', 'Capuz da Morte de Rabadon', 'Cajado do Vazio', 'Ampulheta de Zhonya'],
  assassin: ['Oportunidade', 'Gume do Anoitecer', 'Rancor de Serylda', 'Cutelo Negro', 'Anjo Guardiao'],
  fighter: ['Cutelo Negro', 'Danca da Morte', 'Cegar, o Cutelo Sombrio', 'Sterak', 'Anjo Guardiao'],
  tank: ['Couraca do Defunto', 'Jak Sho, o Inconstante', 'Armadura de Espinhos', 'Forca da Natureza', 'Pressagio de Randuin'],
  enchanter: ['Regenerador de Pedra Lunar', 'Redencao', 'Turibulo Ardente', 'Bencao de Mikael', 'Renovacao da Vigilia'],
  supportTank: ['Convergencia de Zeke', 'Juramento do Cavaleiro', 'Medalhao dos Solari de Ferro', 'Redencao', 'Couraca do Defunto'],
  jungleAp: ['Dente de Na Nashor', 'Criador de Fendas', 'Ampulheta de Zhonya', 'Capuz da Morte de Rabadon', 'Cajado do Vazio'],
  jungleAd: ['Cutelo Negro', 'Danca da Morte', 'Cegar, o Cutelo Sombrio', 'Sterak', 'Anjo Guardiao'],
}

const aramBuildByStyle: Record<keyof typeof buildByStyle, string[]> = {
  marksman: ['Mata-Craquens', 'Gume do Infinito', 'Danca da Morte', 'Lembrete Mortal', 'Anjo Guardiao'],
  mage: ['Tormento de Liandry', 'Chama Sombria', 'Capuz da Morte de Rabadon', 'Cajado do Vazio', 'Ampulheta de Zhonya'],
  assassin: ['Oportunidade', 'Gume do Anoitecer', 'Rancor de Serylda', 'Arco Axiomatico', 'Anjo Guardiao'],
  fighter: ['Cutelo Negro', 'Danca da Morte', 'Sterak', 'Cegar, o Cutelo Sombrio', 'Anjo Guardiao'],
  tank: ['Coracao Congelado', 'Jak Sho, o Inconstante', 'Armadura de Espinhos', 'Forca da Natureza', 'Pressagio de Randuin'],
  enchanter: ['Regenerador de Pedra Lunar', 'Redencao', 'Turibulo Ardente', 'Bencao de Mikael', 'Renovacao da Vigilia'],
  supportTank: ['Medalhao dos Solari de Ferro', 'Juramento do Cavaleiro', 'Convergencia de Zeke', 'Redencao', 'Couraca do Defunto'],
  jungleAp: ['Tormento de Liandry', 'Dente de Na Nashor', 'Ampulheta de Zhonya', 'Capuz da Morte de Rabadon', 'Cajado do Vazio'],
  jungleAd: ['Cutelo Negro', 'Danca da Morte', 'Sterak', 'Rancor de Serylda', 'Anjo Guardiao'],
}

const aramAugmentsByStyle: Record<keyof typeof buildByStyle, string[]> = {
  marksman: ['Alcance extra', 'Velocidade de ataque', 'Dano critico', 'Roubo de vida'],
  mage: ['Aceleracao de habilidade', 'Explosao arcana', 'Mana sustentada', 'Penetracao magica'],
  assassin: ['Execucao', 'Mobilidade', 'Dano explosivo', 'Reset de abate'],
  fighter: ['Tenacidade', 'Dano sustentado', 'Roubo de vida', 'Escudo em combate'],
  tank: ['Vida maxima', 'Resistencia adicional', 'Controle de grupo', 'Regeneracao'],
  enchanter: ['Forca de cura e escudo', 'Aceleracao de habilidade', 'Mana sustentada', 'Protecao em area'],
  supportTank: ['Tenacidade', 'Controle de grupo', 'Escudo em area', 'Resistencia adicional'],
  jungleAp: ['Aceleracao de habilidade', 'Dano sustentado', 'Penetracao magica', 'Cura em combate'],
  jungleAd: ['Dano sustentado', 'Tenacidade', 'Roubo de vida', 'Execucao'],
}

const championStyleOverrides: Record<string, keyof typeof buildByStyle> = {
  Ahri: 'mage',
  Akali: 'assassin',
  Akshan: 'marksman',
  Alistar: 'supportTank',
  Ambessa: 'fighter',
  Amumu: 'tank',
  Annie: 'mage',
  Aphelios: 'marksman',
  Ashe: 'marksman',
  Azir: 'mage',
  Bard: 'enchanter',
  Blitzcrank: 'supportTank',
  Braum: 'supportTank',
  Caitlyn: 'marksman',
  Camille: 'fighter',
  Darius: 'fighter',
  Diana: 'jungleAp',
  Draven: 'marksman',
  Ekko: 'assassin',
  Evelynn: 'jungleAp',
  Ezreal: 'marksman',
  Fiora: 'fighter',
  Fizz: 'assassin',
  Garen: 'fighter',
  Graves: 'jungleAd',
  Gwen: 'fighter',
  Hecarim: 'jungleAd',
  Irelia: 'fighter',
  Janna: 'enchanter',
  Jhin: 'marksman',
  Jinx: 'marksman',
  Kaisa: 'marksman',
  Kalista: 'marksman',
  Karma: 'enchanter',
  Katarina: 'assassin',
  Kayle: 'mage',
  Khazix: 'assassin',
  KogMaw: 'marksman',
  Leona: 'supportTank',
  Lulu: 'enchanter',
  Lux: 'mage',
  Malphite: 'tank',
  Milio: 'enchanter',
  MissFortune: 'marksman',
  Mordekaiser: 'fighter',
  Morgana: 'mage',
  Nami: 'enchanter',
  Nautilus: 'supportTank',
  Nilah: 'marksman',
  Ornn: 'tank',
  Pyke: 'assassin',
  Rakan: 'supportTank',
  Rammus: 'tank',
  Rell: 'supportTank',
  Renata: 'enchanter',
  Renekton: 'fighter',
  Rengar: 'assassin',
  Riven: 'fighter',
  Samira: 'marksman',
  Sejuani: 'tank',
  Senna: 'marksman',
  Seraphine: 'enchanter',
  Sett: 'fighter',
  Shen: 'tank',
  Sivir: 'marksman',
  Sona: 'enchanter',
  Soraka: 'enchanter',
  Sylas: 'mage',
  Thresh: 'supportTank',
  Tristana: 'marksman',
  Twitch: 'marksman',
  Varus: 'marksman',
  Vayne: 'marksman',
  Vi: 'jungleAd',
  Viego: 'jungleAd',
  Vladimir: 'mage',
  Volibear: 'fighter',
  Xayah: 'marksman',
  Xerath: 'mage',
  Yasuo: 'fighter',
  Yone: 'fighter',
  Yuumi: 'enchanter',
  Zed: 'assassin',
  Zeri: 'marksman',
  Ziggs: 'mage',
  Zyra: 'mage',
}

export type RecommendedEntry = {
  label: string
  image?: string
}

function getChampionStyle(championId: string, lanes: LaneKey[] = []): keyof typeof buildByStyle {
  const style = championStyleOverrides[championId]

  if (style) return style
  if (lanes.includes('bottom')) return 'marksman'
  if (lanes.includes('support')) return 'enchanter'
  if (lanes.includes('jungle')) return 'jungleAd'
  if (lanes.includes('mid')) return 'mage'
  if (lanes.includes('top')) return 'fighter'

  return 'fighter'
}

export function getRecommendedBuild(championId: string, lanes: LaneKey[] = []) {
  return buildByStyle[getChampionStyle(championId, lanes)].map(formatItemName)
}

export function getAramDisorderRecommendations(championId: string, lanes: LaneKey[] = []) {
  const style = getChampionStyle(championId, lanes)

  return {
    items: aramBuildByStyle[style].map(formatItemName),
    augments: aramAugmentsByStyle[style].map(formatAugmentName),
  }
}

function formatItemName(item: string) {
  const itemId = itemImageIds[item]

  return {
    label: `${item} (${englishItemNames[item] ?? item})`,
    image: itemId ? `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/item/${itemId}.png` : undefined,
  }
}

function formatAugmentName(augment: string) {
  return {
    label: `${augment} (${englishAugmentNames[augment] ?? augment})`,
  }
}
