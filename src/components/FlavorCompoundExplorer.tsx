import React, { useState } from 'react';
import { FLAVOR_COMPOUNDS, FlavorCompoundInfo } from '../data/culinaryDatabase';
import { Sparkles, Dna, ArrowRight, ShieldCheck, Info } from 'lucide-react';

const COMMON_INGREDIENTS = [
  'Ripe Tomato',
  'White Miso Paste',
  'Soy Sauce / Tamari',
  'Dried Shiitake / Button Mushrooms',
  'Yellow Onion',
  'Garlic',
  'Toasted Sesame',
  'Smoked Paprika',
  'Fresh Basil / Cilantro',
  'Lemon Zest / Juice',
  'Aged Parmesan / Hard Cheese',
  'Cumin Seed',
  'Black Tea / Genmaicha',
  'Butter / Olive Oil'
];

interface PairingAnalysis {
  itemA: string;
  itemB: string;
  sharedVolatiles: string[];
  scientificMechanism: string;
  culinaryApplication: string;
  synergyScore: number;
}

const PRECOMPUTED_PAIRINGS: Record<string, PairingAnalysis> = {
  'Ripe Tomato+White Miso Paste': {
    itemA: 'Ripe Tomato',
    itemB: 'White Miso Paste',
    sharedVolatiles: ['Glutamic Acid (Glutamates)', 'Methional', 'Isovaleric acid notes'],
    scientificMechanism: 'Dual glutamate synergy: fermented rice/soy koji provides hydrolyzed amino acids that stack onto the free glutamates in cooked tomato solids, expanding umami breadth.',
    culinaryApplication: 'Stir a tablespoon of white miso into tomato paste before deglazing to replicate the depth of a 4-hour meat ragù in 10 minutes.',
    synergyScore: 96,
  },
  'Ripe Tomato+Soy Sauce / Tamari': {
    itemA: 'Ripe Tomato',
    itemB: 'Soy Sauce / Tamari',
    sharedVolatiles: ['Glutamic Acid', 'Furaneol', 'Methional (Savory broth)'],
    scientificMechanism: 'Shared furanones and intense amino acid concentrations simulate prolonged Maillard browning without requiring high dry oven heat.',
    culinaryApplication: 'A splash of Tamari into simmering canned tomatoes eliminates acidic tinny notes and grounds the sauce in deep wood-fired savoriness.',
    synergyScore: 94,
  },
  'Dried Shiitake / Button Mushrooms+Soy Sauce / Tamari': {
    itemA: 'Dried Shiitake / Button Mushrooms',
    itemB: 'Soy Sauce / Tamari',
    sharedVolatiles: ['Guanylic Acid', 'Glutamic Acid', '1-Octen-3-ol', 'Methional'],
    scientificMechanism: 'The legendary 8x Umami Multiplier: Guanylate nucleotides from fungal cell walls physically bind to T1R1/T1R3 tongue receptors, locking glutamate molecules in place longer.',
    culinaryApplication: 'Foundational broth for zero-waste soups; saves vegetable scraps and delivers immediate mouth-coating richness.',
    synergyScore: 98,
  },
  'Yellow Onion+Smoked Paprika': {
    itemA: 'Yellow Onion',
    itemB: 'Smoked Paprika',
    sharedVolatiles: ['Guaiacol', 'Dimethyl Trisulfide', 'Pyrazines'],
    scientificMechanism: 'Guaiacol smoke compounds fuse with the alliin/allicin degradation sulfur compounds in caramelized alliums to match open charcoal embers.',
    culinaryApplication: 'Bloom smoked paprika directly into seared onions to yield barbecue and wood-fired character on a basic stovetop.',
    synergyScore: 92,
  },
  'Toasted Sesame+Yellow Onion': {
    itemA: 'Toasted Sesame',
    itemB: 'Yellow Onion',
    sharedVolatiles: ['Pyrazines', 'Furans', 'Alkylpyrazines'],
    scientificMechanism: 'Both generate identical 2-methylpyrazine and 2,5-dimethylpyrazine during high-temperature thermal reactions.',
    culinaryApplication: 'Finishing simple braised vegetables with toasted sesame oil creates an immediate perception of deep wok or hearth roasting.',
    synergyScore: 90,
  },
  'Fresh Basil / Cilantro+Lemon Zest / Juice': {
    itemA: 'Fresh Basil / Cilantro',
    itemB: 'Lemon Zest / Juice',
    sharedVolatiles: ['Linalool', 'Limonene', 'Citral'],
    scientificMechanism: 'Shared monoterpenes create a high-frequency olfactory bouquet that cuts through heavy starches and fats, stimulating salivary flow.',
    culinaryApplication: 'A cold blitz of cilantro stems and lemon zest stirred into rich stews at the final second prevents palate fatigue.',
    synergyScore: 95,
  },
};

