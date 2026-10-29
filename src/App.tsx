import React, { useState } from 'react';
import { INITIAL_PANTRY, INITIAL_ECHOES } from './data/culinaryDatabase';
import { PantryItem, RecipeEcho, AdaptationResult, ReverseRecreationResult } from './types';
import { TopBar } from './components/TopBar';
import { AdaptiveCookingView } from './components/AdaptiveCookingView';
import { LivingContributionView } from './components/LivingContributionView';
import { ReverseRecreationView } from './components/ReverseRecreationView';
import { FlavorCompoundExplorer } from './components/FlavorCompoundExplorer';
import { ContributionModal } from './components/ContributionModal';
import { Sparkles, Utensils, Compass, BookOpen, Dna, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'adaptive' | 'lineage' | 'reverse' | 'science'>('adaptive');
  const [pantry, setPantry] = useState<PantryItem[]>(INITIAL_PANTRY);
  const [recipes, setRecipes] = useState<RecipeEcho[]>(INITIAL_ECHOES);

  // Contribution Modal State
  const [isContributionModalOpen, setIsContributionModalOpen] = useState<boolean>(false);
  const [modalParentRecipe, setModalParentRecipe] = useState<RecipeEcho | undefined>(undefined);
  const [modalInitialData, setModalInitialData] = useState<Partial<RecipeEcho> | undefined>(undefined);

  // Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenContribution = (parent?: RecipeEcho) => {
    setModalParentRecipe(parent);
    setModalInitialData(undefined);
    setIsContributionModalOpen(true);
  };

  // Convert an adaptation into a contribution modal flow
  const handleCookAndRecordAdaptation = (adaptation: AdaptationResult) => {
    setModalParentRecipe(recipes.find((r) => r.title.includes(adaptation.title)) || recipes[0]);
    setModalInitialData({
      title: adaptation.title,
      subtitle: adaptation.summary,
      steps: adaptation.steps,
      prepTimeMinutes: 5,
      cookTimeMinutes: adaptation.totalTimeMinutes,
      stepsCount: adaptation.minimalStepCount,
      flavorRadar: adaptation.flavorRadar,
      coreFlavorSpine: adaptation.preservedFlavorSpine,
      realWorldNotes: {
        substitutionsUsed: adaptation.substitutions,
        sourcingFriction: [],
        tastingVerdict: 'Faithfully preserved the core flavor spine with minimal steps using current kitchen inventory.',
      },
    });
    setIsContributionModalOpen(true);
  };

  // Convert a reverse recreation into a contribution modal flow
  const handleSaveReverseRecreationAsEcho = (result: ReverseRecreationResult) => {
    setModalParentRecipe(undefined);
    setModalInitialData({
      title: result.recreatedTitle,
      subtitle: `Reverse recreated from sensory memory: "${result.interpretedSensoryGoal.slice(0, 80)}"`,
      tasteMemoryDescription: result.interpretedSensoryGoal,
      steps: result.fewestStepsMethod,
      prepTimeMinutes: 5,
      cookTimeMinutes: 18,
      stepsCount: result.fewestStepsMethod.length,
      flavorRadar: result.flavorRadar,
      coreFlavorSpine: result.coreFlavorCompounds,
      realWorldNotes: {
        substitutionsUsed: result.mostAccessibleIngredients.map((ing) => ({
          original: 'Traditional / Rare Element',
          substitutedWith: ing.item,
          scientificReason: ing.reason,
        })),
        sourcingFriction: [],
        tastingVerdict: 'Achieved authentic aroma and mouthfeel using everyday accessible grocery essentials.',
      },
    });
    setIsContributionModalOpen(true);
  };

  const handleSaveNewEcho = (newEcho: RecipeEcho) => {
    setRecipes([newEcho, ...recipes]);
    showNotification(`“${newEcho.title}” is now part of the living record and available for others to adapt.`);
  };

  const handleSelectRecipeForAdaptation = (recipe: RecipeEcho) => {
    setActiveTab('adaptive');
    showNotification(`Selected “${recipe.title}” as base recipe for kitchen adaptation.`);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col selection:bg-stone-900 selection:text-white">
      {/* Top Bar following 3-Zone Contract */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContribution={() => handleOpenContribution()}
      />

      {/* Floating System Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg border border-stone-800 flex items-center gap-2 max-w-md animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Institutional Hero Marquee (Visible in Adaptive & Catalog tabs) */}
      {(activeTab === 'adaptive' || activeTab === 'lineage') && (
        <section className="relative border-b border-stone-200 overflow-hidden bg-[#F6F3EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Editorial Headline & Intent (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
                  <span>Culinary Atelier & Living Archive</span>
                  <span aria-hidden="true">·</span>
                  <span>Est. 2026</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.1] text-balance">
                  Every recipe leaves an echo that others can pick up and adapt.
                </h1>

                <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                  Culinary Echo bridges what is in your kitchen right now with shared taste knowledge. Cook meaningfully with zero waste today, while recording adaptable culinary lineages for generations to come.
                </p>

                {/* Primary Mode CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setActiveTab('adaptive')}
                    className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'adaptive'
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-white border border-stone-300 text-stone-800 hover:border-stone-900'
                    }`}
                  >
                    Adapt My Kitchen
                  </button>
                  <button
                    onClick={() => setActiveTab('reverse')}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-white border border-stone-300 text-stone-800 hover:border-stone-900 transition-all cursor-pointer"
                  >
                    Recreate a Taste Memory
                  </button>
                  <button
                    onClick={() => handleOpenContribution()}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/60 transition-all cursor-pointer"
                  >
                    + Leave a Contribution
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity Archival Atelier Visual (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/80 shadow-md aspect-16/10 lg:aspect-4/3">
                  <img
                    src="/src/assets/images/hero_culinary_archive_1793248247263.jpg"
                    alt="Culinary Heirloom Atelier with fresh herbs and stone mortar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex items-end p-4 sm:p-5">
                    <p className="text-stone-100 text-xs sm:text-sm font-serif italic drop-shadow-xs">
                      "Taste is not fixed in stone; it is a continuous conversation between memory and whatever is on the counter."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Utility Strip (Museum / Archival Pattern) */}
          <div className="bg-white/80 border-t border-stone-200 text-xs text-stone-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] sm:text-xs">
                <div className="flex items-center gap-6">
                  <span>
                    <strong className="text-stone-900">{recipes.length}</strong> Living Echoes
                  </span>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>
                    <strong className="text-stone-900">890+</strong> Molecular Aromas
                  </span>
                  <span className="hidden sm:inline" aria-hidden="true">·</span>
                  <span>
                    <strong className="text-stone-900">94%</strong> Average Waste Reduction
                  </span>
                </div>
                <div className="text-stone-500">
                  Open Gastronomy Protocol · Zero-Pill Architecture
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'adaptive' && (
          <AdaptiveCookingView
            pantry={pantry}
            onUpdatePantry={setPantry}
            recipes={recipes}
            onCookAndRecord={handleCookAndRecordAdaptation}
          />
        )}

        {activeTab === 'lineage' && (
          <LivingContributionView
            recipes={recipes}
            onOpenContribution={handleOpenContribution}
            onSelectForAdaptation={handleSelectRecipeForAdaptation}
          />
        )}

        {activeTab === 'reverse' && (
          <ReverseRecreationView onSaveAsEcho={handleSaveReverseRecreationAsEcho} />
        )}

        {activeTab === 'science' && <FlavorCompoundExplorer />}
      </main>

      {/* Contribution Modal */}
      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        onSaveEcho={handleSaveNewEcho}
        parentRecipe={modalParentRecipe}
        initialData={modalInitialData}
      />

      {/* Archival Editorial Footer */}
      <footer className="border-t border-stone-200 bg-[#F6F3EB] py-12 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-200">
            <div className="space-y-2 md:col-span-2">
              <span className="font-serif font-semibold text-lg text-stone-900 block">
                Culinary Echo
              </span>
              <p className="max-w-md text-stone-600 leading-relaxed">
                A computational gastronomy platform to cook meaningfully with what you have, preserve living flavor lineages, and reverse-recreate recipes across time using accessible ingredients.
              </p>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-stone-900 uppercase tracking-wider mb-2">
                Core Capabilities
              </div>
              <div>01. Adaptive Kitchen Cooking</div>
              <div>02. Living Contributions & Pedigree</div>
              <div>03. Reverse Recreation Engine</div>
              <div>04. Molecular FlavorDB Science</div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-stone-900 uppercase tracking-wider mb-2">
                Gastronomy Values
              </div>
              <div>Zero-Waste Kitchen Utility</div>
              <div>Taste Preservation Over Decades</div>
              <div>Fewest Steps Principle</div>
              <div>Open Living Lineage Record</div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 font-mono text-[11px]">
            <div>Culinary Echo © 2026 · Built with care for every kitchen</div>
            <div>Computational Gastronomy · RecipeDB & FlavorDB Grounded</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
