export type ArchiveColor = "blue" | "white" | "green" | "purple" | "pink" | "orange";

export type ArchivePhotographer = {
  id: string;
  name: string;
  avatar: string;
};

export type ArchivePhoto = {
  id: string;
  url: string;
  thumbUrl: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  /** 0..1 normalized position on 9:00–21:00 timeline */
  timeRatio: number;
  photographerId: string;
  dominantColor: ArchiveColor;
  /** 全身照（mock 中 ~70% 标为 true） */
  fullBody: boolean;
  price: number;
  resolution: string;
};

export type ArchiveDay = {
  date: string; // YYYY-MM-DD
  year: number;
  month: number;
  day: number;
  weekdayLabel: string; // "今天" / "昨天" / "星期X"
  count: number;
  coverUrl: string;
  photoIds: string[];
  photographerIds: string[];
};

export const ARCHIVE_PHOTOGRAPHERS: ArchivePhotographer[] = [
  {
    id: "ph_shuiguo",
    name: "水果",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "ph_wangshe",
    name: "王摄",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&q=80",
  },
  {
    id: "ph_guli",
    name: "古丽",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: "ph_adili",
    name: "阿迪力",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
  },
  {
    id: "ph_liming",
    name: "李明",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "ph_alina",
    name: "阿丽娜",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: "ph_zhangwei",
    name: "张伟",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "ph_jinghu",
    name: "静湖",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
];

const PHOTOGRAPHER_BY_ID: Record<string, ArchivePhotographer> = Object.fromEntries(
  ARCHIVE_PHOTOGRAPHERS.map((p) => [p.id, p]),
);

/**
 * 单张照片的 mock 输入（缩写形式，方便维护一长串）
 *  [date, time, photographerId, dominantColor, fullBody, url]
 */
type RawRow = [string, string, string, ArchiveColor, boolean, string];

const PHOTO_LIBRARY: Record<ArchiveColor, string[]> = {
  blue: [
    "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?w=900&q=80",
    "https://images.unsplash.com/photo-1746087848758-45581f239fd8?w=900&q=80",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=900&q=80",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=900&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
  ],
  white: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=900&q=80",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=80",
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=900&q=80",
  ],
  green: [
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80",
    "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=900&q=80",
  ],
  purple: [
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80",
    "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=900&q=80",
    "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=900&q=80",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=900&q=80",
  ],
  pink: [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=900&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80",
  ],
  orange: [
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=900&q=80",
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=900&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
    "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=900&q=80",
  ],
};

const COVERS: Record<string, string> = {
  "2026-05-04":
    "https://images.unsplash.com/photo-1746087848758-45581f239fd8?w=600&q=80",
  "2026-05-03":
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80",
  "2026-05-02":
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
  "2026-05-01":
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80",
  "2026-04-30":
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80",
  "2026-04-29":
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80",
  "2026-04-28":
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  "2026-04-26":
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80",
  "2026-04-25":
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=600&q=80",
  "2026-04-24":
    "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=600&q=80",
  "2026-04-23":
    "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=600&q=80",
};

const DAY_LABELS: Record<string, string> = {
  "2026-05-04": "今天",
  "2026-05-03": "昨天",
};

const WEEKDAY_NAMES = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

function weekdayLabel(date: string): string {
  if (DAY_LABELS[date]) return DAY_LABELS[date];
  const d = new Date(date + "T00:00:00");
  return WEEKDAY_NAMES[d.getDay()];
}

const PHOTOGRAPHER_IDS = ARCHIVE_PHOTOGRAPHERS.map((p) => p.id);
const COLORS: ArchiveColor[] = ["blue", "white", "green", "purple", "pink", "orange"];

/** Per-day target counts for variety in the index page (matches the screenshot vibe) */
const DAY_PHOTO_COUNTS: Record<string, number> = {
  "2026-05-04": 28,
  "2026-05-03": 22,
  "2026-05-02": 24,
  "2026-05-01": 18,
  "2026-04-30": 20,
  "2026-04-29": 26,
  "2026-04-28": 23,
  "2026-04-26": 16,
  "2026-04-25": 24,
  "2026-04-24": 20,
  "2026-04-23": 17,
};

const DAY_DISPLAY_COUNTS: Record<string, number> = {
  "2026-05-04": 2741,
  "2026-05-03": 1395,
  "2026-05-02": 2221,
  "2026-05-01": 1280,
  "2026-04-30": 1533,
  "2026-04-29": 3451,
  "2026-04-28": 3059,
  "2026-04-26": 1025,
  "2026-04-25": 3213,
  "2026-04-24": 2442,
  "2026-04-23": 1840,
};

