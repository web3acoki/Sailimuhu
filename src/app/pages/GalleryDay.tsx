import { ChevronLeft, Minus, Plus, Search, Share2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ARCHIVE_DAYS,
  COLOR_OPTIONS,
  getDay,
  getPhotosByDate,
  getPhotographer,
  getPhotographersForDay,
  type ArchiveColor,
} from "../data/galleryArchiveMock";

const TIME_TICKS = [9, 12, 15, 18, 21];

function formatHHMM(ratio: number): string {
  const totalMinutes = Math.floor(9 * 60 + ratio * 12 * 60);
  const hh = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
  const mm = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function shiftDate(current: string, delta: number): string | null {
  const idx = ARCHIVE_DAYS.findIndex((d) => d.date === current);
  if (idx < 0) return null;
  // ARCHIVE_DAYS is naturally newest-first per data; "+" goes to newer (-1), "-" goes to older (+1)
  const next = ARCHIVE_DAYS[idx + delta];
  return next ? next.date : null;
}

export function GalleryDay() {
  const { date } = useParams();
  const navigate = useNavigate();
  const day = date ? getDay(date) : undefined;

  const [timeRatio, setTimeRatio] = useState(0.13); // 默认 ~10:39
  const [activeColors, setActiveColors] = useState<Set<ArchiveColor>>(new Set());
  const trackRef = useRef<HTMLDivElement | null>(null);

  const photos = useMemo(() => (date ? getPhotosByDate(date) : []), [date]);
  const photographers = useMemo(
    () => (date ? getPhotographersForDay(date) : []),
    [date],
  );

  const currentTime = formatHHMM(timeRatio);

  // 时间窗 ±1.5 小时（在 12 小时尺度上 = 0.125）
  const TIME_WINDOW = 0.125;

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      if (Math.abs(p.timeRatio - timeRatio) > TIME_WINDOW) return false;
      if (activeColors.size > 0 && !activeColors.has(p.dominantColor)) return false;
      return true;
    });
  }, [photos, timeRatio, activeColors]);

  if (!day || !date) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">未找到该日期的照片归档</div>
      </div>
    );
  }

  const updateRatioFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setTimeRatio(ratio);
  };

  const toggleColor = (id: ArchiveColor) => {
    setActiveColors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onShiftDate = (delta: number) => {
    const target = shiftDate(date, delta);
    if (target) navigate(`/gallery/day/${target}`);
  };

  const monthLabel = `${day.month.toString().padStart(2, "0")}月${day.day
    .toString()
    .padStart(2, "0")}日`;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between gap-3 shadow-sm sticky top-0 z-10">
        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="text-gray-700 -ml-1"
          aria-label="返回"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex flex-1 items-center gap-2 min-w-0">
          <div className="flex items-center rounded-full bg-gray-100 px-1 py-1">
            <button
              type="button"
              onClick={() => onShiftDate(1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              aria-label="前一天"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-xs font-semibold text-gray-800 whitespace-nowrap">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={() => onShiftDate(-1)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200"
              aria-label="后一天"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-bold text-gray-900 truncate">
            赛里木湖·光影档案
          </span>
        </div>

        <button type="button" className="text-gray-700" aria-label="分享">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* Filters: only 时间 + 颜色 */}
      <div className="bg-white px-4 pb-4 pt-3 shadow-sm">
        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            type="button"
            className="relative pb-1 text-gray-900"
            aria-pressed="true"
          >
            时间
            <span className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[3px] w-5 rounded-full bg-gray-900" />
          </button>
          <button
            type="button"
            className="pb-1 text-gray-400"
          >
            颜色
          </button>
        </div>

        {/* Time slider */}
        <div className="mt-4 rounded-2xl bg-white">
          <div className="relative px-2 pb-7 pt-7">
            <div
              ref={trackRef}
              className="relative h-1.5 rounded-full bg-gray-100"
              onMouseDown={(e) => {
                updateRatioFromClientX(e.clientX);
                const onMove = (ev: MouseEvent) => updateRatioFromClientX(ev.clientX);
                const onUp = () => {
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };
                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
              onTouchStart={(e) => {
                if (e.touches[0]) updateRatioFromClientX(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) updateRatioFromClientX(e.touches[0].clientX);
              }}
            >
              {/* density bars (随机柱状) */}
              <div className="pointer-events-none absolute -top-3 left-0 right-0 flex h-3 items-end gap-[3px]">
                {Array.from({ length: 36 }).map((_, i) => {
                  const v = (Math.sin(i * 1.7) + 1) / 2;
                  const h = 3 + Math.round(v * 9);
                  return (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-gray-200"
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>

              {/* knob */}
              <div
                className="absolute -top-1.5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gray-300 bg-white shadow"
                style={{ left: `${timeRatio * 100}%` }}
              />

              {/* tooltip */}
              <div
                className="pointer-events-none absolute -top-12 -translate-x-1/2 rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white"
                style={{ left: `${timeRatio * 100}%` }}
              >
                {currentTime}
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </div>

            <div className="mt-3 flex justify-between text-[11px] text-gray-400">
              {TIME_TICKS.map((h) => (
                <span key={h}>{h}:00</span>
              ))}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-gray-400 mr-1">颜色：</span>
          {COLOR_OPTIONS.map((opt) => {
            const active = activeColors.has(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleColor(opt.id)}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? "border-gray-900" : "border-transparent"
                }`}
                aria-label={opt.label}
                aria-pressed={active}
              >
                <span
                  className="h-5 w-5 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: opt.swatch }}
                />
              </button>
            );
          })}
          {activeColors.size > 0 ? (
            <button
              type="button"
              onClick={() => setActiveColors(new Set())}
              className="ml-auto text-[11px] text-gray-500 hover:text-gray-700"
            >
              清除
            </button>
          ) : null}
        </div>
      </div>

      {/* On-site photographers */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-semibold text-gray-900">在场摄影师</h3>
        <div className="mt-3 flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {photographers.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-1.5 shrink-0">
              <img
                src={p.avatar}
                alt={p.name}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
              />
              <span className="text-[11px] text-gray-600">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="px-2 mt-4">
        {filteredPhotos.length === 0 ? (
          <div className="px-3 py-10 text-center text-sm text-gray-400">
            该时间段暂无照片
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1">
            {filteredPhotos.map((p) => {
              const ph = getPhotographer(p.photographerId);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/gallery/photo/${p.id}`)}
                  className="relative aspect-square overflow-hidden rounded-md bg-gray-200"
                >
                  <img
                    src={p.url}
                    alt={ph?.name ?? "赛里木湖照片"}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-white">
                    <Search className="h-2.5 w-2.5" />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom shop CTA — 仿截图右下小气泡 */}
      <button
        type="button"
        onClick={() => {
          if (filteredPhotos[0]) navigate(`/gallery/photo/${filteredPhotos[0].id}`);
        }}
        className="fixed bottom-20 right-4 z-30 rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-lg max-w-md mx-auto"
      >
        <span className="inline-flex items-center gap-1">
          <span aria-hidden>🛍</span> 去购买
        </span>
      </button>
    </div>
  );
}
