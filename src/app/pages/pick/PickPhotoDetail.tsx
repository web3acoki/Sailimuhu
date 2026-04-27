import { ChevronLeft, Check, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useMemo, useState } from "react";
import { loadPickDraft, togglePickPhoto } from "../../pick/pickStore";

export function PickPhotoDetail() {
  const navigate = useNavigate();
  const { orderId, photoId } = useParams();
  const [error, setError] = useState<string | null>(null);

  if (!orderId || !photoId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">缺少参数</div>
      </div>
    );
  }

  const draft = loadPickDraft(orderId);
  const selected = useMemo(() => new Set(draft.selectedPhotoIds), [draft.selectedPhotoIds]);
  const idx = draft.photos.findIndex((p) => p.id === photoId);
  const photo = idx >= 0 ? draft.photos[idx] : null;
  const quota = draft.quota;
  const selectedCount = draft.selectedPhotoIds.length;

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">未找到照片</div>
      </div>
    );
  }

  const isSelected = selected.has(photo.id);
  const prev = idx > 0 ? draft.photos[idx - 1] : null;
  const next = idx < draft.photos.length - 1 ? draft.photos[idx + 1] : null;

  const handleToggle = () => {
    setError(null);
    const res = togglePickPhoto(orderId, photo.id);
    if (!res.ok) setError(`已达到上限：最多可选 ${quota} 张`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20"
          aria-label="返回"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-white text-xs">
          已选 <span className="font-bold">{selectedCount}</span>/<span className="font-bold">{quota}</span>
        </div>

        <button
          onClick={handleToggle}
          className={`inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium ring-1 backdrop-blur-md ${
            isSelected
              ? "bg-primary text-white ring-primary/40"
              : "bg-white/10 text-white ring-white/20 hover:bg-white/15"
          }`}
          aria-label={isSelected ? "取消选择" : "选择此张"}
        >
          <Check className="w-4 h-4" />
          {isSelected ? "已选" : "选中"}
        </button>
      </div>

      <img
        src={photo.url}
        alt={`照片 ${photo.id}`}
        className="w-full h-screen object-contain"
        decoding="async"
      />

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
        {error ? (
          <div className="mb-3 rounded-2xl bg-orange-500/15 border border-orange-400/30 px-4 py-3 text-xs text-orange-100">
            {error}
          </div>
        ) : null}

        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <Link
            to={`/order/${orderId}/pick/grid`}
            className="flex-1 text-center py-3 rounded-full bg-white/10 text-white text-sm font-medium ring-1 ring-white/20 backdrop-blur-md hover:bg-white/15"
          >
            返回网格
          </Link>
          <Link
            to={`/order/${orderId}/pick/confirm`}
            className="flex-1 text-center py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90"
          >
            去提交
          </Link>
        </div>

        <div className="mt-4 max-w-md mx-auto flex items-center justify-between text-white/80 text-xs">
          <div className="flex items-center gap-2">
            {prev ? (
              <Link
                to={`/order/${orderId}/pick/photo/${prev.id}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
              >
                <ChevronLeft className="w-4 h-4" />
                上一张
              </Link>
            ) : (
              <div className="px-3 py-2 rounded-full bg-white/5 ring-1 ring-white/10 opacity-50">
                上一张
              </div>
            )}
          </div>

          <div className="text-white/70">
            {photo.album ? `${photo.album} · ` : null}#{photo.id}
          </div>

          <div className="flex items-center gap-2">
            {next ? (
              <Link
                to={`/order/${orderId}/pick/photo/${next.id}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
              >
                下一张
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="px-3 py-2 rounded-full bg-white/5 ring-1 ring-white/10 opacity-50">
                下一张
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