export const FlavorCompoundExplorer: React.FC = () => {
  const [selectedCompound, setSelectedCompound] = useState<FlavorCompoundInfo>(FLAVOR_COMPOUNDS[0]);
  const [ingredientA, setIngredientA] = useState<string>('Ripe Tomato');
  const [ingredientB, setIngredientB] = useState<string>('White Miso Paste');

  // Lookup or compute pair synergy
  const pairKey1 = `${ingredientA}+${ingredientB}`;
  const pairKey2 = `${ingredientB}+${ingredientA}`;
  const pairing: PairingAnalysis =
    PRECOMPUTED_PAIRINGS[pairKey1] ||
    PRECOMPUTED_PAIRINGS[pairKey2] || {
      itemA: ingredientA,
      itemB: ingredientB,
      sharedVolatiles: ['Alkylpyrazines', 'Volatile Organic Acids', 'Lipophilic Aroma Carrier'],
      scientificMechanism:
        'Shared lipid-soluble compounds and thermal Maillard bridges create harmonized sensory perception across tongue and nasal retro-olfaction.',
      culinaryApplication:
        'Toast or saute both ingredients together in cooking oil at medium heat to allow fat-soluble aromas to marry before adding liquids.',
      synergyScore: 86,
    };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
          <span>Module 04</span>
          <span aria-hidden="true">·</span>
          <span>Computational Flavor Science</span>
          <span aria-hidden="true">·</span>
          <span>FlavorDB & Molecular Synergies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight text-balance">
          The Molecular Architecture of Taste.
        </h1>
        <p className="mt-3 text-stone-600 text-base lg:text-lg max-w-3xl leading-relaxed">
          Culinary Echo relies on computational gastronomy to understand why recipes can be adapted across ingredients without losing their soul. Discover shared volatile aroma compounds and discover why unexpected kitchen substitutes work scientifically.
        </p>
      </div>

      {/* Part 1: Interactive Pairing & Substitution Lab */}
      <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800">
          <Dna className="w-4 h-4" />
          <span>Molecular Affinity & Substitution Lab</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Primary Ingredient A
            </label>
            <select
              value={ingredientA}
              onChange={(e) => setIngredientA(e.target.value)}
              className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg p-3 text-stone-900 font-medium focus:outline-stone-900 cursor-pointer"
            >
              {COMMON_INGREDIENTS.map((item) => (
                <option key={item} value={item} disabled={item === ingredientB}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              Complementary Partner / Substitute B
            </label>
            <select
              value={ingredientB}
              onChange={(e) => setIngredientB(e.target.value)}
              className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg p-3 text-stone-900 font-medium focus:outline-stone-900 cursor-pointer"
            >
              {COMMON_INGREDIENTS.map((item) => (
                <option key={item} value={item} disabled={item === ingredientA}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pairing Analysis Output */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs font-mono text-stone-500">Volatile Compound Analysis</div>
              <h3 className="text-xl font-serif font-semibold text-stone-900">
                {pairing.itemA} + {pairing.itemB}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-mono">Affinity Index</span>
              <span className="text-2xl font-serif font-bold text-stone-900">{pairing.synergyScore}%</span>
            </div>
          </div>

          {/* Shared Compounds */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-700 block mb-2">
              Shared Key Aromas & Compounds:
            </span>
            <div className="flex flex-wrap gap-2">
              {pairing.sharedVolatiles.map((v, i) => (
                <span
                  key={i}
                  className="text-xs bg-white border border-stone-300 text-stone-800 px-3 py-1 rounded-md font-mono"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Scientific Mechanism */}
          <div className="space-y-1 text-xs">
            <span className="font-semibold text-stone-900 uppercase font-mono tracking-wider">
              Scientific Mechanism:
            </span>
            <p className="text-stone-700 text-sm leading-relaxed">{pairing.scientificMechanism}</p>
          </div>

          {/* Practical Application */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs space-y-1">
            <span className="font-semibold text-amber-950 uppercase font-mono tracking-wider">
              Everyday Practical Application:
            </span>
            <p className="text-amber-900 text-sm leading-relaxed">{pairing.culinaryApplication}</p>
          </div>
        </div>
      </div>

      {/* Part 2: Chemical Volatiles Dictionary */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-stone-900">
            FlavorDB Volatile Compound Dictionary
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            The sensory chemical building blocks that preserve recipe continuity across centuries.
          </p>
        </div>

        {/* Compound Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FLAVOR_COMPOUNDS.map((c) => {
            const isSelected = selectedCompound.compound === c.compound;
            return (
              <button
                key={c.compound}
                onClick={() => setSelectedCompound(c)}
                className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-stone-300'
                }`}
              >
                <div
                  className={`text-[10px] font-mono uppercase tracking-wider mb-1 ${
                    isSelected ? 'text-amber-300' : 'text-stone-400'
                  }`}
                >
                  {c.chemicalClass}
                </div>
                <div className="font-serif font-semibold text-base">{c.compound}</div>
                <div
                  className={`text-xs mt-2 line-clamp-2 ${
                    isSelected ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {c.aromaDescriptor}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Compound Card */}
        {selectedCompound && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-amber-800">
                  {selectedCompound.chemicalClass}
                </span>
                <h3 className="text-2xl font-serif font-semibold text-stone-900 mt-0.5">
                  {selectedCompound.compound}
                </h3>
              </div>
              <div className="text-xs font-mono text-stone-500">
                Sensory Descriptor: {selectedCompound.aromaDescriptor}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                  Natural Pantry Sources:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompound.naturalSources.map((source, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded border border-stone-200"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono uppercase tracking-wider text-stone-500 font-semibold block">
                  Flavor Allies & Pairings:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompound.pairingAllies.map((ally, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded border border-amber-200"
                    >
                      {ally}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
              <span className="font-mono uppercase tracking-wider text-stone-700 font-semibold block">
                Culinary Gastronomy Function:
              </span>
              <p className="text-stone-700 text-sm leading-relaxed">
                {selectedCompound.culinaryFunction}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
