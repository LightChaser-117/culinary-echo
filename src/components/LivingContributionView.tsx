import React, { useState } from 'react';
import { RecipeEcho } from '../types';
import { FlavorRadar } from './FlavorRadar';
import { GitBranch, Clock, ChefHat, GlassWater, BookOpen, Search, User, Compass, CheckCircle2, Share2, Sparkles } from 'lucide-react';

interface LivingContributionViewProps {
  recipes: RecipeEcho[];
  onOpenContribution: (parentRecipe?: RecipeEcho) => void;
  onSelectForAdaptation: (recipe: RecipeEcho) => void;
}

export const LivingContributionView: React.FC<LivingContributionViewProps> = ({
  recipes,
  onOpenContribution,
  onSelectForAdaptation,
}) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'catalog' | 'lineage_tree'>('catalog');

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId) || recipes[0];

  const categories = ['All', 'Braises & Stews', 'Grains & Broths', 'Vegetables & Legumes', 'Quick Hearth'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.originEra.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tasteMemoryDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.coreFlavorSpine.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header & Purpose */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
          <span>Module 02</span>
          <span aria-hidden="true">·</span>
          <span>Living Culinary Contribution</span>
          <span aria-hidden="true">·</span>
          <span>Shared Heritage Database</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight text-balance">
              The Living Lineage Record
            </h1>
            <p className="mt-3 text-stone-600 text-base lg:text-lg max-w-3xl leading-relaxed">
              Every dish is an open lineage. Anyone can contribute a full recipe, an everyday variation, real-world substitution notes, or sensory observations. A recipe documented today remains cookable fifty years from now.
            </p>
          </div>

          <button
            onClick={() => onOpenContribution()}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs self-start sm:self-auto"
          >
            Add New Living Echo
          </button>
        </div>
      </div>

      {/* Filter Toolbar & View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lineage by dish, era, compound, or flavor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-white border border-stone-300 rounded-lg pl-9 pr-3 py-2 focus:outline-stone-900 placeholder:text-stone-400"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setViewMode('catalog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'catalog' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Archive Catalog</span>
          </button>
          <button
            onClick={() => setViewMode('lineage_tree')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'lineage_tree' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Lineage Pedigree Tree</span>
          </button>
        </div>
      </div>

      {/* Category Pills Replacement: Clean Segmented Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white font-medium'
                : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LINEAGE TREE VIEW */}
      {viewMode === 'lineage_tree' ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-xl font-serif font-semibold text-stone-900">
              Interactive Flavor Lineage Trees
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Visualize how ancestral cooking techniques migrate and adapt across kitchen constraints, tools, and generations.
            </p>
          </div>

          <div className="space-y-8 pt-4">
            {recipes.map((r) => (
              <div key={r.id} className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="font-semibold text-stone-900">{r.originEra}</span>
                    <span aria-hidden="true">·</span>
                    <span>{r.author.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-800 font-medium">{r.adaptationsCount} Known Echoes</span>
                  </div>
                  <button
                    onClick={() => onOpenContribution(r)}
                    className="text-xs text-stone-700 hover:text-stone-900 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    + Branch Variation
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200/80">
                  <div className="space-y-1">
                    <h3 className="text-base font-serif font-semibold text-stone-900">{r.title}</h3>
                    <p className="text-xs text-stone-600 italic">"{r.tasteMemoryDescription}"</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-500 shrink-0">
                    <span>{r.stepsCount} Steps</span>
                    <span aria-hidden="true">/</span>
                    <span>{r.cookTimeMinutes}m</span>
                    <button
                      onClick={() => {
                        setSelectedRecipeId(r.id);
                        setViewMode('catalog');
                      }}
                      className="ml-3 px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-900 text-xs font-medium cursor-pointer"
                    >
                      Inspect Echo
                    </button>
                  </div>
                </div>

                {/* Sub-branches mock preview */}
                <div className="pl-6 border-l-2 border-dashed border-stone-300 space-y-2 text-xs">
                  <div className="bg-white/70 p-3 rounded-lg border border-stone-200/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-stone-800">2024 Cast-Iron Induction Echo</span>
                      <span className="text-stone-500 ml-2">by Marcus Conti (Substituted wood embers with dry cast iron sear)</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800">95% Flavor Match</span>
                  </div>
                  <div className="bg-white/70 p-3 rounded-lg border border-stone-200/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-stone-800">2026 Student Dorm 3-Step Simmer</span>
                      <span className="text-stone-500 ml-2">by Sarah Chen (Rescued overripe plum tomatoes + stale sourdough)</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800">92% Flavor Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* CATALOG VIEW: 2-COLUMN SPLIT (Archive List vs Deep Echo Inspector) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Recipe List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase text-stone-500 pb-1">
              Archival Echoes ({filteredRecipes.length})
            </div>

            <div className="space-y-3">
              {filteredRecipes.map((r) => {
                const isSelected = r.id === selectedRecipe.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRecipeId(r.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-stone-900 shadow-xs ring-1 ring-stone-900'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                          <span>{r.originEra}</span>
                          <span aria-hidden="true">·</span>
                          <span>{r.category}</span>
                        </div>
                        <h3 className="text-base font-serif font-semibold text-stone-900 leading-snug">
                          {r.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2">{r.subtitle}</p>
                      </div>

                      {/* Small thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img
                          src={r.imageUrl}
                          alt={r.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mt-3 pt-2.5 border-t border-stone-100">
                      <span>{r.stepsCount} Steps</span>
                      <span>{r.cookTimeMinutes} Min Cook</span>
                      <span className="text-amber-800">{r.adaptationsCount} Adaptations</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Deep Echo Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
            {/* Header Lockup */}
            <div className="space-y-3 border-b border-stone-200 pb-6">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>{selectedRecipe.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedRecipe.author.location}</span>
                </div>
                <span className="text-stone-900 font-semibold">{selectedRecipe.originEra}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 leading-tight">
                {selectedRecipe.title}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {selectedRecipe.subtitle}
              </p>

              {/* Photo Showcase */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mt-4">
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                  <p className="text-white text-xs sm:text-sm italic drop-shadow-sm">
                    "{selectedRecipe.tasteMemoryDescription}"
                  </p>
                </div>
              </div>
            </div>

            {/* Core Flavor Spine & Compounds */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700">
                Core Flavor Spine & Molecular Volatiles
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.coreFlavorSpine.map((spine, i) => (
                  <span
                    key={i}
                    className="text-xs bg-stone-100 text-stone-800 px-3 py-1 rounded-md border border-stone-200/80 font-medium"
                  >
                    {spine}
                  </span>
                ))}
              </div>
              <div className="text-xs font-mono text-stone-500 pt-1">
                Shared Key Compounds: {selectedRecipe.sharedKeyCompounds.join(' · ')}
              </div>
            </div>

            {/* Tasting Notes & Sensory Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-700">
                  Documented Sensory Dimensions
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-stone-800">Flavor: </span>
                    <span className="text-stone-600">{selectedRecipe.tastingNotes.flavor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">Aroma: </span>
                    <span className="text-stone-600">{selectedRecipe.tastingNotes.aroma}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">Texture: </span>
                    <span className="text-stone-600">{selectedRecipe.tastingNotes.texture}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">Finish: </span>
                    <span className="text-stone-600">{selectedRecipe.tastingNotes.finish}</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-stone-200 pt-4 sm:pt-0 sm:pl-4">
                <FlavorRadar data={selectedRecipe.flavorRadar} size={190} label="Dish Profile" />
              </div>
            </div>

            {/* Real World Friction Log */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700">
                Real-World Friction Log & Tested Substitutions
              </h3>

              <div className="space-y-2">
                {selectedRecipe.realWorldNotes.substitutionsUsed.map((sub, i) => (
                  <div key={i} className="p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs space-y-1">
                    <div className="font-medium text-stone-800">
                      <span className="text-stone-500">Original: {sub.original}</span>
                      <span className="mx-2">→</span>
                      <span className="text-amber-900 font-semibold">{sub.substitutedWith}</span>
                    </div>
                    <p className="text-stone-600">{sub.scientificReason}</p>
                  </div>
                ))}

                {selectedRecipe.realWorldNotes.sourcingFriction.map((fric, i) => (
                  <div key={i} className="p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-800">{fric.item}</span>
                      <span className="text-stone-500 text-[11px] ml-2">({fric.difficulty})</span>
                    </div>
                    <div className="text-stone-600">
                      Alternative: <span className="text-stone-900 font-medium">{fric.practicalAlternative}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs italic text-stone-600 bg-stone-100/60 p-3 rounded border border-stone-200/60">
                "{selectedRecipe.realWorldNotes.tastingVerdict}"
              </p>
            </div>

            {/* Drink Pairing Echo */}
            {selectedRecipe.drinkPairingEcho && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold">
                  <GlassWater className="w-3.5 h-3.5" />
                  <span>Harmonic Drink Pairing Echo ({selectedRecipe.drinkPairingEcho.type})</span>
                </div>
                <h4 className="text-sm font-serif font-semibold text-stone-900">
                  {selectedRecipe.drinkPairingEcho.name}
                </h4>
                <p className="text-xs text-stone-700">{selectedRecipe.drinkPairingEcho.recipe}</p>
                <div className="text-[11px] font-mono text-amber-800">
                  Shared Aromatics: {selectedRecipe.drinkPairingEcho.sharedAromaCompounds.join(' · ')}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <div className="text-xs text-stone-500 font-mono">
                Visibility: Open Lineage Record (Creative Commons)
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectForAdaptation(selectedRecipe)}
                  className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Adapt to My Kitchen
                </button>
                <button
                  onClick={() => onOpenContribution(selectedRecipe)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Contribute Variation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
