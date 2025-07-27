
import { Feat } from './types';

export const ALL_FEATS: Feat[] = [
  {
    id: "lucky",
    name: "Sortudo (Lucky)",
    description: "Você tem uma sorte inexplicável que surge em momentos cruciais.\n\nVocê tem 3 pontos de sorte. Sempre que você fizer uma jogada de ataque, teste de habilidade ou teste de resistência, você pode gastar um ponto de sorte para rolar um d20 adicional. Você pode escolher usar seu ponto de sorte depois de rolar o dado, mas antes que o resultado seja determinado. Você escolhe qual dos d20s usar para a jogada de ataque, teste de habilidade ou teste de resistência.\n\nVocê também pode gastar um ponto de sorte quando uma jogada de ataque é feita contra você. Role um d20, e então escolha se o ataque usa a rolagem do atacante ou a sua. Se mais de uma criatura gastar um ponto de sorte para influenciar o resultado de uma rolagem, os pontos se anulam; nenhum d20 adicional é rolado.\n\nVocê recupera seus pontos de sorte gastos quando termina um descanso longo."
  },
  {
    id: "polearm_master",
    name: "Mestre de Armas de Haste (Polearm Master)",
    description: "Você pode manter seus inimigos à distância com armas de haste. Você ganha os seguintes benefícios:\n\n• Quando você realiza a ação de Ataque e ataca apenas com uma glaive, alabarda, lança longa ou bordão, você pode usar sua ação bônus para fazer um ataque corpo a corpo com a outra extremidade da arma. O dado de dano desta arma para este ataque é um d4, e o ataque causa dano de concussão.\n• Enquanto estiver empunhando uma glaive, alabarda, lança longa ou lança, outras criaturas provocam um ataque de oportunidade de você quando entram no seu alcance."
  },
  {
    id: "sharpshooter",
    name: "Atirador Aguçado (Sharpshooter)",
    description: "Você dominou as armas de longo alcance e pode fazer tiros que outros considerariam impossíveis. Você ganha os seguintes benefícios:\n\n• Atacar a longo alcance não impõe desvantagem em suas jogadas de ataque com armas de longo alcance.\n• Suas armas de longo alcance ignoram meia-cobertura e três-quartos de cobertura.\n• Antes de fazer um ataque com uma arma de longo alcance com a qual você é proficiente, você pode escolher sofrer uma penalidade de -5 na jogada de ataque. Se o ataque acertar, você adiciona +10 ao dano do ataque."
  },
  {
    id: "war_caster",
    name: "Mago de Guerra (War Caster)",
    description: "Pré-requisito: A capacidade de conjurar pelo menos uma magia.\n\nVocê praticou a conjuração de magias no meio do combate, aprendendo técnicas que lhe concedem os seguintes benefícios:\n\n• Você tem vantagem em testes de resistência de Constituição que você faz para manter sua concentração em uma magia quando sofre dano.\n• Você pode realizar os componentes somáticos das magias mesmo quando tem armas ou um escudo em uma ou ambas as mãos.\n• Quando uma criatura hostil provoca um ataque de oportunidade de você, você pode usar sua reação para conjurar uma magia na criatura, em vez de fazer um ataque de oportunidade. A magia deve ter um tempo de conjuração de 1 ação e deve mirar apenas naquela criatura."
  },
  {
    id: "great_weapon_master",
    name: "Mestre de Armas Grandes (Great Weapon Master)",
    description: "Você aprendeu a usar o peso de uma arma pesada a seu favor. Você ganha os seguintes benefícios:\n\n• No seu turno, quando você marca um acerto crítico com uma arma corpo a corpo ou reduz uma criatura a 0 pontos de vida com uma, você pode fazer um ataque com arma corpo a corpo como uma ação bônus.\n• Antes de fazer um ataque corpo a corpo com uma arma pesada com a qual você é proficiente, você pode escolher sofrer uma penalidade de -5 na jogada de ataque. Se o ataque acertar, você adiciona +10 ao dano do ataque."
  },
];

export const ALL_FEATS_MAP: Record<string, Feat> = ALL_FEATS.reduce((acc, feat) => {
    acc[feat.id] = feat;
    return acc;
}, {} as Record<string, Feat>);
