import { ChevronLeft, ArrowRight, Images } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { loadPickDraft } from "../../pick/pickStore";

const TIER_LABEL: Record<string, string> = {
  basic: "基础档",
  pro: "进阶档",
  premium: "尊享档",
};

export function OrderPickHub() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">缺少订单号</div>
      </div>
    );
  }

  const draft = loadPickDraft(orderId);
  const selectedCount = draft.selectedPhotoIds.length;

  const progress = draft.quota > 0 ? Math.min(100, Math.round((selectedCount / draft.quota) * 100)) : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">选片</h1>
      </div>

      <div className="px-5 mt-4 space-y-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">套餐档位</div>
              <div className="mt-1 text-base font-bold text-gray-900">{TIER_LABEL[draft.packageTier]}</div>
              <div className="mt-2 text-sm text-gray-700">
                可选精修 <span className="font-bold text-primary">{draft.quota}</span> 张
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-700 flex items-center justify-center">
              <Images className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>已选 {selectedCount}/{draft.quota}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="text-sm font-bold text-gray-900">照片库</div>
          <div className="mt-1 text-xs text-gray-500">共 {draft.photos.length} 张，可在网格中勾选并提交</div>

          <Link
            to={`/order/${orderId}/pick/grid`}
            className="mt-4 w-full inline-flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 hover:bg-gray-100"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {selectedCount > 0 ? "继续选片" : "开始选片"}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 truncate">支持筛选“已选”，可预览大图</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-500" />
          </Link>
        </div>

        {draft.submittedAt ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            已提交选片。摄影师将开始后期制作。
          </div>
        ) : null}
      </div>
    </div>
  );
}

