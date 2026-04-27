import { ChevronLeft, Trash2, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { loadPickDraft, removePickedPhotos, submitPick } from "../../pick/pickStore";
import { useMemo, useState } from "react";

export function PickConfirm() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [submitting, setSubmitting] = useState(false);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">缺少订单号</div>
      </div>
    );
  }

  const draft = loadPickDraft(orderId);
  const selectedPhotos = useMemo(() => {
    const selected = new Set(draft.selectedPhotoIds);
    return draft.photos.filter((p) => selected.has(p.id));
  }, [draft.photos, draft.selectedPhotoIds]);

  const selectedCount = draft.selectedPhotoIds.length;
  const quota = draft.quota;

  const handleRemove = (photoId: string) => {
    removePickedPhotos(orderId, [photoId]);
    // rerender by navigating to same page (cheap) or rely on React refresh; here we just force a replace
    navigate(`/order/${orderId}/pick/confirm`, { replace: true });
  };

  const canSubmit = selectedCount > 0 && !draft.submittedAt;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    submitPick(orderId);
    window.alert("提交成功：摄影师将开始后期制作。");
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">确认提交</h1>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-gray-900">已选照片</div>
            <div className="text-xs text-gray-500">
              {selectedCount}/{quota}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {selectedPhotos.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-sm text-gray-500">还未选择照片</div>
            ) : (
              selectedPhotos.map((p) => (
                <div key={p.id} className="relative">
                  <img
                    src={p.url}
                    alt={`已选 ${p.id}`}
                    className="w-full aspect-[3/4] object-cover rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {!draft.submittedAt ? (
                    <button
                      type="button"
                      onClick={() => handleRemove(p.id)}
                      className="absolute right-2 top-2 w-7 h-7 rounded-full bg-black/35 text-white ring-1 ring-white/20 flex items-center justify-center hover:bg-black/45"
                      aria-label="移除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-amber-900">提交后不可修改</div>
              <div className="text-xs text-amber-800 mt-1 leading-relaxed">
                提交选片后将进入后期制作流程，如需调整请联系摄影师协商。
              </div>
            </div>
          </div>
        </div>

        {draft.submittedAt ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            你已提交选片，无法再次提交。
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`/order/${orderId}/pick/grid`)}
            className="flex-1 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            返回继续选
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className={`flex-1 py-3 text-sm font-medium rounded-full text-center ${
              canSubmit && !submitting
                ? "text-white bg-primary hover:bg-primary/90"
                : "text-gray-400 bg-gray-100"
            }`}
          >
            {submitting ? "提交中..." : "提交选片"}
          </button>
        </div>
      </div>
    </div>
  );
}

