import { RecipeEcho, PantryItem } from '../types';

export const INITIAL_PANTRY: PantryItem[] = [
  { id: 'p1', name: 'Overripe Heirloom Tomatoes', category: 'Produce', isWasteRisk: true, notes: 'Softening fast, high glutamate potential' },
  { id: 'p2', name: 'Wilting Fresh Cilantro & Stems', category: 'Herb/Spice', isWasteRisk: true, notes: 'Stems contain high linalool aromatics' },
  { id: 'p3', name: 'Open Can Coconut Milk (half full)', category: 'Dairy/Alternative', isWasteRisk: true, notes: 'Needs use in 2 days' },
  { id: 'p4', name: 'Stale Sourdough Heel', category: 'Pantry Staple', isWasteRisk: true, notes: 'Ideal for panada, pangrattato, or thickener' },
  { id: 'p5', name: 'Yellow Onions', category: 'Produce' },
  { id: 'p6', name: 'Garlic Cloves', category: 'Produce' },
  { id: 'p7', name: 'Extra Virgin Olive Oil', category: 'Condiment' },
  { id: 'p8', name: 'Soy Sauce / Tamari', category: 'Condiment' },
  { id: 'p9', name: 'Dried Brown Lentils', category: 'Pantry Staple' },
  { id: 'p10', name: 'Short-Grain Rice', category: 'Pantry Staple' },
  { id: 'p11', name: 'Smoked Paprika', category: 'Herb/Spice' },
  { id: 'p12', name: 'Lemons', category: 'Produce' },
  { id: 'p13', name: 'White Miso Paste', category: 'Condiment' },
  { id: 'p14', name: 'Canned Cannellini Beans', category: 'Pantry Staple' }
];

