import React, { useState } from 'react';
import { RecipeEcho, RecipeStep, SubstitutionNote, SourcingFriction } from '../types';
import { X, Plus, Trash2, CheckCircle2, Shield, Lock, Globe } from 'lucide-react';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEcho: (echo: RecipeEcho) => void;
  parentRecipe?: RecipeEcho;
  initialData?: Partial<RecipeEcho>;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  onSaveEcho,
  parentRecipe,
  initialData,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>(
    initialData?.title || (parentRecipe ? `${parentRecipe.title} (Home Adapt)` : '')
  );
  const [subtitle, setSubtitle] = useState<string>(initialData?.subtitle || '');
  const [authorName, setAuthorName] = useState<string>('Home Cook');
  const [authorLocation, setAuthorLocation] = useState<string>('Kitchen Atelier');
  const [originEra, setOriginEra] = useState<string>('2026 Kitchen Echo');
  const [category, setCategory] = useState<RecipeEcho['category']>(
    parentRecipe?.category || 'Braises & Stews'
  );
  const [tasteMemory, setTasteMemory] = useState<string>(
    initialData?.tasteMemoryDescription || parentRecipe?.tasteMemoryDescription || ''
  );
  const [prepTime, setPrepTime] = useState<number>(initialData?.prepTimeMinutes || 10);
  const [cookTime, setCookTime] = useState<number>(initialData?.cookTimeMinutes || 20);

  // Steps
  const [steps, setSteps] = useState<RecipeStep[]>(
    initialData?.steps || [
      {
        stepNumber: 1,
        instruction: 'Sear alliums and spices in oil until aromatic.',
        technique: 'Pan Aromatics Sear',
        activeDurationMin: 3,
      },
      {
        stepNumber: 2,
        instruction: 'Simmer main ingredients with a touch of liquid until concentrated.',
        technique: 'Glutamate Condensation',
        activeDurationMin: 5,
      },
      {
        stepNumber: 3,
        instruction: 'Finish with acid and fresh herbs; serve warm.',
        technique: 'Acid Brightening',
        activeDurationMin: 2,
      },
    ]
  );

  // Substitutions used
  const [substitutions, setSubstitutions] = useState<SubstitutionNote[]>(
    initialData?.realWorldNotes?.substitutionsUsed || [
      {
        original: 'Specialty ingredient',
        substitutedWith: 'Standard pantry item',
        scientificReason: 'Matched shared volatile aroma and acidity.',
      },
    ]
  );

  // Sourcing friction
  const [sourcingFriction, setSourcingFriction] = useState<SourcingFriction[]>([
    {
      item: 'Fresh herbs',
      difficulty: 'Easy everywhere',
      practicalAlternative: 'Dry herbs bloomed in hot oil',
    },
  ]);

  // Tasting notes
  const [flavorNote, setFlavorNote] = useState<string>('Savory and balanced with lively acidity.');
  const [aromaNote, setAromaNote] = useState<string>('Toasted allium and warm spices.');
  const [textureNote, setTextureNote] = useState<string>('Velvety sauce with chewy resilient pieces.');
  const [finishNote, setFinishNote] = useState<string>('Clean lingering savoriness.');
  const [tastingVerdict, setTastingVerdict] = useState<string>(
    'Faithfully captured the spirit while saving 20 minutes of preparation.'
  );

  // Visibility
  const [visibility, setVisibility] = useState<RecipeEcho['visibility']>('open_archive');
  const [isSuccessNotification, setIsSuccessNotification] = useState<boolean>(false);

  const handleAddStep = () => {
    const nextNum = steps.length + 1;
    setSteps([
      ...steps,
      {
        stepNumber: nextNum,
        instruction: '',
        technique: 'Cooking Technique',
        activeDurationMin: 3,
      },
    ]);
  };

  const handleUpdateStep = (index: number, text: string) => {
    const updated = [...steps];
    updated[index].instruction = text;
    setSteps(updated);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    const filtered = steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setSteps(filtered);
  };

  const handleAddSub = () => {
    setSubstitutions([
      ...substitutions,
      {
        original: '',
        substitutedWith: '',
        scientificReason: '',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEcho: RecipeEcho = {
      id: `echo-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `Contributed variation of ${parentRecipe?.title || 'Heirloom Base'}`,
      originEra,
      parentEchoId: parentRecipe?.id,
      parentTitle: parentRecipe?.title,
      author: {
        name: authorName.trim() || 'Contributor',
        location: authorLocation.trim() || 'Kitchen Atelier',
        year: '2026',
      },
      tasteMemoryDescription: tasteMemory.trim() || 'A cherished taste preserved for the shared record.',
      imageUrl: parentRecipe?.imageUrl || '/src/assets/images/recipe_wood_fired_stew_1793248247403.jpg',
      category,
      prepTimeMinutes: prepTime,
      cookTimeMinutes: cookTime,
      stepsCount: steps.length,
      difficulty: steps.length <= 3 ? 'Minimal' : steps.length <= 5 ? 'Moderate' : 'Involved',
      wasteReductionScore: 92,
      coreFlavorSpine: parentRecipe?.coreFlavorSpine || ['Savory Glutamates', 'Toasted Allium Aromatics'],
      sharedKeyCompounds: parentRecipe?.sharedKeyCompounds || ['Pyrazines', 'Glutamic Acid'],
      flavorRadar: parentRecipe?.flavorRadar || {
        umami: 8.0,
        sweetness: 6.0,
        acidity: 7.0,
        salinity: 6.0,
        bitterness: 2.5,
        pungency: 4.0,
        aromaIntensity: 8.5,
        kokumi: 8.0,
      },
      ingredients: [
        { item: 'Available vegetables or main base', amount: '400g', category: 'Produce', role: 'Umami Anchor' },
        { item: 'Alliums (onion or garlic)', amount: '2-3 units', category: 'Produce', role: 'Aroma Core' },
        { item: 'Cooking fat (oil or butter)', amount: '2 tbsp', category: 'Condiment', role: 'Bulk/Body' },
        { item: 'Finishing acid (vinegar or citrus)', amount: '1 tbsp', category: 'Condiment', role: 'Acid Balance' },
      ],
      steps,
      tastingNotes: {
        flavor: flavorNote,
        aroma: aromaNote,
        texture: textureNote,
        finish: finishNote,
      },
      realWorldNotes: {
        substitutionsUsed: substitutions.filter((s) => s.original && s.substitutedWith),
        sourcingFriction,
        tastingVerdict,
      },
      visibility,
      adaptationsCount: 0,
      generationDepth: parentRecipe ? parentRecipe.generationDepth + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveEcho(newEcho);
    setIsSuccessNotification(true);
    setTimeout(() => {
      setIsSuccessNotification(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border border-stone-200 rounded-2xl w-full max-w-3xl my-8 p-6 sm:p-8 shadow-xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-1.5 text-stone-400 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800 mb-1">
            <span>Living Contribution</span>
            {parentRecipe && (
              <>
                <span aria-hidden="true">·</span>
                <span>Branching from: {parentRecipe.title}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900">
            Contribute Recipe or Variation
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Pass forward your real-world kitchen knowledge. Document substitutions, step reductions, and sensory notes for others to adapt.
          </p>
        </div>

        {isSuccessNotification ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
            <h3 className="text-xl font-serif font-semibold text-stone-900">
              Contribution Recorded to Living Lineage
            </h3>
            <p className="text-sm text-stone-600 max-w-md">
              “This contribution is now available for others to adapt.”
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
            {/* Title & Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Dish Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hearth Tomato & Charred Allium Braise"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Subtitle / Variation Context
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20-minute cast iron adaptation with pantry canned plum tomatoes"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-stone-900"
                />
              </div>
            </div>

            {/* Author & Origin Era */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Your Name / Cook Alias
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Location / Kitchen
                </label>
                <input
                  type="text"
                  value={authorLocation}
                  onChange={(e) => setAuthorLocation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Origin Era / Year
                </label>
                <input
                  type="text"
                  value={originEra}
                  onChange={(e) => setOriginEra(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 focus:outline-stone-900"
                />
              </div>
            </div>

            {/* Taste Memory Description */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                Taste & Smell Memory Description
              </label>
              <textarea
                rows={2}
                placeholder="What emotional or sensory notes make this dish matter? (e.g. Smoky charred edges with tongue-tingling acid...)"
                value={tasteMemory}
                onChange={(e) => setTasteMemory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-stone-900 focus:outline-stone-900"
              />
            </div>

            {/* Steps Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700">
                  Minimal Recipe Steps ({steps.length})
                </label>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Step
                </button>
              </div>

              <div className="space-y-2.5">
                {steps.map((s, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="font-mono text-xs font-semibold text-stone-500 mt-2">
                      {s.stepNumber}.
                    </span>
                    <input
                      type="text"
                      placeholder={`Instruction for step ${s.stepNumber}...`}
                      value={s.instruction}
                      onChange={(e) => handleUpdateStep(idx, e.target.value)}
                      className="flex-1 text-xs sm:text-sm bg-white border border-stone-300 rounded-md px-3 py-1.5 focus:outline-stone-900"
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Substitutions Actually Used */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700">
                  Substitutions Actually Tested
                </label>
                <button
                  type="button"
                  onClick={handleAddSub}
                  className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Substitution Note
                </button>
              </div>

              <div className="space-y-2">
                {substitutions.map((sub, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs">
                    <input
                      type="text"
                      placeholder="Original item..."
                      value={sub.original}
                      onChange={(e) => {
                        const updated = [...substitutions];
                        updated[idx].original = e.target.value;
                        setSubstitutions(updated);
                      }}
                      className="bg-white border border-stone-300 rounded px-2.5 py-1.5"
                    />
                    <input
                      type="text"
                      placeholder="Substituted with..."
                      value={sub.substitutedWith}
                      onChange={(e) => {
                        const updated = [...substitutions];
                        updated[idx].substitutedWith = e.target.value;
                        setSubstitutions(updated);
                      }}
                      className="bg-white border border-stone-300 rounded px-2.5 py-1.5"
                    />
                    <input
                      type="text"
                      placeholder="Why it worked (flavor/science)..."
                      value={sub.scientificReason}
                      onChange={(e) => {
                        const updated = [...substitutions];
                        updated[idx].scientificReason = e.target.value;
                        setSubstitutions(updated);
                      }}
                      className="bg-white border border-stone-300 rounded px-2.5 py-1.5"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Flavor & Aroma Balance
                </label>
                <input
                  type="text"
                  value={flavorNote}
                  onChange={(e) => setFlavorNote(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1">
                  Texture & Finish
                </label>
                <input
                  type="text"
                  value={textureNote}
                  onChange={(e) => setTextureNote(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900 text-xs"
                />
              </div>
            </div>

            {/* Consent & Visibility Controls */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <span className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                Visibility & Consent Governance
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    visibility === 'open_archive'
                      ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                      : 'border-stone-200 bg-stone-100/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="open_archive"
                    checked={visibility === 'open_archive'}
                    onChange={() => setVisibility('open_archive')}
                    className="mt-0.5 text-stone-900 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900 text-xs flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Open Archive</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Publicly available for all future cooks to discover and adapt.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    visibility === 'community'
                      ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                      : 'border-stone-200 bg-stone-100/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="community"
                    checked={visibility === 'community'}
                    onChange={() => setVisibility('community')}
                    className="mt-0.5 text-stone-900 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900 text-xs flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      <span>Community Pool</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Shared within community members for collective adaptation.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                    visibility === 'private'
                      ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                      : 'border-stone-200 bg-stone-100/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === 'private'}
                    onChange={() => setVisibility('private')}
                    className="mt-0.5 text-stone-900 focus:ring-0"
                  />
                  <div>
                    <div className="font-semibold text-stone-900 text-xs flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Private Journal</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Stored only for your personal culinary record.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Record Living Contribution
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
