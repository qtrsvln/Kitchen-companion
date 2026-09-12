import React, { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, X, Upload, Check, AlertCircle, Sparkles } from 'lucide-react';

interface ScannerModalProps {
  mode: 'camera' | 'qr';
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (productName: string, quantity?: string) => void;
}

const SAMPLE_BARCODES = [
  { code: '8410239012', name: 'Organic Greek Yogurt', qty: '500g', brand: 'Chobani' },
  { code: '0284000401', name: 'Eggs', qty: '12 pcs', brand: 'Happy Egg' },
  { code: '7350052850', name: 'Oat Milk', qty: '1 Liter', brand: 'Oatly' },
  { code: '0111108242', name: 'San Marzano Tomatoes', qty: '400g can', brand: 'Mutti' },
  { code: '5010044001', name: 'Avocados', qty: '3 pack', brand: 'Fresh' },
];

export const ScannerModal: React.FC<ScannerModalProps> = ({
  mode,
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'qr'>(mode);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedProduct, setDetectedProduct] = useState<{ name: string; qty?: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  // Request camera stream when open in camera or qr mode
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setDetectedProduct(null);
      return;
    }

    let isMounted = true;

    async function startCamera() {
      setCameraError(null);
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          });
          if (isMounted) {
            setCameraStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play().catch(() => {});
            }
          } else {
            stream.getTracks().forEach((track) => track.stop());
          }
        } else {
          setCameraError('Camera access not supported by browser environment.');
        }
      } catch (err: any) {
        setCameraError(
          err.name === 'NotAllowedError'
            ? 'Camera permission was denied. You can still upload a photo or pick a sample code.'
            : 'Could not activate camera. Try uploading an image or using sample barcodes below.'
        );
      }
    }

    startCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleSimulateScan = (name: string, qty?: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDetectedProduct({ name, qty });
      setTimeout(() => {
        onScanResult(name, qty);
        onClose();
      }, 700);
    }, 450);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      // Simulate smart vision scanning the uploaded grocery image
      setTimeout(() => {
        setIsScanning(false);
        const recognized = SAMPLE_BARCODES[Math.floor(Math.random() * SAMPLE_BARCODES.length)];
        setDetectedProduct({ name: recognized.name, qty: recognized.qty });
        setTimeout(() => {
          onScanResult(recognized.name, recognized.qty);
          onClose();
        }, 800);
      }, 900);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#E2DDD3] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE3D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'text-[#586F62] hover:bg-[#EFEAE0]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Camera Scan</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'text-[#586F62] hover:bg-[#EFEAE0]'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Barcode / QR</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#556A5E] hover:text-[#162E22] hover:bg-[#E5DDCF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="relative aspect-4/3 bg-[#111F17] flex items-center justify-center overflow-hidden">
          {/* Live Video Feed if available */}
          {cameraStream ? (
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-[#9AB3A4]">
              {cameraError ? (
                <>
                  <AlertCircle className="w-9 h-9 text-[#E07A5F] mb-2 opacity-90" />
                  <p className="text-xs text-[#E6EFEA] max-w-xs">{cameraError}</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                    {activeTab === 'camera' ? (
                      <Camera className="w-6 h-6 text-[#A3C4B0]" />
                    ) : (
                      <QrCode className="w-6 h-6 text-[#A3C4B0]" />
                    )}
                  </div>
                  <p className="text-xs text-[#CCDCD2]">Starting camera scanner...</p>
                </>
              )}
            </div>
          )}

          {/* Scanner Overlay Sight & Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {activeTab === 'qr' ? (
              /* QR / Barcode Reticle */
              <div className="relative w-56 h-36 border-2 border-dashed border-[#A0D4B2]/70 rounded-2xl flex items-center justify-center">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#34D399] rounded-tl-lg -mt-1 -ml-1" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#34D399] rounded-tr-lg -mt-1 -mr-1" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#34D399] rounded-bl-lg -mb-1 -ml-1" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#34D399] rounded-br-lg -mb-1 -mr-1" />
                
                {/* Red Laser Scanner Bar */}
                <div className="w-full h-0.5 bg-[#EF4444] shadow-[0_0_8px_#EF4444] animate-pulse" />
              </div>
            ) : (
              /* Camera Object Recognition Frame */
              <div className="relative w-64 h-48 border-2 border-white/50 rounded-2xl">
                <div className="absolute top-2 left-2 text-[10px] tracking-wider uppercase font-mono px-1.5 py-0.5 rounded bg-black/60 text-white flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#34D399]" />
                  <span>AI Food Vision</span>
                </div>
              </div>
            )}
          </div>

          {/* Success Overlay when detected */}
          {detectedProduct && (
            <div className="absolute inset-0 bg-[#162E22]/90 flex flex-col items-center justify-center text-white animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#2E7D52] text-white flex items-center justify-center mb-2 shadow-lg">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <p className="text-sm text-[#A0D4B2] font-medium">Scanned successfully!</p>
              <p className="text-lg font-bold mt-1 text-white">{detectedProduct.name}</p>
              {detectedProduct.qty && (
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full mt-1.5">
                  {detectedProduct.qty}
                </span>
              )}
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && !detectedProduct && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white">
              <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin mb-2" />
              <p className="text-xs font-medium">Analyzing barcode...</p>
            </div>
          )}
        </div>

        {/* Action Controls & Sample Quick Scans */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#FAF7F2]">
          <div className="flex items-center justify-between gap-3">
            {/* Upload image button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2.5 px-3 rounded-xl border border-[#D5CDC0] bg-white hover:bg-[#F2ECE1] text-xs font-semibold text-[#162E22] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Upload className="w-4 h-4 text-[#476052]" />
              <span>Upload Photo</span>
            </button>

            {/* Snap button for camera */}
            <button
              onClick={() => {
                const sample = SAMPLE_BARCODES[Math.floor(Math.random() * SAMPLE_BARCODES.length)];
                handleSimulateScan(sample.name, sample.qty);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B3B2B] hover:bg-[#254F3A] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>Snap & Detect</span>
            </button>
          </div>

          {/* Quick Barcode Demo Taps */}
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#667E70] mb-2 text-left">
              Or tap a sample {activeTab === 'qr' ? 'barcode' : 'groceries'} to test:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_BARCODES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleSimulateScan(item.name, item.qty)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD5C7] hover:border-[#1B3B2B] hover:bg-[#F3EFE7] text-left text-xs text-[#162E22] transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="text-[#657B6E] font-mono text-[10px]">#{item.code.slice(-4)}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
