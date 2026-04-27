import { useState } from "react";
import { ArrowLeft, MapPin, Camera, Star, ChevronRight, Navigation2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { clsx } from "clsx";

const POIS = [
  { id: 1, name: "克勒涌珠", x: 60, y: 30, recommended: true },
  { id: 2, name: "松树头", x: 30, y: 70, recommended: false },
  { id: 3, name: "点将台", x: 80, y: 60, recommended: false },
];

const PHOTOGRAPHERS = [
  {
    id: "p1",
    name: "王摄·风光专精",
    avatar: "https://images.unsplash.com/photo-1762708550141-2688121b9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBob2xkaW5nJTIwY2FtZXJhJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.9,
    orders: 342,
    price: 399,
    tags: ["蓝冰人像", "航拍", "擅长引导"]
  },
  {
    id: "p2",
    name: "阿依古丽·民族风",
    avatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwZmVtYWxlJTIwc21pbGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200",
    rating: 4.8,
    orders: 215,
    price: 299,
    tags: ["艾德莱斯", "情绪流"]
  }
];

export function MapNavigate() {
  const navigate = useNavigate();
  const [selectedPoi, setSelectedPoi] = useState(POIS[0]);
  const [showSheet, setShowSheet] = useState(true);

  return (
    <div className="h-screen w-full relative bg-[#eef5fa] overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20 bg-white/80 backdrop-blur-md pt-safe">
        <div className="h-14 px-4 flex items-center gap-3 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-full h-8 flex items-center px-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              <span className="text-xs text-gray-600">正在记录您的环湖轨迹...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          {/* Mock Lake Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-blue-100 rounded-[100px] rotate-12 opacity-60 border-4 border-blue-200"></div>
          
          {/* POI Markers */}
          {POIS.map((poi) => (
            <button
              key={poi.id}
              onClick={() => {
                setSelectedPoi(poi);
                setShowSheet(true);
              }}
              className={clsx(
                "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform",
                selectedPoi.id === poi.id ? "scale-110 z-10" : "scale-90"
              )}
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
            >
              <div className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium shadow-md mb-1 whitespace-nowrap",
                selectedPoi.id === poi.id ? "bg-primary text-white" : "bg-white text-gray-700"
              )}>
                {poi.name}
              </div>
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg",
                poi.recommended ? "bg-accent" : "bg-primary"
              )}>
                <MapPin className="w-4 h-4" />
              </div>
            </button>
          ))}

          {/* User Location */}
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping absolute" />
            <div className="w-6 h-6 bg-white rounded-full border-4 border-primary shadow-lg flex items-center justify-center relative z-10">
              <Navigation2 className="w-3 h-3 text-primary fill-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Location & Photographers */}
      <div className={clsx(
        "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 z-30 pb-20",
        showSheet ? "translate-y-0" : "translate-y-[85%]"
      )}>
        {/* Handle */}
        <div className="w-full flex justify-center py-3" onClick={() => setShowSheet(!showSheet)}>
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {selectedPoi.name}
                {selectedPoi.recommended && (
                  <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-sm font-medium border border-accent/20">
                    最佳拍摄点
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-1">距离您约 2.4km，预计驱车 5 分钟</p>
            </div>
            <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Navigation2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">附近驻点摄影师 (12)</h3>
              <span className="text-xs text-primary flex items-center">筛选 <ChevronRight className="w-3 h-3" /></span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {PHOTOGRAPHERS.map(p => (
                <Link to={`/photographer/${p.id}`} key={p.id} className="min-w-[240px] bg-white border border-gray-100 rounded-xl p-3 shadow-sm snap-start flex-shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                  <div className="flex gap-3">
                    <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full object-cover border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{p.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-accent font-medium">{p.rating}</span>
                        <span>· 月售 {p.orders}</span>
                      </div>
                      <div className="text-xs font-medium text-red-500 mt-1">
                        ¥{p.price} <span className="text-gray-400 font-normal">起/小时</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full mt-3 bg-primary text-white text-xs py-2 rounded-lg font-medium flex items-center justify-center gap-1">
                    <Camera className="w-3 h-3" /> 立即约拍
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
