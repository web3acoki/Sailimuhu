import { Check, ChevronLeft, Repeat2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPhoto } from "../data/galleryArchiveMock";

const RESOLUTION_OPTIONS = ["1080P高清", "原图无损"] as const;

export function GalleryOrderConfirm() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const photo = photoId ? getPhoto(photoId) : undefined;

  const [selected, setSelected] = useState(true);
  const [resolutionIdx, setResolutionIdx] = useState(0);

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">未找到该照片</div>
      </div>
    );
  }

  const total = selected ? photo.price : 0;
  const count = selected ? 1 : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="-ml-1 text-gray-700"
          aria-label="返回"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base font-bold text-gray-900">订单确认</h1>
        <button
          type="button"
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          换规格
        </button>
      </div>

      {/* Item row */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white px-4 py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelected((v) => !v)}
              aria-pressed={selected}
              aria-label={selected ? "取消选择" : "选择"}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-transparent"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
            </button>

            <img
              src={photo.thumbUrl}
              alt="抓拍照片"
              className="h-16 w-16 rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-rose-500">
                ¥{photo.price.toFixed(2)}
              </div>
              <div className="mt-0.5 text-[11px] text-gray-400">
                {photo.date} {photo.time}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setResolutionIdx((idx) => (idx + 1) % RESOLUTION_OPTIONS.length)
              }
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
            >
              {RESOLUTION_OPTIONS[resolutionIdx]}
              <Repeat2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* whitespace */}
        <div className="h-72" />
      </div>

      {/* Bottom bar */}
      <div className="bg-white px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSelected((v) => !v)}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                selected
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-transparent"
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            全选
          </button>

          <div className="flex-1 text-sm">
            <span className="text-gray-500">已选</span>
            <span className="mx-1 font-bold text-gray-900">{count}</span>
            <span className="text-gray-500">张 合计：</span>
            <span className="font-bold text-rose-500">¥{total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            disabled={!selected}
            onClick={() => navigate(`/gallery/pay/${photo.id}`)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold ${
              selected
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            提交订单
          </button>
        </div>
      </div>
    </div>
  );
}
