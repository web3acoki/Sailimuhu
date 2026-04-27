import { useState, useRef } from "react";
import { Sparkles, Upload, ArrowRight, Wand2, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

export function AIStudio() {
  const [step, setStep] = useState<"upload" | "processing" | "result">("upload");
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("result");
    }, 2500);
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || step !== "result") return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    setSliderPos(pos);
  };

  return (
    <div className="min-h-full bg-[#1a1a1a] flex flex-col font-sans">
      <div className="pt-safe px-5 py-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200 flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-accent" />
          AI 写真馆
        </h1>
        <p className="text-gray-400 text-sm">一键穿越时空，体验最美新疆风情</p>
      </div>

      <div className="flex-1 flex flex-col px-5 pb-8 relative">
        {step === "upload" && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center aspect-[3/4] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-md relative z-10">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2 relative z-10">上传或拍摄正面清晰照片</h3>
              <p className="text-gray-400 text-sm relative z-10">推荐使用光线均匀的半身照</p>
              
              <button 
                onClick={handleGenerate}
                className="mt-8 bg-gradient-to-r from-accent to-yellow-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-accent/20 flex items-center gap-2 hover:scale-105 transition-transform relative z-10"
              >
                立即体验 <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">
                <div className="text-xl mb-1">👗</div>
                <div className="text-xs text-white">艾德莱斯礼服</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5 opacity-50 cursor-not-allowed">
                <div className="text-xl mb-1">❄️</div>
                <div className="text-xs text-white">蓝冰仙子</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5 opacity-50 cursor-not-allowed">
                <div className="text-xl mb-1">🐎</div>
                <div className="text-xs text-white">草原牧羊女</div>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wand2 className="w-12 h-12 text-accent animate-pulse" />
              </div>
            </div>
            <h3 className="text-white text-lg font-bold mb-2">AI 正在施展魔法...</h3>
            <p className="text-gray-400 text-sm">正在合成艾德莱斯礼服细节，预计需要10秒</p>
          </div>
        )}

        {step === "result" && (
          <div className="flex-1 flex flex-col relative">
            <div 
              ref={containerRef}
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden touch-none select-none"
              onMouseMove={handleDrag}
              onTouchMove={handleDrag}
            >
              {/* Original Image (Underneath) */}
              <img 
                src="https://images.unsplash.com/photo-1525060539736-979c838b7072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwZmVtYWxlJTIwc21pbGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
                alt="Before"
                draggable={false}
              />
              
              {/* Generated Image (On top, clipped) */}
              <div 
                className="absolute inset-0 w-full h-full object-cover border-r-2 border-white pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1743646960733-605b26b19f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGV0aG5pYyUyMGRyZXNzJTIwYXNpYW4lMjBmZW1hbGUlMjBwYXR0ZXJufGVufDF8fHx8MTc3NzI3ODg3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  className="w-full h-full object-cover"
                  alt="After"
                  draggable={false}
                />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-8 -ml-4 flex items-center justify-center cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-900 border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-gray-300 rounded-full" />
                    <div className="w-1 h-3 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded">原图</div>
              <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur text-white text-xs px-2 py-1 rounded">AI 生成</div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setStep("upload")}
                className="flex-1 bg-white/10 text-white py-3.5 rounded-full font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> 重试
              </button>
              <button className="flex-[2] bg-gradient-to-r from-accent to-yellow-600 text-white py-3.5 rounded-full font-bold shadow-lg shadow-accent/20">
                保存高清大图 (¥9.9)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
