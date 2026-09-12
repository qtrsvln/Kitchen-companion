import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Refrigerator, Archive, X, Check, Camera, QrCode } from 'lucide-react';
import { POPULAR_PRODUCTS, PRODUCT_CATALOG } from '../data/mockData';
import { ProductCategory } from '../types';
import { ScannerModal } from './ScannerModal';

interface AddProductBarProps {
  onAddProduct: (name: string, category: ProductCategory, quantity?: string) => void;
}

export const AddProductBar: React.FC<AddProductBarProps> = ({ onAddProduct }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<string | null>(null);
  const [pendingQuantity, setPendingQuantity] = useState('');
  const [successToast, setSuccessToast] = useState<{ name: string; category: ProductCategory; quantity?: string } | null>(null);
  const [scannerModal, setScannerModal] = useState<{ isOpen: boolean; mode: 'camera' | 'qr' }>({
    isOpen: false,
    mode: 'camera',
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions
  const trimmed = query.trim().toLowerCase();
  const isTyping = trimmed.length > 0;

  // Filter from product catalog
  const filteredSuggestions = isTyping
    ? PRODUCT_CATALOG.filter((item) =>
        item.name.toLowerCase().includes(trimmed)
      ).map((item) => item.name)
    : POPULAR_PRODUCTS;

  // Check if exact match exists
  const exactMatchExists = PRODUCT_CATALOG.some(
    (item) => item.name.toLowerCase() === trimmed
  );

  const handleSelectProduct = (productName: string) => {
    setPendingProduct(productName);
    setPendingQuantity('');
    setIsFocused(false);
  };

  const handleConfirmLocation = (category: ProductCategory) => {
    if (!pendingProduct) return;
    const qty = pendingQuantity.trim() || undefined;
    onAddProduct(pendingProduct, category, qty);
    setSuccessToast({ name: pendingProduct, category, quantity: qty });
    setPendingProduct(null);
    setPendingQuantity('');
    setQuery('');
    setTimeout(() => {
      setSuccessToast(null);
    }, 2800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        handleSelectProduct(filteredSuggestions[0]);
      } else if (trimmed.length > 0) {
        handleSelectProduct(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4.5 text-[#597163] pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          id="product-search-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Add product or ingredient (e.g. Eggs, Tomatoes, Rice...)"
          className="w-full bg-white pl-12 pr-28 sm:pr-32 py-3.5 sm:py-4 rounded-2xl border border-[#D9D1C3] focus:border-[#1B3B2B] focus:ring-2 focus:ring-[#1B3B2B]/15 text-base text-[#162E22] placeholder-[#819287] shadow-xs outline-none transition-all"
        />

        {/* Action icons on right: Clear, Camera scan, QR code scan */}
        <div className="absolute right-2.5 sm:right-3 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 text-[#7A8E82] hover:text-[#162E22] rounded-full hover:bg-[#F2ECE1] cursor-pointer transition-colors"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Camera Scan Icon Button */}
          <button
            type="button"
            id="search-camera-btn"
            onClick={() => setScannerModal({ isOpen: true, mode: 'camera' })}
            className="p-1.5 sm:p-2 text-[#597163] hover:text-[#162E22] hover:bg-[#EFEAE0] rounded-xl transition-all cursor-pointer group"
            title="Scan groceries with camera"
            aria-label="Scan groceries with camera"
          >
            <Camera className="w-5 h-5 transition-transform group-hover:scale-110" />
          </button>

          {/* QR Code / Barcode Scan Icon Button */}
          <button
            type="button"
            id="search-qrcode-btn"
            onClick={() => setScannerModal({ isOpen: true, mode: 'qr' })}
            className="p-1.5 sm:p-2 text-[#597163] hover:text-[#162E22] hover:bg-[#EFEAE0] rounded-xl transition-all cursor-pointer group"
            title="Scan barcode or QR code"
            aria-label="Scan barcode or QR code"
          >
            <QrCode className="w-5 h-5 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#DFD7C9] shadow-xl z-50 overflow-hidden text-left animate-in fade-in duration-150">
          <div className="p-3 border-b border-[#F0EAE0] bg-[#FAF8F5]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B8074]">
              {isTyping ? `Suggestions matching "${query}"` : 'Popular products'}
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto p-2 divide-y divide-[#F6F2EC]">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectProduct(item);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl hover:bg-[#F2EFE8] flex items-center justify-between text-left text-sm font-medium text-[#1A2E23] transition-colors cursor-pointer group"
                >
                  <span className="group-hover:text-[#162E22]">{item}</span>
                  <span className="text-xs text-[#6D8275] flex items-center gap-1 group-hover:text-[#162E22]">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </span>
                </button>
              ))
            ) : null}

            {/* Custom Product Option if typing and not matching an exact name */}
            {isTyping && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectProduct(query.trim());
                }}
                className="w-full px-3.5 py-3 rounded-xl bg-[#F6F3ED] hover:bg-[#EEE9DF] flex items-center justify-between text-left text-sm font-medium text-[#1B3B2B] transition-colors cursor-pointer mt-1"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1B3B2B] text-white flex items-center justify-center text-xs">
                    +
                  </span>
                  <span>Add custom product: <strong className="underline decoration-[#1B3B2B]/40">"{query.trim()}"</strong></span>
                </div>
                <span className="text-xs text-[#526B5C]">Tap to add</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* "Where do you keep it?" Prompt Modal / Popover */}
      {pendingProduct && (
        <div className="fixed inset-0 z-50 bg-[#162E22]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E0D7C9] shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#EBF3ED] text-xs font-semibold text-[#204933] mb-2">
                  New Product
                </span>
                <h3 className="text-2xl font-bold text-[#162E22]">
                  {pendingProduct}
                </h3>
              </div>
              <button
                onClick={() => setPendingProduct(null)}
                className="p-1.5 rounded-full text-[#75887D] hover:text-[#162E22] hover:bg-[#F2ECE1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Amount / Quantity Input (Optional) */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-[#52685B]">
                  Amount / Quantity <span className="text-[#86998E] font-normal">(optional)</span>
                </label>
                {pendingQuantity && (
                  <button
                    type="button"
                    onClick={() => setPendingQuantity('')}
                    className="text-[#96A89E] hover:text-[#C94736] text-[11px]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="text"
                value={pendingQuantity}
                onChange={(e) => setPendingQuantity(e.target.value)}
                placeholder="e.g. 6 pcs, 500g, 1 carton, 2 cans..."
                className="w-full bg-[#FAF8F5] px-3.5 py-2.5 rounded-xl border border-[#DCD3C5] focus:border-[#1B3B2B] text-sm text-[#162E22] placeholder-[#95A49B] outline-none"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['1 pc', '2 pcs', '6 pcs', '1 pack', '500g', '1 bunch'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPendingQuantity(preset)}
                    className="px-2 py-0.5 rounded-md bg-[#F2EDE2] hover:bg-[#E7E0D3] text-[11px] font-medium text-[#46594D] transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-[#162E22]">
              Where do you keep it?
            </p>

            {/* Location Options: Fridge or Storage */}
            <div className="mt-3 grid grid-cols-2 gap-3.5">
              <button
                id="choose-location-fridge-btn"
                type="button"
                onClick={() => handleConfirmLocation('fridge')}
                className="p-5 rounded-2xl border-2 border-[#D9E5DC] hover:border-[#1B3B2B] bg-[#F7FBF8] hover:bg-[#EEF7F0] flex flex-col items-center text-center transition-all cursor-pointer group hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E0EFE4] text-[#1B3B2B] flex items-center justify-center mb-3 group-hover:bg-[#1B3B2B] group-hover:text-white transition-colors">
                  <Refrigerator className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#162E22] text-base">Fridge</span>
                <span className="text-xs text-[#5D7366] mt-1 leading-snug">
                  Refrigerated & cold items
                </span>
              </button>

              <button
                id="choose-location-storage-btn"
                type="button"
                onClick={() => handleConfirmLocation('storage')}
                className="p-5 rounded-2xl border-2 border-[#E7DFD0] hover:border-[#1B3B2B] bg-[#FAF8F4] hover:bg-[#F5EFE4] flex flex-col items-center text-center transition-all cursor-pointer group hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBE2D3] text-[#1B3B2B] flex items-center justify-center mb-3 group-hover:bg-[#1B3B2B] group-hover:text-white transition-colors">
                  <Archive className="w-6 h-6" />
                </div>
                <span className="font-bold text-[#162E22] text-base">Storage</span>
                <span className="text-xs text-[#5D7366] mt-1 leading-snug">
                  Pantry & shelf staples
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Modal for Camera & QR/Barcode */}
      <ScannerModal
        isOpen={scannerModal.isOpen}
        mode={scannerModal.mode}
        onClose={() => setScannerModal((prev) => ({ ...prev, isOpen: false }))}
        onScanResult={(name, qty) => {
          setPendingProduct(name);
          setPendingQuantity(qty || '');
          setIsFocused(false);
        }}
      />

      {/* Success Notification Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#162E22] text-[#FAF7F2] px-5 py-3.5 rounded-2xl shadow-xl border border-[#274B37] flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#30704D] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
          <p className="text-sm font-medium">
            Added <strong>{successToast.name}</strong> to{' '}
            <span className="capitalize font-semibold text-[#8EE8B3]">
              {successToast.category}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
