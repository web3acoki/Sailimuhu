import { ChevronLeft, MoreHorizontal, ShoppingBag, Star, ZoomIn } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import {
  getPhoto,
  getPhotographer,
  getRelatedPhotos,
} from "../data/galleryArchiveMock";

export function GalleryPhotoDetail() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const photo = photoId ? getPhoto(photoId) : undefined;

  if (!photo) {
    return (
      <div className="min-h-screen bg-black p-6 text-white">
        <div className="text-sm">未找到照片</div>
      </div>
    );
  }

  const photographer = getPhotographer(photo.photographerId);
  const related = getRelatedPhotos(photo.id, 12);

  const monthLabel = `${photo.date.slice(5, 7)}月${photo.date.slice(8, 10)}日`;

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white -ml-1"
          aria-label="返回"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>{monthLabel}</span>
          <span className="opacity-60">|</span>
          <span>赛里木湖·光影档案</span>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="购物袋">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button type="button" aria-label="更多">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Photographer card */}
      <div className="flex items-center gap-3 px-4 mt-2">
        {photographer ? (
          <>
            <img
              src={photographer.avatar}
              alt={photographer.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="text-sm font-medium">{photographer.name}</div>
              <div className="text-[11px] text-white/60">
                {photo.date} {photo.time}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Photo viewport */}
      <div className="relative flex-1 mt-3 mb-3">
        <img
          src={photo.url}
          alt="赛里木湖抓拍"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <button
          type="button"
          aria-label="放大查看"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/15"
        >
          <ZoomIn className="h-5 w-5" />
        </button>

        {photo.fullBody ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white ring-1 ring-white/20 backdrop-blur-md">
            <ZoomIn className="h-3 w-3" />
            全身照
          </span>
        ) : null}

        <button
          type="button"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/20"
        >
          <ZoomIn className="h-3 w-3" />
          相关作品
        </button>
      </div>

      {/* Related thumbnails */}
      {related.length > 0 ? (
        <div className="px-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
            {[photo, ...related].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate(`/gallery/photo/${p.id}`)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-md ${
                  p.id === photo.id ? "ring-2 ring-white" : ""
                }`}
              >
                <img
                  src={p.thumbUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Bottom CTA bar */}
      <div className="mt-3 flex items-center justify-between gap-3 bg-black px-4 py-4">
        <button
          type="button"
          aria-label="收藏"
          className="flex h-10 w-10 items-center justify-center text-white"
        >
          <Star className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-baseline justify-end gap-2">
          <span className="text-base font-bold text-rose-500">
            ¥{photo.price.toFixed(2)}
          </span>
          <span className="text-xs text-white/60">起</span>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/gallery/order/${photo.id}`)}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900"
        >
          买这张
        </button>
      </div>
    </div>
  );
}
