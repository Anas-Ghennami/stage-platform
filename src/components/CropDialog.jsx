import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
};

const CropDialog = ({ imageSrc, onConfirm, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    setProcessing(true);
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onConfirm(blob);
    setProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Recadrer la photo</h2>
          <p className="text-sm text-gray-500 mt-1">Déplacez et zoomez pour ajuster votre photo de profil.</p>
        </div>

        {/* Cropper area */}
        <div className="relative h-72 bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: { borderRadius: 0 },
              cropAreaStyle: { border: "3px solid #3b82f6" },
            }}
          />
        </div>

        {/* Zoom */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-600">Zoom</label>
            <span className="text-xs text-gray-400">{zoom.toFixed(1)}x</span>
          </div>
          <input type="range" min={1} max={3} step={0.05} value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer" />
        </div>

        {/* Preview */}
        <div className="px-6 pb-4 flex items-center gap-3">
          <p className="text-xs text-gray-400">Aperçu :</p>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={() => {}}
              onZoomChange={() => {}}
              onCropComplete={() => {}}
              style={{
                containerStyle: { width: 40, height: 40, position: "relative" },
                mediaStyle: { transform: `translate(-${crop.x}px, -${crop.y}px) scale(${zoom})` },
              }}
            />
          </div>
          <p className="text-xs text-gray-400">Voilà à quoi ressemblera votre photo.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 pb-5">
          <button onClick={handleConfirm} disabled={processing}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50">
            {processing ? "Traitement..." : "Confirmer"}
          </button>
          <button onClick={onCancel}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition">
            Annuler
          </button>
        </div>

      </div>
    </div>
  );
};

export default CropDialog;
