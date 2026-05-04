import { ChevronLeft, List } from "lucide-react";
import { useNavigate } from "react-router";
import { groupArchive } from "../data/galleryArchiveMock";

export function Gallery() {
  const navigate = useNavigate();
  const yearGroups = groupArchive();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-700"
            aria-label="返回"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">赛里木湖·光影档案</h1>
        </div>
        <button type="button" className="text-gray-700" aria-label="切换视图">
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Tab strip — 仅保留"照片" */}
      <div className="bg-white px-5 pt-3 pb-2 flex items-center gap-6 border-b border-gray-100">
        <div className="flex flex-col items-start">
          <span className="text-base font-semibold text-gray-900">照片</span>
          <span className="mt-1 h-[3px] w-6 rounded-full bg-gray-900" />
        </div>
      </div>

      {/* Retention notice */}
      <div className="mx-4 mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[11px] leading-relaxed text-rose-500">
        <span className="text-rose-400">*</span>
        <span className="ml-1">照片180天后永久删除；收藏后，1年后下架</span>
      </div>

      {/* Year / Month sections */}
      <div className="px-4 mt-5 space-y-7">
        {yearGroups.map((yg) => (
          <section key={yg.year}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{yg.year}年</h2>
            <div className="space-y-5">
              {yg.months.map((mg) => (
                <div key={`${yg.year}-${mg.month}`}>
                  <h3 className="text-sm font-bold text-gray-700 mb-2">{mg.month}月</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {mg.days.map((day) => {
                      const isToday = day.weekdayLabel === "今天";
                      const isYesterday = day.weekdayLabel === "昨天";
                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => navigate(`/gallery/day/${day.date}`)}
                          className="relative aspect-square overflow-hidden rounded-2xl bg-gray-200 text-left shadow-sm focus:outline-none"
                        >
                          <img
                            src={day.coverUrl}
                            alt={`${mg.month}月${day.day}日 赛里木湖`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/25 to-black/45" />
                          <div className="absolute inset-0 flex flex-col p-3 text-white">
                            <div className="text-[11px] font-medium opacity-90">
                              {mg.month}月
                            </div>
                            <div className="mt-1 text-[34px] font-extrabold leading-none tracking-tight drop-shadow">
                              {day.day.toString().padStart(2, "0")}
                            </div>
                            <div className="mt-1 text-[11px] font-medium">
                              {isToday || isYesterday ? day.weekdayLabel : day.weekdayLabel}
                            </div>
                            <div className="mt-auto text-[11px] font-medium opacity-90">
                              {day.count.toLocaleString()}张
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
