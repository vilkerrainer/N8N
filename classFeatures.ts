

// Helper: Spell slot progression tables (condensed for brevity)
// Each inner array is [L1, L2, L3, L4, L5, L6, L7, L8, L9] slots
const CLASS_SPELL_SLOTS: Record<string, number[][]> = {
  "Bardo": [ // Full Caster
    /* 1*/ [2,0,0,0,0,0,0,0,0], /* 2*/ [3,0,0,0,0,0,0,0,0], /* 3*/ [4,2,0,0,0,0,0,0,0],
    /* 4*/ [4,3,0,0,0,0,0,0,0], /* 5*/ [4,3,2,0,0,0,0,0,0], /* 6*/ [4,3,3,0,0,0,0,0,0],
    /* 7*/ [4,3,3,1,0,0,0,0,0], /* 8*/ [4,3,3,2,0,0,0,0,0], /* 9*/ [4,3,3,3,1,0,0,0,0],
    /*10*/ [4,3,3,3,2,0,0,0,0], /*11*/ [4,3,3,3,2,1,0,0,0], /*12*/ [4,3,3,3,2,1,0,0,0],
    /*13*/ [4,3,3,3,2,1,1,0,0], /*14*/ [4,3,3,3,2,1,1,0,0], /*15*/ [4,3,3,3,2,1,1,1,0],
    /*16*/ [4,3,3,3,2,1,1,1,0], /*17*/ [4,3,3,3,2,1,1,1,1], /*18*/ [4,3,3,3,3,1,1,1,1],
    /*19*/ [4,3,3,3,3,2,1,1,1], /*20*/ [4,3,3,3,3,2,2,1,1],
  ],
  "Clérigo": [ // Full Caster
    [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
  ],
  "Druida": [ // Full Caster
    [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
  ],
  "Mago": [ // Full Caster
    [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
  ],
  "Feiticeiro": [ // Full Caster
    [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
  ],
  "Paladino": [ // Half Caster (starts at level 2)
    /* 1*/ [0,0,0,0,0,0,0,0,0], /* 2*/ [2,0,0,0,0,0,0,0,0], /* 3*/ [3,0,0,0,0,0,0,0,0],
    /* 4*/ [3,0,0,0,0,0,0,0,0], /* 5*/ [4,2,0,0,0,0,0,0,0], /* 6*/ [4,2,0,0,0,0,0,0,0],
    /* 7*/ [4,3,0,0,0,0,0,0,0], /* 8*/ [4,3,0,0,0,0,0,0,0], /* 9*/ [4,3,2,0,0,0,0,0,0],
    /*10*/ [4,3,2,0,0,0,0,0,0], /*11*/ [4,3,3,0,0,0,0,0,0], /*12*/ [4,3,3,0,0,0,0,0,0],
    /*13*/ [4,3,3,1,0,0,0,0,0], /*14*/ [4,3,3,1,0,0,0,0,0], /*15*/ [4,3,3,2,0,0,0,0,0],
    /*16*/ [4,3,3,2,0,0,0,0,0], /*17*/ [4,3,3,3,1,0,0,0,0], /*18*/ [4,3,3,3,1,0,0,0,0],
    /*19*/ [4,3,3,3,2,0,0,0,0], /*20*/ [4,3,3,3,2,0,0,0,0],
  ],
  "Patrulheiro": [ // Half Caster (starts at level 2)
    [0,0,0,0,0,0,0,0,0], [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,0,0,0,0],
  ],
  "Bruxo": [ // Pact Magic - different progression, slots are same level
    // Slots per short rest, Slot Level
    // For simplicity, we'll represent total "spell power" via the main 9-level slot array,
    // though this isn't how it's usually displayed. This table will show number of slots,
    // and a separate function will give their level.
    // Lvl: NumSlots, SlotLevel
    // 1:   1, 1st
    // 2:   2, 1st
    // 3:   2, 2nd
    // ...
    // This simplified model will use the common 9-slot array for consistency with other casters in the UI
    // but the actual Warlock slots are fewer and recover on short rest.
    // For now, a simplified full-caster like progression for Bruxo to make it work, needs refinement for true Pact Magic.
    // TEMPORARY: Using Sorcerer slots for Bruxo for UI consistency. This needs specific Bruxo logic.
        [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], // Up to 5th level slots only for Pact Magic
    [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0], // Mystic Arcanum starts here (6th+)
    [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], // Simplified
    [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1],
  ],
  // Non-casters or those with very different systems omitted for now (Bárbaro, Guerreiro, Ladino, Monge)
};

export const getClassSpellSlots = (className: string, level: number): number[] => {
  const classSlots = CLASS_SPELL_SLOTS[className];
  if (classSlots && level >= 1 && level <= classSlots.length) {
    return classSlots[level - 1];
  }
  return Array(9).fill(0); // Default for non-casters or unlisted levels
};

// Cantrips Known
const CLASS_CANTRIPS_KNOWN: Record<string, number[]> = {
  // Index is level - 1, value is cantrips known
  "Mago":       [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  "Feiticeiro": [4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6],
  "Bardo":      [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  "Clérigo":    [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  "Druida":     [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  "Bruxo":      [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4], // Base Warlock
  // Paladino and Patrulheiro typically don't get cantrips unless via Fighting Style/subclass
};

export const getClassCantripsKnownCount = (className: string, level: number): number => {
  const cantripsList = CLASS_CANTRIPS_KNOWN[className];
  if (cantripsList && level >= 1 && level <= cantripsList.length) {
    return cantripsList[level - 1];
  }
  return 0;
};


// Spells Known (for classes like Bard, Ranger, Sorcerer)
const CLASS_SPELLS_KNOWN: Record<string, number[]> = {
    // Index is level - 1
    "Bardo": [
      /* 1*/ 4, /* 2*/ 5, /* 3*/ 6, /* 4*/ 7, /* 5*/ 8, /* 6*/ 9, /* 7*/ 10, /* 8*/ 11, /* 9*/ 12,
      /*10*/ 14, /*11*/ 15, /*12*/ 15, /*13*/ 16, /*14*/ 18, /*15*/ 19, /*16*/ 19, /*17*/ 20,
      /*18*/ 22, /*19*/ 22, /*20*/ 22
    ],
    "Feiticeiro": [
      /* 1*/ 2, /* 2*/ 3, /* 3*/ 4, /* 4*/ 5, /* 5*/ 6, /* 6*/ 7, /* 7*/ 8, /* 8*/ 9, /* 9*/ 10,
      /*10*/ 11, /*11*/ 12, /*12*/ 12, /*13*/ 13, /*14*/ 13, /*15*/ 14, /*16*/ 14, /*17*/ 15,
      /*18*/ 15, /*19*/ 15, /*20*/ 15
    ],
    "Patrulheiro": [
      /* 1*/ 0,  /* 2*/ 2,  /* 3*/ 3,  /* 4*/ 3,  /* 5*/ 4,  /* 6*/ 4,  /* 7*/ 5,  /* 8*/ 5,
      /* 9*/ 6,  /*10*/ 6,  /*11*/ 7,  /*12*/ 7,  /*13*/ 8,  /*14*/ 8,  /*15*/ 9,  /*16*/ 9,
      /*17*/ 10, /*18*/ 10, /*19*/ 11, /*20*/ 11
    ],
    // Wizard, Cleric, Druid, Paladin prepare spells, so they "know" their whole list.
    // Bruxo has a limited number of spells known, similar to Sorcerer.
    "Bruxo": [ // Spells Known (not including Mystic Arcanum)
      /* 1*/ 2, /* 2*/ 3, /* 3*/ 4, /* 4*/ 5, /* 5*/ 6, /* 6*/ 7, /* 7*/ 8, /* 8*/ 9, /* 9*/ 10,
      /*10*/ 10, /*11*/ 11, /*12*/ 11, /*13*/ 12, /*14*/ 12, /*15*/ 13, /*16*/ 13, /*17*/ 14,
      /*18*/ 14, /*19*/ 15, /*20*/ 15
    ]
};

export const getClassSpellsKnownCount = (className: string, level: number): number => {
    const spellsKnownList = CLASS_SPELLS_KNOWN[className];
    if (spellsKnownList && level >= 1 && level <= spellsKnownList.length) {
        return spellsKnownList[level-1];
    }
    // For classes that prepare from their full list (Cleric, Druid, Paladin, Wizard),
    // they "know" all spells on their list up to the max spell level they can cast.
    // This function is primarily for casters with a fixed number of known spells.
    // For preparers, the UI might show all available spells and let them tick off prepared ones.
    if (["Clérigo", "Druida", "Mago", "Paladino"].includes(className)) return Infinity; // Indicates they prepare from list
    return 0;
}

// Max spell level a class can cast/prepare
const MAX_SPELL_LEVEL_BY_CLASS_LEVEL: Record<string, number[]> = {
    // Index is level - 1, value is max spell level (1-9)
    "Bardo":      [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9],
    "Clérigo":    [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9],
    "Druida":     [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9],
    "Mago":       [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9],
    "Feiticeiro": [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9],
    "Paladino":   [0,1,1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5], // Starts L2
    "Patrulheiro":[0,1,1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5], // Starts L2
    "Bruxo":      [1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5], // Pact slots max out at 5th; Mystic Arcanum for 6-9
};

export const getClassMaxSpellLevel = (className: string, level: number): number => {
    const maxLevelList = MAX_SPELL_LEVEL_BY_CLASS_LEVEL[className];
    if (maxLevelList && level >=1 && level <= maxLevelList.length) {
        return maxLevelList[level-1];
    }
    return 0;
}

export const getWizardCantripsKnown = (level: number): number => {
  return getClassCantripsKnownCount("Mago", level);
};

export const getWizardLevel1SpellsForSpellbook = (): number => {
  return 6; // Wizards start with 6 1st-level spells in their spellbook
};

// getWizardSpellSlots is now replaced by getClassSpellSlots("Mago", level)
// This function can be removed or kept for backward compatibility if it's used elsewhere explicitly.
export const getWizardSpellSlots = (level: number): number[] => {
  return getClassSpellSlots("Mago", level);
};