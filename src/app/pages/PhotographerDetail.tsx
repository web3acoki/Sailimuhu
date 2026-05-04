import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Heart,
  MapPin,
  Share2,
  Star,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { clsx } from "clsx";
import {
  type PhotographerWork,
  getPhotographer,
} from "../data/photographersMock";

export function PhotographerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const photographer = getPhotographer(id);
  const [tab, setTab] = useState<"works" | "notes">("works");

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="relative z-0 isolate h-56 overflow-hidden">
        <img
          src={photographer.cover}
          alt={photographer.name}
          className="pointer-events-none h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-black/45 to-transparent"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
          aria-label="分享"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="relative z-10 -mt-16 rounded-t-2xl bg-gray-50 px-5 pb-1 pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-end gap-3">
          <img
            src={photographer.avatar}
            alt={photographer.name}
            className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-sm"
          />
          <div className="min-w-0 flex-1 pb-1">
            <h1 className="flex items-center gap-1.5 text-lg font-bold text-gray-900">
              <span className="truncate">{photographer.name}</span>
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
            </h1>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{photographer.region}</span>
              <span className="text-gray-300">·</span>
              <span>抓拍 · 约拍摄影师</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/photographer/${photographer.id}/book`)}
            className="flex h-9 items-center gap-1.5 rounded-full bg-gray-900 px-4 text-sm text-white shadow-sm"
          >
            <Camera className="h-4 w-4" /> 约我拍摄
          </button>
        </div>

        <p className="mt-3 line-clamp-2 text-xs text-gray-600">
          {photographer.intro}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {photographer.specialty.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-5">
          <Stat value={photographer.rating.toFixed(1)} label="评分" />
          <Stat value={formatCount(photographer.orders)} label="月售" />
        </div>
      </div>

      <div className="mt-5 border-b border-gray-200 px-5">
        <div className="flex gap-6 text-sm">
          <TabBtn active={tab === "works"} onClick={() => setTab("works")}>
            作品 · 拍摄
          </TabBtn>
          <TabBtn active={tab === "notes"} onClick={() => setTab("notes")}>
            动态 · 笔记
          </TabBtn>
        </div>
      </div>

      {tab === "works" ? (
        <WorksGrid works={photographer.works} />
      ) : (
        <EmptyNotes />
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="leading-tight">
      <div className="text-base font-bold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-500">{label}</div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative pb-3 pt-2 transition-colors",
        active ? "font-bold text-gray-900" : "text-gray-500",
      )}
    >
      {children}
      {active ? (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
      ) : null}
    </button>
  );
}

function WorksGrid({ works }: { works: PhotographerWork[] }) {
  return (
    <div className="px-5 pt-4">
      <div className="columns-2 gap-3 [column-fill:_balance]">
        {works.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
      </div>
    </div>
  );
}

function WorkCard({ work }: { work: PhotographerWork }) {
  return (
    <Link
      to={`/post/${work.id}`}
      className="mb-3 block break-inside-avoid overflow-hidden rounded-xl bg-white shadow-sm"
    >
      <div className="relative">
        <img
          src={work.cover}
          alt={work.title}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
        {work.pinned ? (
          <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-accent shadow-sm">
            精选
          </span>
        ) : null}
      </div>
      <div className="p-2.5">
        <h4 className="line-clamp-2 text-xs font-medium leading-tight text-gray-900">
          {work.title}
        </h4>
        {work.topics.length ? (
          <div className="mt-1 flex flex-wrap gap-x-1 gap-y-0.5">
            {work.topics.map((t) => (
              <span key={t} className="text-[10px] text-primary">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-0.5 truncate">
            <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
            <span className="truncate">{work.location}</span>
          </span>
          <span className="flex flex-shrink-0 items-center gap-0.5">
            <Heart className="h-2.5 w-2.5" />
            {formatCount(work.likes)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyNotes() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Star className="h-6 w-6" />
      </div>
      <p className="text-sm text-gray-500">暂无笔记</p>
      <p className="mt-1 text-xs text-gray-400">
        摄影师还没有发布动态，先去看看作品吧～
      </p>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1).replace(/\.0$/, "")}w`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}
