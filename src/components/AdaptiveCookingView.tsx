import React, { useState } from 'react';
import { PantryItem, RecipeEcho, AdaptationResult } from '../types';
import { FlavorRadar } from './FlavorRadar';
import { Plus, Trash2, AlertCircle, Sparkles, ChefHat, Clock, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface AdaptiveCookingViewProps {
  pantry: PantryItem[];
  onUpdatePantry: (newPantry: PantryItem[]) => void;
  recipes: RecipeEcho[];
  onCookAndRecord: (adaptation: AdaptationResult) => void;
}

export const AdaptiveCookingView: React.FC<AdaptiveCookingViewProps> = ({
  pantry,
  onUpdatePantry,
  recipes,
  onCookAndRecord,
}) => {
  const [selectedBaseRecipeId, setSelectedBaseRecipeId] = useState<string>('echo-hearth-tomato');
  const [customGoal, setCustomGoal] = useState<string>('');
  const [simplicity, setSimplicity] = useState<'Minimal Steps' | 'Balanced' | 'Deep Technique'>('Minimal Steps');
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<PantryItem['category']>('Produce');
  const [isNewItemWasteRisk, setIsNewItemWasteRisk] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [adaptationResult, setAdaptationResult] = useState<AdaptationResult | null>(null);

  const selectedRecipe = recipes.find((r) => r.id === selectedBaseRecipeId);

  // Toggle item in pantry or waste risk
  const toggleWasteRisk = (id: string) => {
    onUpdatePantry(
      pantry.map((p) => (p.id === id ? { ...p, isWasteRisk: !p.isWasteRisk } : p))
    );
  };

  const removeItem = (id: string) => {
    onUpdatePantry(pantry.filter((p) => p.id !== id));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: PantryItem = {
      id: `pantry-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      isWasteRisk: isNewItemWasteRisk,
    };
    onUpdatePantry([...pantry, newItem]);
    setNewItemName('');
    setIsNewItemWasteRisk(false);
  };

  // Run adaptation engine
  const handleGenerateAdaptation = async () => {
    setIsGenerating(true);
    try {
      const wasteRiskItems = pantry.filter((p) => p.isWasteRisk).map((p) => p.name);
      const standardItems = pantry.filter((p) => !p.isWasteRisk).map((p) => p.name);

      const response = await fetch('/api/adapt-cooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pantryIngredients: standardItems,
          wasteRiskIngredients: wasteRiskItems,
          baseRecipeTitle: selectedRecipe?.title,
          tasteGoalOrMemory: customGoal,
          simplicity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setAdaptationResult(data);
    } catch (err) {
      console.error('Error generating adaptation:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const wasteRiskCount = pantry.filter((p) => p.isWasteRisk).length;

  return (
    <div className="space-y-12">
      {/* Editorial Introduction */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
          <span>Module 01</span>
          <span aria-hidden="true">·</span>
          <span>Adaptive Computational Cooking</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Waste Gastronomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight text-balance">
          Cook meaningfully with what is in your kitchen right now.
        </h1>
        <p className="mt-3 text-stone-600 text-base lg:text-lg max-w-3xl leading-relaxed">
          Input your current ingredients, flag what risks spoiling, and anchor to an existing heirloom dish or taste goal. The computational gastronomy engine synthesizes a practical variation that keeps the intended flavor spine intact with minimal steps.
        </p>
      </div>

      {/* Main Grid: Kitchen Inventory & Target Pairing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Kitchen Inventory (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-serif font-semibold text-stone-900">Current Kitchen Inventory</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {pantry.length} items recorded · {wasteRiskCount} at waste risk
              </p>
            </div>
            {wasteRiskCount > 0 && (
              <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Rescue Priority Active
              </span>
            )}
          </div>

          {/* Quick Add Form */}
          <form onSubmit={addItem} className="space-y-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200/70">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add ingredient (e.g., Wilted spinach, Sour cream)..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 text-sm bg-white border border-stone-300 rounded-md px-3 py-1.5 focus:outline-stone-900 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 text-xs">
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as PantryItem['category'])}
                className="text-xs bg-white border border-stone-300 rounded px-2 py-1 text-stone-700"
              >
                <option value="Produce">Produce</option>
                <option value="Pantry Staple">Pantry Staple</option>
                <option value="Dairy/Alternative">Dairy / Alternative</option>
                <option value="Protein">Protein</option>
                <option value="Herb/Spice">Herb / Spice</option>
                <option value="Condiment">Condiment</option>
              </select>

              <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-700">
                <input
                  type="checkbox"
                  checked={isNewItemWasteRisk}
                  onChange={(e) => setIsNewItemWasteRisk(e.target.checked)}
                  className="rounded text-amber-700 focus:ring-0 cursor-pointer"
                />
                <span className="text-amber-800 font-medium">Expiring / High-Risk</span>
              </label>
            </div>
          </form>

          {/* Pantry List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {pantry.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                  item.isWasteRisk
                    ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                    : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => toggleWasteRisk(item.id)}
                    title={item.isWasteRisk ? 'Click to unmark waste risk' : 'Mark as waste risk'}
                    className={`cursor-pointer p-1 rounded transition-colors ${
                      item.isWasteRisk
                        ? 'text-amber-600 hover:text-amber-800'
                        : 'text-stone-300 hover:text-amber-600'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span>{item.category}</span>
                      {item.isWasteRisk && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-700 font-medium">Use quickly</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 rounded transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recipe Anchor, Taste Goal & Adaptation Trigger (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-xs space-y-6">
            <h2 className="text-lg font-serif font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Anchor Dish or Desired Taste Character
            </h2>

            {/* Select Base Heirloom Recipe */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Choose an Ancestor Heirloom from Library
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recipes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedBaseRecipeId(r.id)}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      selectedBaseRecipeId === r.id
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-serif font-semibold text-stone-900 line-clamp-1">{r.title}</div>
                    <div className="text-[11px] text-stone-500 mt-1 line-clamp-2">{r.subtitle}</div>
                    <div className="text-[10px] text-stone-400 font-mono mt-2">{r.originEra}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Taste Memory Alternative */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Or Describe a Personal Taste Memory / Flavor Goal
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Deep charred allium sweetness with bright acid and crunchy textures, or grandmother's Sunday broth..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="w-full text-sm bg-stone-50 border border-stone-300 rounded-lg p-3 focus:outline-stone-900 placeholder:text-stone-400"
              />
            </div>

            {/* Simplicity Constraint Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Simplicity Constraint
              </label>
              <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg max-w-md">
                {(['Minimal Steps', 'Balanced', 'Deep Technique'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSimplicity(mode)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      simplicity === mode
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Generation Button */}
            <div className="pt-2">
              <button
                onClick={handleGenerateAdaptation}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold tracking-wider uppercase text-white bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Computational Adaptation...</span>
                  </>
                ) : (
                  <>
                    <ChefHat className="w-4 h-4" />
                    <span>Generate Adaptive Echo from Kitchen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Seed Preview If No Generated Result Yet */}
          {!adaptationResult && selectedRecipe && (
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>Selected Ancestor Profile</span>
                <span>{selectedRecipe.stepsCount} Steps · {selectedRecipe.cookTimeMinutes} Min</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900">{selectedRecipe.title}</h3>
              <p className="text-sm text-stone-600 italic">"{selectedRecipe.tasteMemoryDescription}"</p>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-700 block mb-2">
                  Core Flavor Spine Preserved Across All Echoes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.coreFlavorSpine.map((spine, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white border border-stone-200 text-stone-800 px-2.5 py-1 rounded-md"
                    >
                      {spine}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generated Adaptation Result Card */}
      {adaptationResult && (
        <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-800 mb-1">
                <span>Adaptation Synthesized</span>
                <span aria-hidden="true">·</span>
                <span>Waste Diverted: {adaptationResult.wasteReductionScore}%</span>
                <span aria-hidden="true">·</span>
                <span>Flavor Fidelity: {adaptationResult.flavorFidelityScore}%</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900">
                {adaptationResult.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-3xl">
                {adaptationResult.summary}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onCookAndRecord(adaptationResult)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Cook This & Record Echo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200/80">
            <div>
              <div className="text-[11px] font-mono uppercase text-stone-500">Fewest Steps</div>
              <div className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
                {adaptationResult.minimalStepCount} Steps
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-stone-500">Total Cooking Time</div>
              <div className="text-xl font-serif font-semibold text-stone-900 mt-0.5">
                {adaptationResult.totalTimeMinutes} Minutes
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-stone-500">Rescued Items Used</div>
              <div className="text-sm font-medium text-amber-800 mt-1">
                {adaptationResult.wasteRiskItemsUsed.join(', ') || 'Pantry produce'}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-stone-500">Flavor Spine Retained</div>
              <div className="text-sm font-medium text-stone-800 mt-1">
                {adaptationResult.preservedFlavorSpine.slice(0, 2).join(' · ')}
              </div>
            </div>
          </div>

          {/* 2-Column Split: Cooking Steps vs Flavor Science & Substitutions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps & Ingredients (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-base font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-stone-700" />
                  <span>Streamlined Method ({adaptationResult.minimalStepCount} Minimal Steps)</span>
                </h3>
                <div className="space-y-4">
                  {adaptationResult.steps.map((step) => (
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
                          Science: {step.scientificTip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients List */}
              <div className="pt-2">
                <h3 className="text-base font-serif font-semibold text-stone-900 mb-3">
                  Ingredients Matrix (From What You Have)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {adaptationResult.ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 bg-white text-xs"
                    >
                      <span className="font-medium text-stone-800">{ing.item}</span>
                      <span className="text-stone-500 font-mono">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Flavor Science, Molecular Radar & Substitutions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Radar Chart */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col items-center">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Computational Flavor Equivalence
                </div>
                <FlavorRadar
                  data={adaptationResult.flavorRadar}
                  referenceData={selectedRecipe?.flavorRadar}
                  size={240}
                  label="Adapted Echo"
                  referenceLabel="Ancestral Dish"
                />
              </div>

              {/* Substitutions & Science */}
              {adaptationResult.substitutions.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Scientific Substitution Rationale</span>
                  </h4>
                  {adaptationResult.substitutions.map((sub, i) => (
                    <div key={i} className="text-xs space-y-1 pb-2 border-b border-stone-200 last:border-0">
                      <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                        <span className="line-through text-stone-400">{sub.original}</span>
                        <span>→</span>
                        <span className="text-amber-900 font-semibold">{sub.substitutedWith}</span>
                      </div>
                      <p className="text-stone-600 leading-normal">{sub.scientificReason}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Computational Reasoning */}
              <div className="p-4 rounded-xl bg-stone-900 text-stone-200 text-xs leading-relaxed space-y-1">
                <div className="font-mono uppercase tracking-wider text-amber-300 font-semibold text-[10px]">
                  Gastronomy Engine Rationale
                </div>
                <p>{adaptationResult.computationalReasoning}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
