export interface PantryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Protein' | 'Pantry Staple' | 'Dairy/Alternative' | 'Herb/Spice' | 'Condiment';
  isWasteRisk?: boolean;
  notes?: string;
}

export interface FlavorRadarData {
  umami: number; // 0-10
  sweetness: number;
  acidity: number;
  salinity: number;
  bitterness: number;
  pungency: number;
  aromaIntensity: number;
  kokumi: number; // mouthfulness/lingering richness
}

export interface SubstitutionNote {
  original: string;
  substitutedWith: string;
  scientificReason: string;
  compoundsShared?: string[];
}

export interface SourcingFriction {
  item: string;
  difficulty: 'Easy everywhere' | 'Moderate' | 'Hard to find';
  practicalAlternative: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  technique: string;
  activeDurationMin: number;
  scientificTip?: string;
}

export interface RecipeEcho {
  id: string;
  title: string;
  subtitle: string;
  originEra: string;
  parentEchoId?: string;
  parentTitle?: string;
  author: {
    name: string;
    location: string;
    year: string;
  };
  tasteMemoryDescription: string;
  imageUrl: string;
  category: 'Braises & Stews' | 'Grains & Broths' | 'Vegetables & Legumes' | 'Quick Hearth';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  stepsCount: number;
  difficulty: 'Minimal' | 'Moderate' | 'Involved';
  wasteReductionScore: number; // 0-100
  coreFlavorSpine: string[]; // key flavor markers e.g. ["Charred Allium", "Lactic Acidity", "Glutamate Umami"]
  sharedKeyCompounds: string[]; // e.g. ["Methional", "Pyrazines", "Glutamic Acid"]
  flavorRadar: FlavorRadarData;
  ingredients: {
    item: string;
    amount: string;
    category: string;
    role: 'Aroma Core' | 'Bulk/Body' | 'Acid Balance' | 'Umami Anchor' | 'Finish/Texture';
    substitutableWith?: string[];
  }[];
  steps: RecipeStep[];
  tastingNotes: {
    flavor: string;
    aroma: string;
    texture: string;
    finish: string;
  };
  realWorldNotes: {
    substitutionsUsed: SubstitutionNote[];
    sourcingFriction: SourcingFriction[];
    tastingVerdict: string;
  };
  drinkPairingEcho?: {
    name: string;
    type: 'Cocktail' | 'Botanical Infusion' | 'Fermented Soda';
    sharedAromaCompounds: string[];
    recipe: string;
  };
  visibility: 'private' | 'community' | 'open_archive';
  adaptationsCount: number;
  generationDepth: number;
  createdAt: string;
}

export interface AdaptationResult {
  title: string;
  summary: string;
  preservedFlavorSpine: string[];
  wasteRiskItemsUsed: string[];
  pantryItemsUsed: string[];
  minimalStepCount: number;
  totalTimeMinutes: number;
  wasteReductionScore: number;
  flavorFidelityScore: number;
  flavorRadar: FlavorRadarData;
  substitutions: SubstitutionNote[];
  ingredients: { item: string; amount: string; role: string; fromPantry: boolean }[];
  steps: RecipeStep[];
  computationalReasoning: string;
}

export interface ReverseRecreationResult {
  recreatedTitle: string;
  interpretedSensoryGoal: string;
  coreFlavorCompounds: string[];
  mostAccessibleIngredients: { item: string; amount: string; reason: string }[];
  fewestStepsMethod: RecipeStep[];
  tasteEquilibriumTips: string[];
  flavorRadar: FlavorRadarData;
  drinkPairing?: {
    name: string;
    type: string;
    notes: string;
    ingredients: string[];
  };
}
