import React, { useState } from 'react';
import { ReverseRecreationResult, RecipeEcho } from '../types';
import { FlavorRadar } from './FlavorRadar';
import { Sparkles, Compass, ChefHat, Clock, GlassWater, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface ReverseRecreationViewProps {
  onSaveAsEcho: (result: ReverseRecreationResult) => void;
}

export const ReverseRecreationView: React.FC<ReverseRecreationViewProps> = ({ onSaveAsEcho }) => {
  const [sensoryPrompt, setSensoryPrompt] = useState<string>('');
  const [isRecreating, setIsRecreating] = useState<boolean>(false);
  const [result, setResult] = useState<ReverseRecreationResult | null>(null);

  const PRESETS = [
    {
      title: 'Grandmother’s Wood-Fired Hearth Stew',
      description: 'Deep blistered tomato sweetness fused with smoky charred garlic and sweet onions, with a sharp vinegar snap.',
    },
    {
      title: 'Kyoto Golden Ginger Dashi',
      description: 'Crystal-clear forest mushroom broth with resonant savory depth and peppery ginger warmth that settles in the chest.',
    },
    {
      title: 'Levantine Spiced Grain & Squash Pilaf',
      description: 'Nutty toasted cracked grains in warm spiced oil with caramelized sweet squash and refreshing green herb brightness.',
    },
    {
      title: 'Midnight Sichuan Chili Garlic Simmer',
      description: 'Mouth-tingling citrusy heat with deep fermented bean umami and sizzling toasted sesame oil aroma.',
    },
  ];

  const handleRecreate = async (promptText?: string) => {
    const textToUse = promptText || sensoryPrompt;
    if (!textToUse.trim()) return;

    setIsRecreating(true);
    try {
      const response = await fetch('/api/reverse-recreate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sensoryDescription: textToUse,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error reverse recreating:', err);
    } finally {
      setIsRecreating(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
          <span>Module 03</span>
          <span aria-hidden="true">·</span>
          <span>Reverse Computational Recreation</span>
          <span aria-hidden="true">·</span>
          <span>Timeless Utility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight text-balance">
          Recreate any taste memory with common staples.
        </h1>
        <p className="mt-3 text-stone-600 text-base lg:text-lg max-w-3xl leading-relaxed">
          Start from a taste description, a smell memory, or a forgotten dish name. The computational engine reverse-engineers the dish to its core volatile flavor compounds and synthesizes a recreation using the fewest steps and most accessible grocery essentials.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Describe the Taste, Aroma, Memory, or Dish
          </label>
          <textarea
            rows={3}
            placeholder="e.g. A rich, dark, smoky tomato soup with sweet caramelized onions and a dill finish my grandmother made in the 1980s..."
            value={sensoryPrompt}
            onChange={(e) => setSensoryPrompt(e.target.value)}
            className="w-full text-sm sm:text-base bg-stone-50 border border-stone-300 rounded-xl p-4 focus:outline-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-2">
            Or Explore Memory Presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSensoryPrompt(p.description);
                  handleRecreate(p.description);
                }}
                className="p-3 text-left rounded-lg bg-stone-50 border border-stone-200 hover:border-stone-400 hover:bg-stone-100 transition-colors cursor-pointer text-xs space-y-1"
              >
                <div className="font-serif font-semibold text-stone-900">{p.title}</div>
                <div className="text-[11px] text-stone-600 line-clamp-2">{p.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => handleRecreate()}
            disabled={isRecreating || !sensoryPrompt.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {isRecreating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Reverse Engineering Molecular Flavor Compounds...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>Reverse Recreate with Fewest Steps & Common Staples</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recreation Result Display */}
      {result && (
        <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-800 mb-1">
                <span>Computational Reverse Engineering Complete</span>
                <span aria-hidden="true">·</span>
                <span>Optimized for Minimal Steps</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900">
                {result.recreatedTitle}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-3xl italic">
                "{result.interpretedSensoryGoal}"
              </p>
            </div>

            <button
              onClick={() => onSaveAsEcho(result)}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs self-start md:self-auto"
            >
              <span>Record as Living Echo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Core Compounds Identified */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
              Core Molecular Flavor Compounds Identified:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.coreFlavorCompounds.map((comp, i) => (
                <span
                  key={i}
                  className="text-xs bg-white border border-stone-300 text-stone-800 px-3 py-1 rounded-md font-mono"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* 2-Column Split: Fewest Steps Recipe vs Accessible Ingredients & Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Fewest Steps (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-stone-700" />
                  <span>The Fewest Steps Practical Method ({result.fewestStepsMethod.length} Steps)</span>
                </h3>

                <div className="space-y-4">
                  {result.fewestStepsMethod.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-semibold text-stone-900">
                          Step {step.stepNumber}. {step.technique}
                        </span>
                        {step.activeDurationMin && (
                          <span className="text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.activeDurationMin} min active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone-800 leading-relaxed">{step.instruction}</p>
                      {step.scientificTip && (
                        <div className="text-xs text-stone-600 bg-white/80 p-2 rounded border border-stone-200/60 font-mono">
                          Gastronomy Shortcut: {step.scientificTip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Equilibrium Tips */}
              {result.tasteEquilibriumTips.length > 0 && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700">
                    Taste Equilibrium Tuning Notes
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                    {result.tasteEquilibriumTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Most Accessible Ingredients & Flavor Radar (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Radar Chart */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col items-center">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Recreated Taste Geometry
                </div>
                <FlavorRadar data={result.flavorRadar} size={220} label="Recreated Dish" />
              </div>

              {/* Accessible Staples */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Everyday Supermarket Essentials Used</span>
                </h4>
                <div className="space-y-2.5">
                  {result.mostAccessibleIngredients.map((item, i) => (
                    <div key={i} className="text-xs space-y-0.5 pb-2 border-b border-stone-200 last:border-0">
                      <div className="flex items-center justify-between font-semibold text-stone-900">
                        <span>{item.item}</span>
                        <span className="font-mono text-stone-500">{item.amount}</span>
                      </div>
                      <p className="text-stone-600 leading-normal">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drink Pairing */}
              {result.drinkPairing && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-amber-900 font-semibold">
                    <GlassWater className="w-3.5 h-3.5" />
                    <span>Botanical Harmonic Drink Echo ({result.drinkPairing.type})</span>
                  </div>
                  <div className="font-serif font-semibold text-stone-900 text-sm">
                    {result.drinkPairing.name}
                  </div>
                  <p className="text-stone-700">{result.drinkPairing.notes}</p>
                  <div className="text-[11px] font-mono text-stone-500 pt-1">
                    Ingredients: {result.drinkPairing.ingredients.join(', ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
