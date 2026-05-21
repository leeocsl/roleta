import type { LaneKey } from './leagueChampions'

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
  return buildByStyle[getChampionStyle(championId, lanes)]
}

export function getAramDisorderRecommendations(championId: string, lanes: LaneKey[] = []) {
  const style = getChampionStyle(championId, lanes)

  return {
    items: aramBuildByStyle[style],
    augments: aramAugmentsByStyle[style],
  }
}
