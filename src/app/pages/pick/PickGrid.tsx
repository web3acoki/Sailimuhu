import { ChevronLeft, Check, Filter, Images } from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useMemo, useState } from "react";
import { loadPickDraft, togglePickPhoto } from "../../pick/pickStore";

type GridFilter = "all" | "selected";

export function PickGrid() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">缺少订单号</div>
      </div>
    );
  }

  const filter = (searchParams.get("filter") as GridFilter) || "all";
  const draft = loadPickDraft(orderId);
  const selected = useMemo(() => new Set(draft.selectedPhotoIds), [draft.selectedPhotoIds]);

  const photos = useMemo(() => {
    if (filter === "selected") return draft.photos.filter((p) => selected.has(p.id));
    return draft.photos;
  }, [draft.photos, filter, selected]);

  const selectedCount = draft.selectedPhotoIds.length;
  const quota = draft.quota;

  const handleToggle = (photoId: string) => {
    setError(null);
    const res = togglePickPhoto(orderId, photoId);
    if (!res.ok) {
      setError(`已达到上限：最多可选 ${quota} 张`);
    } else {
      // force rerender by updating query param noop (since store is sessionStorage-based)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      0;
    }
  };

  const setFilter = (next: GridFilter) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("filter", next);
    setSearchParams(nextParams);
  };

  const canSubmit = selectedCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 py-4 flex items-center justify-between gap-3 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <div className="text-sm font-bold text-gray-900">选片网格</div>
            <div className="text-xs text-gray-500 mt-0.5">
              已选 <span className="text-primary font-bold">{selectedCount}</span>/{quota}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter(filter === "all" ? "selected" : "all")}
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            <Filter className="w-4 h-4" />
            {filter === "selected" ? "已选" : "全部"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="px-5 mt-3">
          <div className="rounded-2xl bg-orange-50 border border-orange-200 p-3 text-xs text-orange-800">
            {error}
          </div>
        </div>
      ) : null}

      <div className="px-5 mt-4 grid grid-cols-3 gap-2">
        {photos.map((p) => {
          const isSelected = selected.has(p.id);
          return (
            <div key={p.id} className="relative">
              <Link to={`/order/${orderId}/pick/photo/${p.id}`} className="block">
                <img
                  src={p.url}
                  alt={`照片 ${p.id}`}
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <button
                type="button"
                onClick={() => handleToggle(p.id)}
                className={`absolute right-2 top-2 w-7 h-7 rounded-full flex items-center justify-center ring-1 ${
                  isSelected
                    ? "bg-primary text-white ring-primary/40"
                    : "bg-black/30 text-white ring-white/30 hover:bg-black/40"
                }`}
                aria-label={isSelected ? "取消选择" : "选择"}
              >
                <Check className={`w-4 h-4 ${isSelected ? "opacity-100" : "opacity-70"}`} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500">已选</div>
            <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Images className="w-4 h-4 text-violet-700" />
              {selectedCount}/{quota}
            </div>
          </div>

          <Link
            to={`/order/${orderId}/pick/confirm`}
            aria-disabled={!canSubmit}
            className={`flex-1 text-center py-3 rounded-full text-sm font-medium ${
              canSubmit ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-100 text-gray-400 pointer-events-none"
            }`}
          >
            确认提交
          </Link>
        </div>
      </div>
    </div>
  );
}