export const INITIAL_ECHOES: RecipeEcho[] = [
  {
    id: 'echo-hearth-tomato',
    title: 'Wood-Fired Hearth Tomato & Charred Allium Braise',
    subtitle: 'Living Calabrian-Levantine heirloom adapted for cast-iron stovetops',
    originEra: '1968 Calabria → 2026 Kitchen Echo',
    author: {
      name: 'Adelina & Marcus Conti',
      location: 'Cosenza / Montreal',
      year: '1968 / 2026'
    },
    tasteMemoryDescription: 'Deep blistered tomato sweetness fused with smoky charred garlic, balanced by a sharp wine vinegar reduction and peppery bay leaf aroma.',
    imageUrl: '/src/assets/images/recipe_wood_fired_stew_1793248247403.jpg',
    category: 'Braises & Stews',
    prepTimeMinutes: 8,
    cookTimeMinutes: 22,
    stepsCount: 4,
    difficulty: 'Minimal',
    wasteReductionScore: 92,
    coreFlavorSpine: ['Deep Charred Allium', 'Concentrated Lycopene & Glutamate', 'Warm Acetic Snap', 'Eugenol Spice Note'],
    sharedKeyCompounds: ['Guaiacol (Smoky)', 'Glutamic Acid (Savory)', 'Dimethyl Trisulfide (Roasted Allium)', 'Eugenol (Warm Herbaceous)'],
    flavorRadar: {
      umami: 8.5,
      sweetness: 6.2,
      acidity: 7.8,
      salinity: 6.0,
      bitterness: 2.5,
      pungency: 4.0,
      aromaIntensity: 9.0,
      kokumi: 8.0
    },
    ingredients: [
      { item: 'Overripe tomatoes or canned whole peeled', amount: '600g', category: 'Produce', role: 'Umami Anchor', substitutableWith: ['Roasted canned plum tomatoes', 'Tomato paste + broth'] },
      { item: 'Yellow onions, quartered & charred', amount: '2 medium', category: 'Produce', role: 'Aroma Core', substitutableWith: ['Shallots', 'Leeks', 'Scallion whites'] },
      { item: 'Garlic cloves, smashed in skin', amount: '5 cloves', category: 'Produce', role: 'Aroma Core' },
      { item: 'Olive oil or browned butter', amount: '3 tbsp', category: 'Condiment', role: 'Bulk/Body' },
      { item: 'Red wine vinegar or apple cider vinegar', amount: '1.5 tbsp', category: 'Condiment', role: 'Acid Balance' },
      { item: 'Stale bread heel or toasted seeds', amount: '1 thick slice', category: 'Pantry Staple', role: 'Finish/Texture' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sear quartered onions cut-side down in dry cast iron over high heat for 3 minutes until blackened edges develop.',
        technique: 'Dry High-Heat Charring',
        activeDurationMin: 3,
        scientificTip: 'Pyrazine and furaneol formation mimic hearth wood smoke without outdoor fire.'
      },
      {
        stepNumber: 2,
        instruction: 'Lower heat, pour olive oil and smashed garlic cloves; swirl 60 seconds until fragrant.',
        technique: 'Fat-Soluble Aroma Extraction',
        activeDurationMin: 1
      },
      {
        stepNumber: 3,
        instruction: 'Add crushed overripe tomatoes and a pinch of salt. Deglaze the pan fond and simmer vigorously uncovered for 14 minutes.',
        technique: 'Glutamate Concentration Reduction',
        activeDurationMin: 2,
        scientificTip: 'Evaporating moisture elevates natural free glutamates by over 40%.'
      },
      {
        stepNumber: 4,
        instruction: 'Stir in vinegar at the final moment; tear stale bread directly over the bubbling stew to soak up the concentrated tomato liquor.',
        technique: 'Acid Flashing & Starch Emulsion',
        activeDurationMin: 2
      }
    ],
    tastingNotes: {
      flavor: 'Intensely savory and caramelized with a vibrant, tongue-cleansing acetic finish.',
      aroma: 'Sweet charred wood smoke, toasted garlic, and floral roasted tomato skins.',
      texture: 'Velvety sauce clinging to crisp-chewy soaked sourdough fragments.',
      finish: 'Long-lingering kokumi with subtle peppery warmth.'
    },
    realWorldNotes: {
      substitutionsUsed: [
        {
          original: 'Wood-fired oven roasting',
          substitutedWith: 'Cast-iron dry char on gas or induction',
          scientificReason: 'Pyrazines generated at 180°C cast-iron match wood embers.'
        },
        {
          original: 'Calabrian Tropea sweet onions',
          substitutedWith: 'Standard yellow onions + pinch of brown sugar',
          scientificReason: 'Replaces fructose curve while maintaining sulfur compounds.'
        }
      ],
      sourcingFriction: [
        {
          item: 'Calabrian wild oregano',
          difficulty: 'Hard to find',
          practicalAlternative: 'Dried domestic oregano + pinch of cracked coriander'
        }
      ],
      tastingVerdict: 'Preserves 95% of the ancestral wood-fired emotional resonance while taking under 25 minutes.'
    },
    drinkPairingEcho: {
      name: 'Smoked Rosemary Citrus Highball',
      type: 'Botanical Infusion',
      sharedAromaCompounds: ['Guaiacol', 'Pinene', 'Citric Acid'],
      recipe: 'Lightly torch a sprig of rosemary, drop into sparkling water over ice with 2 dashes Angostura and fresh lemon zest.'
    },
    visibility: 'open_archive',
    adaptationsCount: 14,
    generationDepth: 2,
    createdAt: '2026-03-12'
  },
  {
    id: 'echo-golden-broth',
    title: 'Golden Mushroom & Toasted Allium Broth',
    subtitle: 'A clean umami siphon bridging Kyoto dashi and Western root cellars',
    originEra: '1984 Kyoto → 2025 Winter Pantry Echo',
    author: {
      name: 'Sora Takahashi & Elena Vane',
      location: 'Kyoto / Bristol',
      year: '1984 / 2025'
    },
    tasteMemoryDescription: 'Golden clarity with resonant mushroom earthiness, warm ginger spice, and delicate allium sweetness that settles in the chest.',
    imageUrl: '/src/assets/images/recipe_aromatic_broth_1793248248012.jpg',
    category: 'Grains & Broths',
    prepTimeMinutes: 5,
    cookTimeMinutes: 18,
    stepsCount: 3,
    difficulty: 'Minimal',
    wasteReductionScore: 96,
    coreFlavorSpine: ['Synergistic Guanylate + Glutamate', 'Volatile Gingerol', 'Toasted Allium Aromatics'],
    sharedKeyCompounds: ['1-Octen-3-ol (Mushroom)', 'Guanylic Acid', 'Zingiberene', 'Methional (Savory Potato/Broth)'],
    flavorRadar: {
      umami: 9.2,
      sweetness: 3.5,
      acidity: 4.0,
      salinity: 6.8,
      bitterness: 1.8,
      pungency: 4.8,
      aromaIntensity: 8.8,
      kokumi: 8.9
    },
    ingredients: [
      { item: 'Dried mushrooms or fresh mushroom trimmings', amount: '25g dried (or 150g fresh stems)', category: 'Produce', role: 'Umami Anchor', substitutableWith: ['White miso + soy sauce', 'Dried porcini'] },
      { item: 'Onion peels or scallion green ends', amount: '1 cup collected trimmings', category: 'Produce', role: 'Aroma Core' },
      { item: 'Fresh ginger root, coins with skin on', amount: '25g', category: 'Produce', role: 'Aroma Core' },
      { item: 'Soy sauce or Tamari', amount: '2 tbsp', category: 'Condiment', role: 'Umami Anchor' },
      { item: 'Toasted sesame oil', amount: '1 tsp', category: 'Condiment', role: 'Finish/Texture' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Lightly toast dried mushroom pieces and sliced ginger in a dry pot for 90 seconds until nutty aromas lift.',
        technique: 'Dry Aroma Bloom',
        activeDurationMin: 2
      },
      {
        stepNumber: 2,
        instruction: 'Add 4 cups cold water, onion ends/scallion greens, and bring to a gentle simmer just below rolling boil (85°C) for 15 minutes.',
        technique: 'Sub-Boiling Umami Extraction',
        activeDurationMin: 1,
        scientificTip: 'Keeping below 90°C extracts pure guanylate without pulling harsh bitter saponins.'
      },
      {
        stepNumber: 3,
        instruction: 'Strain through a mesh strainer, press solids lightly, and season with soy sauce and a drop of toasted sesame oil.',
        technique: 'Finishing Seasoning',
        activeDurationMin: 2
      }
    ],
    tastingNotes: {
      flavor: 'Deeply rounded, crystalline savoriness with a gentle peppery throat-warming glow.',
      aroma: 'Forest floor, toasted sesame seeds, and steamed sweet allium.',
      texture: 'Silk-light broth with clean tongue slip.',
      finish: 'Resonant, long-lasting savory hum without heaviness.'
    },
    realWorldNotes: {
      substitutionsUsed: [
        {
          original: 'Kombu kelp and katsuobushi',
          substitutedWith: 'Mushroom trimmings + Tamari',
          scientificReason: 'Tamari glutamates + mushroom guanylates achieve the identical 8x umami synergy multiplier.'
        }
      ],
      sourcingFriction: [
        {
          item: 'Japanese Kombu seaweed',
          difficulty: 'Moderate',
          practicalAlternative: 'Dried button mushroom caps + pinch of green tea leaves'
        }
      ],
      tastingVerdict: 'Astoundingly clean; rescues mushroom stems that usually end in compost.'
    },
    drinkPairingEcho: {
      name: 'Toasted Rice & Scallion Tea',
      type: 'Botanical Infusion',
      sharedAromaCompounds: ['2-Acetyl-1-pyrroline', 'Methional'],
      recipe: 'Steep Genmaicha or toasted white rice grains with one bruised scallion green in 80°C water for 3 minutes.'
    },
    visibility: 'open_archive',
    adaptationsCount: 19,
    generationDepth: 3,
    createdAt: '2026-02-19'
  },
  {
    id: 'echo-charred-grain-bowl',
    title: 'Ancient Spiced Grain Pilaf with Roasted Squash & Herb Emulsion',
    subtitle: 'Frugal Mediterranean hearth adaptation using grain bin odds & ends',
    originEra: '1975 Aleppo → 2026 Living Echo',
    author: {
      name: 'Layla Kabbaz & Julien Roy',
      location: 'Aleppo / Lyon',
      year: '1975 / 2026'
    },
    tasteMemoryDescription: 'Nutty cracked grains toasted in warm spiced oil, crowned with caramelized squash and a sharp green herb blitz that wakes up every bite.',
    imageUrl: '/src/assets/images/recipe_charred_grain_bowl_1793248247950.jpg',
    category: 'Vegetables & Legumes',
    prepTimeMinutes: 7,
    cookTimeMinutes: 20,
    stepsCount: 4,
    difficulty: 'Minimal',
    wasteReductionScore: 89,
    coreFlavorSpine: ['Toasted Seed Pyrazines', 'Cumin Cuminaldehyde Bloom', 'Herbaceous Linalool Lift', 'Caramelized Pectin'],
    sharedKeyCompounds: ['Cuminaldehyde', 'Linalool', 'Pyrazines', 'Cinnamic Aldehyde'],
    flavorRadar: {
      umami: 6.8,
      sweetness: 7.2,
      acidity: 6.5,
      salinity: 5.5,
      bitterness: 3.2,
      pungency: 5.2,
      aromaIntensity: 8.5,
      kokumi: 7.4
    },
    ingredients: [
      { item: 'Any firm grain (farro, brown rice, barley, or bulgur)', amount: '1 cup', category: 'Pantry Staple', role: 'Bulk/Body' },
      { item: 'Winter squash or carrots, cubed', amount: '300g', category: 'Produce', role: 'Bulk/Body', substitutableWith: ['Sweet potato', 'Butternut squash'] },
      { item: 'Cumin seeds or ground cumin', amount: '1 tsp', category: 'Herb/Spice', role: 'Aroma Core' },
      { item: 'Wilting herb ends (cilantro, parsley, dill)', amount: '1 packed cup', category: 'Produce', role: 'Aroma Core', substitutableWith: ['Celery leaves', 'Carrot tops'] },
      { item: 'Lemon juice or white wine vinegar', amount: '2 tbsp', category: 'Produce', role: 'Acid Balance' },
      { item: 'Toasted sunflower or pumpkin seeds', amount: '2 tbsp', category: 'Pantry Staple', role: 'Finish/Texture' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Toss squash cubes with olive oil and cumin in a hot pan; sear undisturbed for 5 minutes until deeply caramelized.',
        technique: 'Direct Contact Caramelization',
        activeDurationMin: 5
      },
      {
        stepNumber: 2,
        instruction: 'Add grains and toast dry in the remaining pan fat for 2 minutes until crackling and fragrant.',
        technique: 'Lipophilic Grain Blooming',
        activeDurationMin: 2
      },
      {
        stepNumber: 3,
        instruction: 'Pour in 2 cups boiling water or broth, cover tightly, and simmer 14 minutes until tender.',
        technique: 'Steam Absorption',
        activeDurationMin: 1
      },
      {
        stepNumber: 4,
        instruction: 'Roughly chop wilted herb stems and leaves with lemon juice, salt, and olive oil into a quick rustic salsa; spoon over grains.',
        technique: 'Cold Acid Herb Emulsion',
        activeDurationMin: 2
      }
    ],
    tastingNotes: {
      flavor: 'Earthy, comforting sweetness balanced by radiant herbal acidity and crackling toasted crunch.',
      aroma: 'Toasted cumin, grassy fresh herbs, and browned squash caramel.',
      texture: 'Chewy resilient grains contrasting with tender melting squash and crunchy seeds.',
      finish: 'Clean lemon brightness lingering after deep grain warmth.'
    },
    realWorldNotes: {
      substitutionsUsed: [
        {
          original: 'Syrian freekeh (green smoked wheat)',
          substitutedWith: 'Toasted pearled barley + pinch of smoked paprika',
          scientificReason: 'Barley matches the viscous mouthfeel while smoked paprika contributes identical guaiacol smoke notes.'
        }
      ],
      sourcingFriction: [
        {
          item: 'Whole freekeh',
          difficulty: 'Hard to find',
          practicalAlternative: 'Brown rice or bulgur + pinch of smoked salt'
        }
      ],
      tastingVerdict: 'A triumphant weeknight pantry anchor that brings wilted green herbs back from the brink.'
    },
    drinkPairingEcho: {
      name: 'Spiced Pomegranate & Thyme Fizz',
      type: 'Fermented Soda',
      sharedAromaCompounds: ['Cuminaldehyde', 'Thymol', 'Malic Acid'],
      recipe: 'Stir 1 part pomegranate juice with 3 parts soda water and a bruised sprig of fresh thyme.'
    },
    visibility: 'open_archive',
    adaptationsCount: 8,
    generationDepth: 1,
    createdAt: '2026-04-01'
  }
];

