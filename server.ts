import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint 1: Adaptive Cooking Generation
app.post('/api/adapt-cooking', async (req: Request, res: Response) => {
  try {
    const {
      pantryIngredients = [],
      wasteRiskIngredients = [],
      baseRecipeTitle,
      tasteGoalOrMemory,
      simplicity = 'Minimal Steps',
    } = req.body;

    const availableList = [...pantryIngredients, ...wasteRiskIngredients].filter(Boolean);

    if (ai) {
      const prompt = `You are the computational gastronomy engine for "Culinary Echo", a system designed to help home cooks adapt recipes using what they have right now, prioritizing waste reduction and minimal steps while preserving the core flavor spine.

Context:
- Ingredients in kitchen: ${availableList.join(', ') || 'Standard pantry staples'}
- High-priority waste-risk items to rescue: ${wasteRiskIngredients.join(', ') || 'None specified'}
- Desired base dish or taste memory: ${baseRecipeTitle || tasteGoalOrMemory || 'Comforting savory dinner'}
- Simplicity target: ${simplicity} (e.g. 3-4 steps max, common kitchen cookware)

Generate a high-fidelity adaptation following computational gastronomy principles (matching shared molecular compounds like pyrazines, glutamates, linalool, acids).

Respond ONLY with valid JSON in this exact structure:
{
  "title": "Clean, descriptive dish title",
  "summary": "1-2 sentence human explanation of how this adapts the flavor using current items",
  "preservedFlavorSpine": ["Flavor Note 1", "Flavor Note 2", "Flavor Note 3"],
  "wasteRiskItemsUsed": ["Item 1"],
  "pantryItemsUsed": ["Item 1", "Item 2"],
  "minimalStepCount": 4,
  "totalTimeMinutes": 25,
  "wasteReductionScore": 92,
  "flavorFidelityScore": 90,
  "flavorRadar": {
    "umami": 8.0,
    "sweetness": 5.5,
    "acidity": 6.5,
    "salinity": 6.0,
    "bitterness": 2.0,
    "pungency": 4.0,
    "aromaIntensity": 8.5,
    "kokumi": 7.5
  },
  "substitutions": [
    {
      "original": "Traditional ingredient",
      "substitutedWith": "Available ingredient used",
      "scientificReason": "Concise molecular or taste equilibrium explanation (e.g. why pyrazines or glutamates match)",
      "compoundsShared": ["Compound A", "Compound B"]
    }
  ],
  "ingredients": [
    { "item": "Name of ingredient", "amount": "quantity", "role": "Umami Anchor | Aroma Core | Acid Balance | Bulk/Body | Finish/Texture", "fromPantry": true }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "Clear active instruction using plain kitchen language.",
      "technique": "Name of technique (e.g. Dry Pan Charring, Deglazing)",
      "activeDurationMin": 3,
      "scientificTip": "Short culinary science tip"
    }
  ],
  "computationalReasoning": "Why this specific adaptation succeeds in preserving the original soul with minimal effort."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (parseErr) {
        console.warn('Failed to parse Gemini JSON, falling back:', parseErr);
      }
    }

    // Deterministic Gastronomy Fallback if no AI or parse error
    const rescued = wasteRiskIngredients.length > 0 ? wasteRiskIngredients : ['Available pantry produce'];
    return res.json({
      title: baseRecipeTitle
        ? `${baseRecipeTitle} (Pantry Cast-Iron Echo)`
        : `Simmered ${rescued[0] || 'Allium'} & Hearth Pan Echo`,
      summary: `Adapted to preserve the deep roasted savory backbone using your ${rescued.join(' and ')} with minimal active stovetop time.`,
      preservedFlavorSpine: ['Concentrated Glutamate Depth', 'Toasted Allium Pyrazines', 'Crisp Finishing Acidity'],
      wasteRiskItemsUsed: wasteRiskIngredients,
      pantryItemsUsed: pantryIngredients.slice(0, 4),
      minimalStepCount: 3,
      totalTimeMinutes: 20,
      wasteReductionScore: 94,
      flavorFidelityScore: 88,
      flavorRadar: {
        umami: 8.4,
        sweetness: 5.8,
        acidity: 7.0,
        salinity: 6.0,
        bitterness: 2.2,
        pungency: 4.5,
        aromaIntensity: 8.6,
        kokumi: 8.0,
      },
      substitutions: [
        {
          original: 'Slow simmered broth reduction',
          substitutedWith: 'Dry pan sear fond deglazed with touch of vinegar/soy',
          scientificReason: 'Rapid caramelization mimics 4-hour simmering by generating Maillard pyrazines in 3 minutes.',
          compoundsShared: ['Guaiacol', 'Glutamic Acid'],
        },
      ],
      ingredients: [
        { item: rescued[0] || 'Tomatoes or seasonal vegetables', amount: '350g', role: 'Umami Anchor', fromPantry: true },
        { item: 'Garlic or Alliums', amount: '3 cloves', role: 'Aroma Core', fromPantry: true },
        { item: 'Olive oil or butter', amount: '2 tbsp', role: 'Bulk/Body', fromPantry: true },
        { item: 'Vinegar or lemon juice', amount: '1 tbsp', role: 'Acid Balance', fromPantry: true },
        { item: 'Stale bread or toasted seeds', amount: 'handful', role: 'Finish/Texture', fromPantry: true },
      ],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Heat a dry skillet over medium-high. Add quartered alliums cut-side down; sear without stirring for 3 minutes until blistered.',
          technique: 'Direct Contact Pyrazine Bloom',
          activeDurationMin: 3,
          scientificTip: 'Blistering creates heterocyclic aromatics that simulate long wood-fired roasting.',
        },
        {
          stepNumber: 2,
          instruction: 'Add oil, garlic, and your rescued vegetables. Season lightly and simmer covered for 12 minutes until vegetables collapse into a rich pan sauce.',
          technique: 'Pectin Breakdown & Glutamate Extraction',
          activeDurationMin: 2,
          scientificTip: 'Heat breaks down pectin cell walls, concentrating natural glutamic acids.',
        },
        {
          stepNumber: 3,
          instruction: 'Splash with vinegar to release the caramelized fond; fold in toasted bread pieces or grains to bind the glossy juices.',
          technique: 'Acid Flashing & Emulsion',
          activeDurationMin: 2,
          scientificTip: 'Acids brighten volatile aromatics right as the heat is turned off.',
        },
      ],
      computationalReasoning: 'Balances high glutamate produce with acetic acid and Maillard compounds to replicate heirloom hearth depth.',
    });
  } catch (error: any) {
    console.error('Error in /api/adapt-cooking:', error);
    res.status(500).json({ error: 'Failed to generate adaptation', details: error.message });
  }
});

// Endpoint 2: Reverse Recreation (Timeless Utility)
app.post('/api/reverse-recreate', async (req: Request, res: Response) => {
  try {
    const { sensoryDescription = '', availableItems = [] } = req.body;

    if (ai && sensoryDescription) {
      const prompt = `You are the reverse recreation computational gastronomy engine for "Culinary Echo".
User input memory/scent/dish: "${sensoryDescription}".
Available items (optional context): ${availableItems.join(', ') || 'Standard pantry'}.

Goal:
Reverse engineer this taste or aroma into a practical recreation using the FEWEST STEPS (max 3-4 steps) and the MOST COMMONLY ACCESSIBLE ingredients found in standard grocery stores.

Respond ONLY with valid JSON in this exact structure:
{
  "recreatedTitle": "Evocative, direct recipe name",
  "interpretedSensoryGoal": "1-2 sentences capturing the exact taste/smell memory essence",
  "coreFlavorCompounds": ["Compound 1", "Compound 2", "Compound 3"],
  "mostAccessibleIngredients": [
    { "item": "Accessible ingredient name", "amount": "measurement", "reason": "Why this common item stands in for complex/rare elements" }
  ],
  "fewestStepsMethod": [
    {
      "stepNumber": 1,
      "instruction": "Step instruction",
      "technique": "Technique name",
      "activeDurationMin": 3,
      "scientificTip": "Why this short cut works scientifically"
    }
  ],
  "tasteEquilibriumTips": [
    "Tip 1 for tuning sweet/acid balance",
    "Tip 2 for texture"
  ],
  "flavorRadar": {
    "umami": 8.0,
    "sweetness": 6.0,
    "acidity": 7.0,
    "salinity": 6.0,
    "bitterness": 2.0,
    "pungency": 4.0,
    "aromaIntensity": 8.5,
    "kokumi": 7.5
  },
  "drinkPairing": {
    "name": "Pairing name",
    "type": "Cocktail or Botanical Infusion",
    "notes": "Aromatic harmonic match",
    "ingredients": ["Ingredient 1", "Ingredient 2"]
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } catch (parseErr) {
        console.warn('Failed to parse Gemini JSON, falling back:', parseErr);
      }
    }

    // Deterministic Fallback
    return res.json({
      recreatedTitle: `Recreated: ${sensoryDescription.slice(0, 36) || 'Memory Echo Simmer'}`,
      interpretedSensoryGoal: `Captures the rustic warmth, Maillard caramelization, and bright aromatic finish described in "${sensoryDescription.slice(0, 60)}".`,
      coreFlavorCompounds: ['Guaiacol (Charred Embers)', 'Glutamic Acid (Savory Backbone)', 'Linalool (Herbal Lift)'],
      mostAccessibleIngredients: [
        { item: 'Canned crushed tomatoes or tomato paste', amount: '1 tin (400g)', reason: 'High natural glutamate density replicates long-simmered sauces in minutes.' },
        { item: 'Yellow onion & garlic', amount: '1 onion, 4 cloves', reason: 'Pan-charred alliums deliver rich sulfurous pyrazines.' },
        { item: 'Smoked paprika + soy sauce', amount: '1 tsp each', reason: 'Guaiacol smoke + free amino acids replicate open-fire roasting.' },
        { item: 'Apple cider vinegar or lemon', amount: '1 tbsp', reason: 'Balances deep sugars with sharp acetic/citric acidity.' },
        { item: 'Butter or olive oil', amount: '2 tbsp', reason: 'Fat medium carries fat-soluble aromatic volatiles.' },
      ],
      fewestStepsMethod: [
        {
          stepNumber: 1,
          instruction: 'Caramelize onions in oil with a pinch of salt over high heat for 4 minutes until dark amber on edges; stir in garlic and smoked paprika for 30 seconds.',
          technique: 'Accelerated Pyrazine Caramelization',
          activeDurationMin: 4,
          scientificTip: 'High heat accelerates Maillard reactions without burning when moisture is kept close.',
        },
        {
          stepNumber: 2,
          instruction: 'Stir in tomato paste or crushed tomatoes and soy sauce. Simmer briskly for 8 minutes to evaporate water and intensify savory glutamates.',
          technique: 'Glutamate Condensation',
          activeDurationMin: 2,
          scientificTip: 'Condensing tomato solids creates identical mouthfeel to an all-day slow stew.',
        },
        {
          stepNumber: 3,
          instruction: 'Turn off heat, stir in vinegar and cold butter for a glossy emulsion; finish with fresh herbs or black pepper.',
          technique: 'Cold Fat Emulsion & Acid Snap',
          activeDurationMin: 2,
          scientificTip: 'Cold butter coats the palate, extending flavor persistence (kokumi).',
        },
      ],
      tasteEquilibriumTips: [
        'If too sharp, whisk in a teaspoon of honey or brown sugar to soften the acetic acid curve.',
        'If flat, a single drop of soy sauce or Worcestershire elevates umami depth instantly.',
      ],
      flavorRadar: {
        umami: 8.8,
        sweetness: 5.9,
        acidity: 7.2,
        salinity: 6.1,
        bitterness: 2.0,
        pungency: 4.2,
        aromaIntensity: 8.9,
        kokumi: 8.2,
      },
      drinkPairing: {
        name: 'Charred Citrus Tonic',
        type: 'Botanical Infusion',
        notes: 'Matches the smokiness and balances the rich palate with quinine brightness.',
        ingredients: ['Tonic water', 'Torched orange peel', 'Dash of aromatic bitters', 'Ice'],
      },
    });
  } catch (error: any) {
    console.error('Error in /api/reverse-recreate:', error);
    res.status(500).json({ error: 'Failed to reverse recreate', details: error.message });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Culinary Echo full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
