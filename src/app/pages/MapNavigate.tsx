import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Headphones,
  MapPin,
  MessageCircleMore,
  Navigation2,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { clsx } from "clsx";
import { PHOTOGRAPHERS } from "../data/photographersMock";

const POIS = [
  { id: 1, name: "克勒涌珠", x: 60, y: 30, recommended: true },
  { id: 2, name: "松树头", x: 30, y: 70, recommended: false },
  { id: 3, name: "点将台", x: 80, y: 60, recommended: false },
];

export function MapNavigate() {
  const navigate = useNavigate();
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedPoi, setSelectedPoi] = useState(POIS[0]);
  const [showSheet, setShowSheet] = useState(true);

  return (
    <div
      className={clsx(
        "h-screen w-full relative overflow-hidden",
        view === "map" ? "bg-[#eef5fa]" : "bg-gray-50",
      )}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20 bg-white/90 backdrop-blur-md pt-safe">
        <div className="h-14 px-4 flex items-center gap-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => {
              if (view === "map") setView("list");
              else navigate(-1);
            }}
            className="p-2 -ml-2 text-gray-700"
            aria-label="返回"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1">
            {view === "map" ? (
              <div className="bg-gray-100 rounded-full h-8 flex items-center px-4">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                <span className="text-xs text-gray-600">
                  正在记录您的环湖轨迹...
                </span>
              </div>
            ) : (
              <h1 className="text-base font-bold text-gray-900">
                赛里木湖·优秀摄影师
              </h1>
            )}
          </div>

          {view === "list" ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-9 h-9 rounded-full text-gray-600 hover:text-gray-900 flex items-center justify-center"
                aria-label="客服"
              >
                <Headphones className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full text-gray-600 hover:text-gray-900 flex items-center justify-center"
                aria-label="消息"
              >
                <MessageCircleMore className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/15"
                aria-label="切换到地图导航"
              >
                <Navigation2 className="w-5 h-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {view === "list" ? <ListView /> : null}
      {view === "map" ? (
        <MapView
          selectedPoi={selectedPoi}
          setSelectedPoi={(poi) => {
            setSelectedPoi(poi);
            setShowSheet(true);
          }}
          showSheet={showSheet}
          setShowSheet={setShowSheet}
        />
      ) : null}
    </div>
  );
}

function ListView() {
  return (
    <div className="absolute inset-0 pt-14 overflow-y-auto pb-20 scrollbar-hide">
      <div className="px-4 pt-3">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-base font-bold text-gray-900">赛湖优秀摄影师</h2>
          <span className="text-[11px] text-gray-400">
            已认证 {PHOTOGRAPHERS.length} 位
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mb-3 inline-flex items-center gap-1">
          点击右上角
          <Navigation2 className="inline-block h-3 w-3 text-primary" />
          查看附近摄影师机位
        </p>
      </div>

      <div className="px-4 pb-4 space-y-3">
        {PHOTOGRAPHERS.map((p) => (
          <div
            key={p.id}
            className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-accent" />
            <Link to={`/photographer/${p.id}`} className="block">
              <div className="flex gap-3">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="h-14 w-14 rounded-full border border-gray-100 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-bold text-gray-900">
                    {p.name}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="font-medium text-accent">{p.rating}</span>
                    <span>· 月售 {p.orders}</span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-red-500">
                    ¥{p.price}{" "}
                    <span className="font-normal text-gray-400">起/小时</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.specialty.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-50 px-2 py-1 text-[10px] text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>

            <Link
              to={`/photographer/${p.id}/book`}
              className="relative z-10 mt-3 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-primary py-2 text-xs font-medium text-white"
            >
              <Camera className="h-3 w-3" /> 立即约拍
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

type MapViewProps = {
  selectedPoi: (typeof POIS)[number];
  setSelectedPoi: (poi: (typeof POIS)[number]) => void;
  showSheet: boolean;
  setShowSheet: (next: boolean) => void;
};

function MapView({
  selectedPoi,
  setSelectedPoi,
  showSheet,
  setShowSheet,
}: MapViewProps) {
  return (
    <>
      {/* Simulated Map Area */}
      <div className="absolute inset-0 z-0 pt-14">
        <div className="w-full h-full relative">
          {/* Mock Lake Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-blue-100 rounded-[100px] rotate-12 opacity-60 border-4 border-blue-200" />

          {/* POI Markers */}
          {POIS.map((poi) => (
            <button
              key={poi.id}
              type="button"
              onClick={() => setSelectedPoi(poi)}
              className={clsx(
                "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform",
                selectedPoi.id === poi.id ? "scale-110 z-10" : "scale-90",
              )}
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
            >
              <div
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium shadow-md mb-1 whitespace-nowrap",
                  selectedPoi.id === poi.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700",
                )}
              >
                {poi.name}
              </div>
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg",
                  poi.recommended ? "bg-accent" : "bg-primary",
                )}
              >
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

      {/* Bottom Sheet */}
      <div
        className={clsx(
          "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 z-30 pb-20",
          showSheet ? "translate-y-0" : "translate-y-[85%]",
        )}
      >
        <button
          type="button"
          className="w-full flex justify-center py-3"
          onClick={() => setShowSheet(!showSheet)}
          aria-label="切换底栏"
        >
          <span className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </button>

        <div className="px-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {selectedPoi.name}
                {selectedPoi.recommended ? (
                  <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-sm font-medium border border-accent/20">
                    最佳拍摄点
                  </span>
                ) : null}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                距离您约 2.4km，预计驱车 5 分钟
              </p>
            </div>
            <button
              type="button"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary"
              aria-label="导航至此"
            >
              <Navigation2 className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">
                附近驻点摄影师 ({PHOTOGRAPHERS.length})
              </h3>
              <span className="text-xs text-primary flex items-center">
                筛选 <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {PHOTOGRAPHERS.map((p) => (
                <div
                  key={p.id}
                  className="relative min-w-[240px] flex-shrink-0 snap-start overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                  <Link to={`/photographer/${p.id}`} className="block">
                    <div className="flex gap-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="h-14 w-14 rounded-full border border-gray-100 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-bold text-gray-900">
                          {p.name}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <span className="font-medium text-accent">
                            {p.rating}
                          </span>
                          <span>· 月售 {p.orders}</span>
                        </div>
                        <div className="mt-1 text-xs font-medium text-red-500">
                          ¥{p.price}{" "}
                          <span className="font-normal text-gray-400">
                            起/小时
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {p.specialty.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-gray-50 px-2 py-1 text-[10px] text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <Link
                    to={`/photographer/${p.id}/book`}
                    className="relative z-10 mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-primary py-2 text-center text-xs font-medium text-white"
                  >
                    <Camera className="h-3 w-3" /> 立即约拍
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
