import React, { useState, useRef, useEffect } from 'react';
import { KitchenProduct, CookedDish, ProductCategory, Recipe } from '../types';
import { ALL_RECIPES } from '../data/mockData';
import { AddProductBar } from './AddProductBar';
import { WatchDownloadingPlaceholder } from './WatchDownloadingPlaceholder';
import {
  Refrigerator,
  Archive,
  Layers,
  Soup,
  Trash2,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Heart,
  Check,
  X,
  Sparkles,
  ChefHat,
  Utensils,
} from 'lucide-react';

interface KitchenHubProps {
  products: KitchenProduct[];
  cookedDishes: CookedDish[];
  onAddProduct: (name: string, category: ProductCategory, quantity?: string) => void;
  onRemoveProduct: (productId: string) => void;
  onUpdateProductAmount: (productId: string, newAmount: string) => void;
  onAddCookedDish: (dish: Omit<CookedDish, 'id'>) => void;
  onToggleLikeCookedDish: (dishId: string) => void;
  onRemoveCookedDish: (dishId: string) => void;
  onCreateRecipe: () => void;
}

export const KitchenHub: React.FC<KitchenHubProps> = ({
  products,
  cookedDishes,
  onAddProduct,
  onRemoveProduct,
  onUpdateProductAmount,
  onAddCookedDish,
  onToggleLikeCookedDish,
  onRemoveCookedDish,
  onCreateRecipe,
}) => {
  // Multiselect dropdown state for product subcategories ('fridge', 'storage')
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(['fridge', 'storage']);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Filter dropdown state for Cooked Dishes ('all', 'liked')
  const [isCookedDropdownOpen, setIsCookedDropdownOpen] = useState(false);
  const cookedDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        cookedDropdownRef.current &&
        !cookedDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCookedDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCategoryDropdownOpen(false);
        setIsCookedDropdownOpen(false);
      }
    };

    if (isCategoryDropdownOpen || isCookedDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCategoryDropdownOpen, isCookedDropdownOpen]);

  const toggleCategory = (cat: ProductCategory) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const selectAllCategories = () => {
    setSelectedCategories(['fridge', 'storage']);
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const [cookedFilterTab, setCookedFilterTab] = useState<'all' | 'liked'>('all');
  const [isProductsExpanded, setIsProductsExpanded] = useState(true);
  const [isCookedExpanded, setIsCookedExpanded] = useState(true);
  const [failedDishImages, setFailedDishImages] = useState<Record<string, boolean>>({});

  // State for Editing Product Amount
  const [editingProduct, setEditingProduct] = useState<KitchenProduct | null>(null);
  const [editAmountValue, setEditAmountValue] = useState('');

  // State for Adding Finished Dish as Cooked
  const [showAddCookedModal, setShowAddCookedModal] = useState(false);
  const [cookedDishSource, setCookedDishSource] = useState<'recipe' | 'custom'>('recipe');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(ALL_RECIPES[0]?.id || '');
  const [customDishName, setCustomDishName] = useState('');
  const [customServings, setCustomServings] = useState(2);
  const [isCustomLiked, setIsCustomLiked] = useState(false);

  const fridgeProducts = products.filter((p) => p.category === 'fridge');
  const storageProducts = products.filter((p) => p.category === 'storage');
  const likedCookedDishes = cookedDishes.filter((d) => d.isLiked);

  const displayedCookedDishes =
    cookedFilterTab === 'liked' ? likedCookedDishes : cookedDishes;

  // Amount Editing Handlers
  const handleOpenEditAmount = (product: KitchenProduct) => {
    setEditingProduct(product);
    setEditAmountValue(product.quantity || '');
  };

  const handleSaveAmount = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingProduct) return;
    onUpdateProductAmount(editingProduct.id, editAmountValue.trim());
    setEditingProduct(null);
  };

  // Add Cooked Dish Handlers
  const handleConfirmAddCooked = (e: React.FormEvent) => {
    e.preventDefault();
    if (cookedDishSource === 'recipe') {
      const rec = ALL_RECIPES.find((r) => r.id === selectedRecipeId);
      if (!rec) return;
      onAddCookedDish({
        name: rec.name,
        cookedAt: 'Cooked today',
        servings: rec.servings,
        image: rec.image,
        description: rec.description,
        recipeId: rec.id,
        isLiked: isCustomLiked,
      });
    } else {
      if (!customDishName.trim()) return;
      onAddCookedDish({
        name: customDishName.trim(),
        cookedAt: 'Cooked today',
        servings: customServings,
        image:
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        description: 'Home-cooked meal prepared fresh in your kitchen.',
        isLiked: isCustomLiked,
      });
    }
    // Reset and close modal
    setShowAddCookedModal(false);
    setCustomDishName('');
    setIsCustomLiked(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 sm:py-12 text-[#1A2D23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header & Primary Action */}
        <div
          id="kitchen-hub-header"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 sm:gap-10 pb-6 border-b border-[#E8E1D5]"
        >
          <div className="text-left space-y-2.5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162E22]">
              Your Kitchen
            </h1>
            <p className="text-sm sm:text-base text-[#5A6E62] leading-relaxed">
              Keep track of what's in your fridge, your storage, and dishes you've prepared.
            </p>
            <div className="pt-3 sm:pt-4">
              <div
                id="header-inventory-badge"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0EA] border border-[#D5E2D9] text-[#1E3A2B] text-xs font-medium"
              >
                <span>Fridge <span className="opacity-70">{fridgeProducts.length}</span></span>
                <span className="text-[#8FA597]">·</span>
                <span>Storage <span className="opacity-70">{storageProducts.length}</span></span>
                {cookedDishes.length > 0 && (
                  <>
                    <span className="text-[#8FA597]">·</span>
                    <span>Cooked <span className="opacity-70">{cookedDishes.length}</span></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Primary CTA: "Create a recipe →" */}
          <button
            id="kitchen-create-recipe-cta"
            onClick={onCreateRecipe}
            className="inline-flex items-center justify-center gap-2 bg-[#1B3B2B] hover:bg-[#142C20] text-[#FAF7F2] px-6 py-3.5 rounded-full text-base font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] shrink-0"
          >
            <span>Create a recipe</span>
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Add Product Search Component */}
        <div className="space-y-2 text-center">
          <AddProductBar onAddProduct={onAddProduct} />
        </div>

        {/* ==================================================================== */}
        {/* 1. TOP-LEVEL CATEGORY: PRODUCTS */}
        {/* Subcategories: Fridge & Storage */}
        {/* ==================================================================== */}
        <div
          id="kitchen-products-section"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] shadow-2xs space-y-6 text-left"
        >
          {/* Top-Level Header: PRODUCTS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0EBE1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] text-[#1B3B2B] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#162E22]">
                    Products
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EAE4D8] text-xs font-semibold text-[#4F6457]">
                    {products.length} total
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#63796D]">
                  Raw food and ingredients across your fridge and pantry storage. Tap amount to edit.
                </p>
              </div>
            </div>

            {/* Filter and Section Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Multiselect Dropdown Input for Subcategories */}
              <div ref={categoryDropdownRef} className="relative">
                <button
                  id="category-multiselect-dropdown-btn"
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="flex items-center gap-2 bg-[#F4EFE7] hover:bg-[#EAE2D5] border border-[#E3D9CA] text-[#1E3A2B] text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2E6B48]/30 shadow-2xs"
                  aria-haspopup="listbox"
                  aria-expanded={isCategoryDropdownOpen}
                >
                  <span className="text-[#597163]">Filter:</span>
                  <span className="font-bold text-[#142B1E]">
                    {selectedCategories.length === 2
                      ? `All (${products.length})`
                      : selectedCategories.length === 1
                      ? selectedCategories[0] === 'fridge'
                        ? `Fridge (${fridgeProducts.length})`
                        : `Storage (${storageProducts.length})`
                      : 'None selected'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#597163] transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Multiselect Dropdown Popover */}
                {isCategoryDropdownOpen && (
                  <div
                    id="category-multiselect-menu"
                    className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E5DEC4]/80 p-2 z-30 space-y-1 text-xs"
                    role="listbox"
                    aria-multiselectable="true"
                  >
                    <div className="px-2 py-1 text-[11px] font-bold text-[#6D8376] uppercase tracking-wider flex items-center justify-between">
                      <span>Categories</span>
                      <button
                        type="button"
                        onClick={
                          selectedCategories.length === 2 ? clearAllCategories : selectAllCategories
                        }
                        className="text-[#2B6A46] hover:underline normal-case font-semibold text-[11px] cursor-pointer"
                      >
                        {selectedCategories.length === 2 ? 'Clear' : 'Select all'}
                      </button>
                    </div>

                    {/* Option 1: Fridge */}
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedCategories.includes('fridge')}
                      onClick={() => toggleCategory('fridge')}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        selectedCategories.includes('fridge')
                          ? 'bg-[#EBF3ED] text-[#163826] font-semibold'
                          : 'hover:bg-[#F6F2EA] text-[#3D5246]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            selectedCategories.includes('fridge')
                              ? 'bg-[#2B6A46] border-[#2B6A46] text-white'
                              : 'border-[#CAD8CF] bg-white'
                          }`}
                        >
                          {selectedCategories.includes('fridge') && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Refrigerator className="w-3.5 h-3.5 text-[#35684A]" />
                          <span>Fridge</span>
                        </div>
                      </div>
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#DEEAE2] text-[#224A34] font-semibold">
                        {fridgeProducts.length}
                      </span>
                    </button>

                    {/* Option 2: Storage */}
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedCategories.includes('storage')}
                      onClick={() => toggleCategory('storage')}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        selectedCategories.includes('storage')
                          ? 'bg-[#F4EEE2] text-[#4A3822] font-semibold'
                          : 'hover:bg-[#F6F2EA] text-[#3D5246]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            selectedCategories.includes('storage')
                              ? 'bg-[#8A5A2B] border-[#8A5A2B] text-white'
                              : 'border-[#D8CCBA] bg-white'
                          }`}
                        >
                          {selectedCategories.includes('storage') && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Archive className="w-3.5 h-3.5 text-[#7A4E22]" />
                          <span>Storage</span>
                        </div>
                      </div>
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#EADDC9] text-[#553C1E] font-semibold">
                        {storageProducts.length}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Separate button: Only caret down-up */}
              <button
                id="toggle-products-collapse-btn"
                type="button"
                onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                className="w-8 h-8 flex items-center justify-center text-[#597163] hover:text-[#1B3B2B] rounded-full bg-[#F4EFE7] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
                title={isProductsExpanded ? 'Collapse section' : 'Expand section'}
                aria-label={isProductsExpanded ? 'Collapse section' : 'Expand section'}
              >
                {isProductsExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Subcategories Container */}
          {isProductsExpanded && (
            <div className="space-y-8 pt-2">
              {/* If no categories are checked in multiselect */}
              {selectedCategories.length === 0 && (
                <div className="py-12 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E3DACB] space-y-2">
                  <p className="text-sm font-semibold text-[#162E22]">
                    No categories selected
                  </p>
                  <p className="text-xs text-[#6F8477]">
                    Open the filter dropdown above to select Fridge, Storage, or both.
                  </p>
                  <button
                    type="button"
                    onClick={selectAllCategories}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#235838] hover:underline cursor-pointer pt-1"
                  >
                    Select all categories
                  </button>
                </div>
              )}

              {/* --- SUBCATEGORY A: FRIDGE --- */}
              {selectedCategories.includes('fridge') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#162E22] flex items-center gap-2">
                        <span>Fridge</span>
                        <span className="text-xs font-semibold text-[#5B7164]">
                          · {fridgeProducts.length} products
                        </span>
                      </h3>
                      <p className="text-xs text-[#6F8477]">
                        Products stored in the refrigerator
                      </p>
                    </div>
                  </div>

                  {fridgeProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {fridgeProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-[#F8FAF8] rounded-2xl p-3 sm:p-3.5 border border-[#E1ECE3] hover:border-[#B8D4C0] flex items-center justify-between group transition-all"
                        >
                          <div className="space-y-1 truncate pr-2 min-w-0">
                            <p className="font-semibold text-sm text-[#162E22] truncate">
                              {product.name}
                            </p>
                            {/* Editable Amount Badge */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditAmount(product)}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EBF3ED] hover:bg-[#DCEAE0] text-[11px] font-medium text-[#204933] transition-colors cursor-pointer max-w-full truncate"
                              title="Click to edit amount"
                            >
                              <span className="truncate">
                                {product.quantity ? product.quantity : '+ Add amount'}
                              </span>
                            </button>
                          </div>
                          <div className="flex items-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleOpenEditAmount(product)}
                              title={`Edit amount for ${product.name}`}
                              className="text-[#96A89E] hover:text-[#162E22] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#809589] italic py-2">
                      Your fridge is empty. Search and add products above!
                    </p>
                  )}
                </div>
              )}

              {/* --- SUBCATEGORY B: STORAGE --- */}
              {selectedCategories.includes('storage') && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#162E22] flex items-center gap-2">
                        <span>Storage</span>
                        <span className="text-xs font-semibold text-[#5B7164]">
                          · {storageProducts.length} products
                        </span>
                      </h3>
                      <p className="text-xs text-[#6F8477]">
                        Pantry and non-refrigerated products
                      </p>
                    </div>
                  </div>

                  {storageProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {storageProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-[#FAF8F4] rounded-2xl p-3 sm:p-3.5 border border-[#E9E1D2] hover:border-[#D8CBBA] flex items-center justify-between group transition-all"
                        >
                          <div className="space-y-1 truncate pr-2 min-w-0">
                            <p className="font-semibold text-sm text-[#162E22] truncate">
                              {product.name}
                            </p>
                            {/* Editable Amount Badge */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditAmount(product)}
                              className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F4EFE5] hover:bg-[#EBE3D4] text-[11px] font-medium text-[#50402E] transition-colors cursor-pointer max-w-full truncate"
                              title="Click to edit amount"
                            >
                              <span className="truncate">
                                {product.quantity ? product.quantity : '+ Add amount'}
                              </span>
                            </button>
                          </div>
                          <div className="flex items-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleOpenEditAmount(product)}
                              title={`Edit amount for ${product.name}`}
                              className="text-[#96A89E] hover:text-[#162E22] p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#809589] italic py-2">
                      Your pantry storage is empty. Search and add non-refrigerated goods above!
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* 2. TOP-LEVEL CATEGORY: COOKED DISHES */}
        {/* Distinct top-level category: meals the user has already prepared */}
        {/* ==================================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] shadow-2xs space-y-6 text-left">
          {/* Top-Level Header: COOKED DISHES */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0EBE1]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FDEEEB] text-[#D44733] flex items-center justify-center">
                <Soup className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#162E22]">
                    Cooked dishes
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E5] text-xs font-semibold text-[#C13F2C]">
                    {cookedDishes.length} {cookedDishes.length === 1 ? 'meal' : 'meals'}
                  </span>
                </div>
                <p id="cooked-dishes-description" className="text-xs sm:text-sm text-[#63796D]">
                  Meals you've already prepared. Like favorites or add finished dishes anytime.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {/* Filter Dropdown Input for Cooked Dishes (All vs Liked) */}
              <div ref={cookedDropdownRef} className="relative" id="cooked-filter-dropdown-container">
                <button
                  id="cooked-filter-dropdown-btn"
                  type="button"
                  onClick={() => setIsCookedDropdownOpen(!isCookedDropdownOpen)}
                  className="flex items-center gap-2 bg-[#F4EFE7] hover:bg-[#EAE2D5] border border-[#E3D9CA] text-[#1E3A2B] text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2E6B48]/30 shadow-2xs"
                  aria-haspopup="listbox"
                  aria-expanded={isCookedDropdownOpen}
                >
                  <span className="text-[#597163]">Filter:</span>
                  <span className="font-bold text-[#142B1E] flex items-center gap-1.5">
                    {cookedFilterTab === 'liked' ? (
                      <>
                        <Heart className="w-3.5 h-3.5 fill-current text-[#D04834]" />
                        <span>Liked ({likedCookedDishes.length})</span>
                      </>
                    ) : (
                      <span>All ({cookedDishes.length})</span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#597163] transition-transform duration-200 ${
                      isCookedDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Popover */}
                {isCookedDropdownOpen && (
                  <div
                    id="cooked-filter-dropdown-menu"
                    className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E5DEC4]/80 p-1.5 z-30 space-y-1 text-xs"
                    role="listbox"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={cookedFilterTab === 'all'}
                      onClick={() => {
                        setCookedFilterTab('all');
                        setIsCookedDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        cookedFilterTab === 'all'
                          ? 'bg-[#EBF3ED] text-[#163826] font-semibold'
                          : 'hover:bg-[#F6F2EA] text-[#3D5246]'
                      }`}
                    >
                      <span>All dishes</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#E3EBE5] text-[#204933] font-semibold">
                        {cookedDishes.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      role="option"
                      aria-selected={cookedFilterTab === 'liked'}
                      onClick={() => {
                        setCookedFilterTab('liked');
                        setIsCookedDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                        cookedFilterTab === 'liked'
                          ? 'bg-[#FDECE9] text-[#C13F2C] font-semibold'
                          : 'hover:bg-[#F6F2EA] text-[#3D5246]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-current text-[#D04834]" />
                        <span>Liked dishes</span>
                      </div>
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#FCE6E2] text-[#C13F2C] font-semibold">
                        {likedCookedDishes.length}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action Button: "+ Add cooked dish" */}
              <button
                id="add-cooked-dish-btn"
                type="button"
                onClick={() => setShowAddCookedModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1B3B2B] hover:bg-[#142C20] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add cooked dish</span>
              </button>

              <button
                id="toggle-cooked-collapse-btn"
                type="button"
                onClick={() => setIsCookedExpanded(!isCookedExpanded)}
                className="w-8 h-8 flex items-center justify-center text-[#597163] hover:text-[#162E22] rounded-full bg-[#F4EFE7] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
                title={isCookedExpanded ? 'Collapse section' : 'Expand section'}
                aria-label={isCookedExpanded ? 'Collapse section' : 'Expand section'}
              >
                {isCookedExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Cooked Dishes List */}
          {isCookedExpanded && (
            <div>
              {displayedCookedDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {displayedCookedDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8E1D5] flex gap-4 items-center hover:border-[#D2C5B4] transition-all group relative"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-[#E5DDD0] bg-[#18261F]">
                        {dish.image && !failedDishImages[dish.id] ? (
                          <img
                            src={dish.image}
                            alt={dish.name}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedDishImages((prev) => ({ ...prev, [dish.id]: true }))
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <WatchDownloadingPlaceholder
                            size="compact"
                            recipeName={dish.name}
                          />
                        )}
                      </div>
                      <div className="space-y-1 text-left min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-base text-[#162E22] truncate">
                            {dish.name}
                          </h4>
                          <div className="flex items-center gap-1 shrink-0">
                            {/* Like / Heart Toggle Button */}
                            <button
                              type="button"
                              onClick={() => onToggleLikeCookedDish(dish.id)}
                              title={dish.isLiked ? 'Unlike dish' : 'Like this dish'}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                dish.isLiked
                                  ? 'bg-[#FDECE9] text-[#D04834]'
                                  : 'text-[#9CB0A5] hover:text-[#D04834] hover:bg-white'
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  dish.isLiked ? 'fill-current' : ''
                                }`}
                              />
                            </button>
                            {/* Remove cooked dish */}
                            <button
                              type="button"
                              onClick={() => onRemoveCookedDish(dish.id)}
                              title="Remove cooked dish"
                              className="p-1.5 text-[#9CB0A5] hover:text-[#C94736] rounded-lg hover:bg-white transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#667B6F]">
                          <span>{dish.cookedAt}</span>
                          <span>·</span>
                          <span>{dish.servings} servings</span>
                        </div>
                        {dish.description && (
                          <p className="text-xs text-[#526659] line-clamp-1">
                            {dish.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#E8F0EA] text-[#224A34] text-[10px] font-semibold">
                            Ready in fridge
                          </span>
                          {dish.isLiked && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FDECE9] text-[#C93B2B] text-[10px] font-semibold">
                              <Heart className="w-2.5 h-2.5 fill-current" /> Liked
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DFD8CC] space-y-3">
                  <p className="text-sm font-medium text-[#5B7164]">
                    {cookedFilterTab === 'liked'
                      ? 'No liked cooked dishes yet.'
                      : 'No cooked dishes saved yet.'}
                  </p>
                  <p className="text-xs text-[#7B9084] max-w-sm mx-auto">
                    {cookedFilterTab === 'liked'
                      ? 'Tap the heart icon on any cooked dish to add it to your favorites.'
                      : 'Finish cooking a recipe or tap "+ Add cooked dish" to log a meal.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAddCookedModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#142C20] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log a cooked meal now</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL 1: EDIT PRODUCT AMOUNT */}
      {/* ==================================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-[#162E22]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 border border-[#E0D7C9] shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span
                  id="edit-modal-category-badge"
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF3ED] text-[11px] font-semibold text-[#204933] mb-1 capitalize"
                >
                  {editingProduct.category === 'fridge' ? 'Fridge' : 'Storage'}
                </span>
                <h3 className="text-xl font-bold text-[#162E22]">
                  Edit amount for {editingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-full text-[#75887D] hover:text-[#162E22] hover:bg-[#F2ECE1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAmount} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#5B7164]">
                  Quantity / Amount
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editAmountValue}
                    onChange={(e) => setEditAmountValue(e.target.value)}
                    placeholder="e.g. 6 pcs, 500g, 1 carton, 2 cans..."
                    autoFocus
                    className="flex-1 bg-[#FAF8F5] px-4 py-3 rounded-xl border border-[#DCD3C5] focus:border-[#1B3B2B] focus:ring-1 focus:ring-[#1B3B2B] text-sm text-[#162E22] placeholder-[#95A49B] outline-none"
                  />
                  {editAmountValue && (
                    <button
                      type="button"
                      onClick={() => setEditAmountValue('')}
                      className="text-xs text-[#8A9C91] hover:text-[#C94736] px-2 py-1"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Amount Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-[#7D9185]">
                  Quick Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '1 pc',
                    '2 pcs',
                    '4 pcs',
                    '6 pcs',
                    '12 pcs',
                    '250g',
                    '500g',
                    '1 kg',
                    '1 pack',
                    '1 can',
                    '1 bottle',
                    'Half',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEditAmountValue(preset)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        editAmountValue === preset
                          ? 'bg-[#1B3B2B] text-white border-[#1B3B2B]'
                          : 'bg-[#F5EFE6] text-[#4F6457] border-[#E8DFCFA] hover:bg-[#EBE3D5]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F0EAE0]">
                <button
                  type="button"
                  onClick={() => {
                    if (editingProduct) {
                      onRemoveProduct(editingProduct.id);
                      setEditingProduct(null);
                    }
                  }}
                  className="py-2.5 px-3 rounded-xl text-[#C94736] hover:bg-[#FDECE9] text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove item</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="py-2.5 px-4 rounded-xl border border-[#D9CFBF] text-[#556D60] text-sm font-semibold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-[#1B3B2B] text-white text-sm font-semibold hover:bg-[#142C20] shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: ADD FINISHED DISH AS COOKED */}
      {/* ==================================================================== */}
      {showAddCookedModal && (
        <div className="fixed inset-0 z-50 bg-[#162E22]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E0D7C9] shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FDEEEB] text-xs font-semibold text-[#D04834] mb-2">
                  <Soup className="w-3.5 h-3.5" />
                  <span>Add Finished Dish</span>
                </span>
                <h3 className="text-2xl font-bold text-[#162E22]">
                  Add a Cooked Dish
                </h3>
                <p className="text-xs sm:text-sm text-[#657B6E] mt-1">
                  Log a meal you've prepared so Kitchen Companion keeps your fridge updated.
                </p>
              </div>
              <button
                onClick={() => setShowAddCookedModal(false)}
                className="p-1.5 rounded-full text-[#75887D] hover:text-[#162E22] hover:bg-[#F2ECE1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Switch between: Recipe Library vs Custom Meal */}
            <div className="grid grid-cols-2 gap-2 bg-[#F4EFE7] p-1 rounded-2xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCookedDishSource('recipe')}
                className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  cookedDishSource === 'recipe'
                    ? 'bg-white text-[#1B3B2B] shadow-2xs font-bold'
                    : 'text-[#597163] hover:text-[#1B3B2B]'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>From Recipes</span>
              </button>
              <button
                type="button"
                onClick={() => setCookedDishSource('custom')}
                className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  cookedDishSource === 'custom'
                    ? 'bg-white text-[#1B3B2B] shadow-2xs font-bold'
                    : 'text-[#597163] hover:text-[#1B3B2B]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Custom Meal</span>
              </button>
            </div>

            <form onSubmit={handleConfirmAddCooked} className="space-y-5">
              {cookedDishSource === 'recipe' ? (
                /* Choose from Recipe Library */
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#5B7164] uppercase tracking-wider">
                    Select Prepared Recipe
                  </label>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {ALL_RECIPES.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedRecipeId(rec.id)}
                        className={`p-3 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all ${
                          selectedRecipeId === rec.id
                            ? 'border-[#1B3B2B] bg-[#F2F7F4]'
                            : 'border-[#EAE3D5] bg-[#FAF8F5] hover:border-[#1B3B2B]/40'
                        }`}
                      >
                        <img
                          src={rec.image}
                          alt={rec.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#DFD8CC]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[#162E22] truncate">
                            {rec.name}
                          </p>
                          <p className="text-xs text-[#63796D] truncate">
                            {rec.prepTime} · {rec.servings} servings · {rec.difficulty}
                          </p>
                        </div>
                        {selectedRecipeId === rec.id && (
                          <div className="w-6 h-6 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Custom Meal Entry */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#5B7164] uppercase tracking-wider">
                      Meal Name
                    </label>
                    <input
                      type="text"
                      value={customDishName}
                      onChange={(e) => setCustomDishName(e.target.value)}
                      placeholder="e.g. Homemade Lasagna, Vegetable Stir-Fry..."
                      className="w-full bg-[#FAF8F5] px-4 py-3 rounded-xl border border-[#DCD3C5] focus:border-[#1B3B2B] text-sm text-[#162E22] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#5B7164] uppercase tracking-wider">
                      Number of Servings
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setCustomServings(num)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                            customServings === num
                              ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white'
                              : 'border-[#EAE3D5] bg-[#FAF8F5] text-[#3B4E43] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Like / Favorite Toggle */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E9E1D2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Heart
                    className={`w-5 h-5 ${
                      isCustomLiked ? 'fill-[#D04834] text-[#D04834]' : 'text-[#84998D]'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-bold text-[#162E22]">
                      Like this finished dish?
                    </p>
                    <p className="text-xs text-[#6F8477]">
                      Mark it as a favorite in your cooked meals.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomLiked(!isCustomLiked)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCustomLiked
                      ? 'bg-[#FDECE9] text-[#D04834] border border-[#F6C6BF]'
                      : 'bg-white border border-[#DCD3C5] text-[#556D60] hover:bg-[#F4EFE6]'
                  }`}
                >
                  {isCustomLiked ? '❤️ Liked' : '+ Like'}
                </button>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cookedDishSource === 'custom' && !customDishName.trim()}
                  className="w-full py-3.5 rounded-2xl bg-[#1B3B2B] hover:bg-[#142C20] disabled:opacity-40 disabled:cursor-not-allowed text-[#FAF7F2] font-semibold text-base flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add to Cooked Dishes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