function buildPhotosForDay(date: string): ArchivePhoto[] {
  const target = DAY_PHOTO_COUNTS[date] ?? 12;
  const out: ArchivePhoto[] = [];
  // pseudo-random based on date to keep outputs stable
  const seed = date.split("-").reduce((acc, n) => acc * 31 + Number(n), 7);
  const rand = (n: number, salt = 0) =>
    ((Math.sin(seed * 12.9898 + n * 78.233 + salt * 5.1) + 1) / 2);

  for (let i = 0; i < target; i++) {
    const color = COLORS[Math.floor(rand(i, 1) * COLORS.length) % COLORS.length];
    const pool = PHOTO_LIBRARY[color];
    const url = pool[Math.floor(rand(i, 2) * pool.length) % pool.length];
    const photographerId =
      PHOTOGRAPHER_IDS[Math.floor(rand(i, 3) * PHOTOGRAPHER_IDS.length) % PHOTOGRAPHER_IDS.length];

    // 9:00 to 21:00 -> 12 hours -> spread photos roughly chronologically
    const ratio = (i + rand(i, 4) * 0.8) / target;
    const totalMinutes = Math.floor(9 * 60 + ratio * 12 * 60);
    const hh = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
    const mm = (totalMinutes % 60).toString().padStart(2, "0");

    out.push({
      id: `p_${date.replace(/-/g, "")}_${i.toString().padStart(3, "0")}`,
      url,
      thumbUrl: url.replace("w=900", "w=240"),
      date,
      time: `${hh}:${mm}`,
      timeRatio: ratio,
      photographerId,
      dominantColor: color,
      fullBody: rand(i, 5) > 0.3,
      price: 22.99,
      resolution: "1080P高清",
    });
  }
  return out;
}

const ALL_PHOTOS: ArchivePhoto[] = [];
const PHOTOS_BY_DATE: Record<string, ArchivePhoto[]> = {};

for (const date of Object.keys(DAY_PHOTO_COUNTS)) {
  const list = buildPhotosForDay(date);
  PHOTOS_BY_DATE[date] = list;
  ALL_PHOTOS.push(...list);
}

const PHOTO_BY_ID: Record<string, ArchivePhoto> = Object.fromEntries(
  ALL_PHOTOS.map((p) => [p.id, p]),
);

export const ARCHIVE_DAYS: ArchiveDay[] = Object.keys(DAY_PHOTO_COUNTS).map((date) => {
  const [y, m, d] = date.split("-").map(Number);
  const photos = PHOTOS_BY_DATE[date];
  const photographerIds = Array.from(new Set(photos.map((p) => p.photographerId)));
  return {
    date,
    year: y,
    month: m,
    day: d,
    weekdayLabel: weekdayLabel(date),
    count: DAY_DISPLAY_COUNTS[date] ?? photos.length,
    coverUrl: COVERS[date] ?? photos[0]?.url ?? "",
    photoIds: photos.map((p) => p.id),
    photographerIds,
  };
});

export type ArchiveYearGroup = {
  year: number;
  months: { month: number; days: ArchiveDay[] }[];
};

export function groupArchive(): ArchiveYearGroup[] {
  const map = new Map<number, Map<number, ArchiveDay[]>>();
  for (const day of ARCHIVE_DAYS) {
    if (!map.has(day.year)) map.set(day.year, new Map());
    const monthsMap = map.get(day.year)!;
    if (!monthsMap.has(day.month)) monthsMap.set(day.month, []);
    monthsMap.get(day.month)!.push(day);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, monthsMap]) => ({
      year,
      months: [...monthsMap.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([month, days]) => ({
          month,
          days: days.sort((a, b) => b.day - a.day),
        })),
    }));
}

export function getDay(date: string): ArchiveDay | undefined {
  return ARCHIVE_DAYS.find((d) => d.date === date);
}

export function getPhotosByDate(date: string): ArchivePhoto[] {
  return PHOTOS_BY_DATE[date] ?? [];
}

export function getPhoto(photoId: string): ArchivePhoto | undefined {
  return PHOTO_BY_ID[photoId];
}

export function getPhotographer(photographerId: string): ArchivePhotographer | undefined {
  return PHOTOGRAPHER_BY_ID[photographerId];
}

export function getPhotographersForDay(date: string): ArchivePhotographer[] {
  const day = getDay(date);
  if (!day) return [];
  return day.photographerIds
    .map((id) => PHOTOGRAPHER_BY_ID[id])
    .filter((x): x is ArchivePhotographer => Boolean(x));
}

/** Photos taken by the same photographer near the given photo's time, used as "相关作品" strip. */
export function getRelatedPhotos(photoId: string, limit = 12): ArchivePhoto[] {
  const photo = getPhoto(photoId);
  if (!photo) return [];
  const sameDay = getPhotosByDate(photo.date)
    .filter((p) => p.id !== photo.id && p.photographerId === photo.photographerId)
    .sort((a, b) => Math.abs(a.timeRatio - photo.timeRatio) - Math.abs(b.timeRatio - photo.timeRatio));
  return sameDay.slice(0, limit);
}

export const COLOR_OPTIONS: { id: ArchiveColor; label: string; swatch: string }[] = [
  { id: "blue", label: "蓝色", swatch: "#4C8BF5" },
  { id: "white", label: "白色", swatch: "#F5F5F5" },
  { id: "green", label: "绿色", swatch: "#3FB984" },
  { id: "purple", label: "紫色", swatch: "#8A6CE6" },
  { id: "pink", label: "粉色", swatch: "#F49EC0" },
  { id: "orange", label: "橙色", swatch: "#F08C4A" },
];