export interface FlavorCompoundInfo {
  compound: string;
  chemicalClass: string;
  aromaDescriptor: string;
  naturalSources: string[];
  pairingAllies: string[];
  culinaryFunction: string;
}

export const FLAVOR_COMPOUNDS: FlavorCompoundInfo[] = [
  {
    compound: 'Pyrazines',
    chemicalClass: 'Heterocyclic Aromatics',
    aromaDescriptor: 'Toasted, nutty, roasted grain, browned crust, cocoa, earthy',
    naturalSources: ['Seared onions', 'Toasted sesame', 'Roasted barley', 'Coffee', 'Chocolate', 'Seared mushrooms'],
    pairingAllies: ['Soy sauce', 'Aged cheese', 'Cumin', 'Browned butter'],
    culinaryFunction: 'Created through Maillard heat; gives quick stovetop braises the sensation of wood-fired hearth cooking.'
  },
  {
    compound: 'Glutamic Acid (Glutamates)',
    chemicalClass: 'Amino Acid',
    aromaDescriptor: 'Pure savory umami, mouth-watering fullness, depth',
    naturalSources: ['Ripe tomatoes', 'Aged parmesan', 'Soy sauce/Tamari', 'Miso', 'Mushrooms', 'Fermented fish sauce'],
    pairingAllies: ['Guanylic acid (mushrooms)', 'Inosinic acid (cured meat/fish)', 'Aged garlic'],
    culinaryFunction: 'Synergizes exponentially with nucleotides to build intense savory backbone without heavy salt.'
  },
  {
    compound: 'Eugenol',
    chemicalClass: 'Phenylpropanoid',
    aromaDescriptor: 'Warm, sweet, clove-like, woody, spicy floral',
    naturalSources: ['Basil', 'Cloves', 'Cinnamon', 'Bay leaf', 'Allspice', 'Nutmeg'],
    pairingAllies: ['Tomatoes', 'Red wine', 'Roasted pumpkin', 'Apples'],
    culinaryFunction: 'Connects Mediterranean tomato sauces with warm winter braises and spiced teas.'
  },
  {
    compound: 'Guaiacol',
    chemicalClass: 'Phenol',
    aromaDescriptor: 'Smoky, charred wood, bacon-like, roasted coffee',
    naturalSources: ['Smoked paprika', 'Wood embers', 'Charred alliums', 'Whiskey', 'Roasted seeds'],
    pairingAllies: ['Roasted garlic', 'Brown sugar', 'Lentils', 'Tomatoes'],
    culinaryFunction: 'Allows recreating wood-fired, smoke-house memories with a quick cast-iron char.'
  },
  {
    compound: 'Linalool',
    chemicalClass: 'Terpene Alcohol',
    aromaDescriptor: 'Fresh floral, sweet citrus peel, woody herb, lavender-coriander',
    naturalSources: ['Cilantro stems', 'Coriander seeds', 'Lemon zest', 'Basil', 'Thyme', 'Hops'],
    pairingAllies: ['Ginger', 'Garlic', 'Chili', 'Coconut milk'],
    culinaryFunction: 'Lifts dense, heavy braises with an uplifting aromatic top note that hits the olfactory palate first.'
  },
  {
    compound: '1-Octen-3-ol',
    chemicalClass: 'Unsaturated Alcohol',
    aromaDescriptor: 'Forest floor, raw and dried mushroom, damp moss, autumnal',
    naturalSources: ['Shiitake stems', 'Porcini', 'Button mushrooms', 'Elderflower', 'Camembert'],
    pairingAllies: ['Toasted alliums', 'Thyme', 'Soy sauce', 'Butter'],
    culinaryFunction: 'The signature mushroom note; creates earthy rustic depth even when using humble button mushroom ends.'
  },
  {
    compound: 'Cuminaldehyde',
    chemicalClass: 'Aromatic Aldehyde',
    aromaDescriptor: 'Warm, pungent, earthy spice, desert herb, bittersweet',
    naturalSources: ['Cumin seeds', 'Caraway', 'Eucalyptus', 'Coriander'],
    pairingAllies: ['Lemon', 'Garlic', 'Lentils', 'Carrots', 'Lamb/Eggplant'],
    culinaryFunction: 'Cuts through starchy pulses and root vegetables, accelerating salivation.'
  },
  {
    compound: 'Methional',
    chemicalClass: 'Sulfur-containing Aldehyde',
    aromaDescriptor: 'Boiled potato, savory broth, rich umami soup, comforting warm cereal',
    naturalSources: ['Cooked potatoes', 'Tomato broth', 'Soy sauce', 'Cheddar cheese', 'Beer'],
    pairingAllies: ['Miso', 'Mushrooms', 'Onions', 'Butter'],
    culinaryFunction: 'The primal compound of home-cooked broth and warm comfort meals across generations.'
  }
];
