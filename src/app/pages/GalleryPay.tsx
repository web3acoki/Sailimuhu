import { Check, ChevronLeft, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPhoto } from "../data/galleryArchiveMock";

type PayMethodId = "wallet" | "alipay" | "wechat" | "cloud";

type PayMethod = {
  id: PayMethodId;
  label: string;
  hint?: string;
  disabled?: boolean;
  iconBg: string;
  iconColor: string;
  badge: string;
};

const METHODS: PayMethod[] = [
  {
    id: "wallet",
    label: "赛湖钱包",
    hint: "剩余 ¥0.00",
    disabled: true,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    badge: "钱",
  },
  {
    id: "alipay",
    label: "支付宝支付",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
    badge: "支",
  },
  {
    id: "wechat",
    label: "微信支付",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    badge: "微",
  },
  {
    id: "cloud",
    label: "云支付",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    badge: "云",
  },
];

export function GalleryPay() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const photo = photoId ? getPhoto(photoId) : undefined;

  const [method, setMethod] = useState<PayMethodId>("alipay");
  const [agreed, setAgreed] = useState(false);
  const [paying, setPaying] = useState(false);

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-sm text-gray-600">未找到该照片</div>
      </div>
    );
  }

  const [yuan, fen] = photo.price.toFixed(2).split(".");

  const handlePay = () => {
    if (!agreed) {
      alert("请先阅读并同意《照片下载使用协议》");
      return;
    }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      alert(`支付成功！\n您可以在"我的"中查看并下载照片。`);
      navigate("/profile");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 flex items-center sticky top-0 z-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="-ml-1 text-gray-700"
          aria-label="返回"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="flex-1 text-center text-base font-bold text-gray-900 pr-7">
          支付
        </h1>
      </div>

      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        {/* Amount */}
        <div className="mt-8 text-center">
          <div className="text-5xl font-bold text-gray-900 tracking-tight">
            <span>¥{yuan}</span>
            <span className="text-2xl align-top">.{fen}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">抓拍照片 x1</p>
        </div>

        {/* Methods */}
        <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4">支付方式</h2>
          <div className="space-y-1">
            {METHODS.map((m) => {
              const checked = method === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  disabled={m.disabled}
                  onClick={() => !m.disabled && setMethod(m.id)}
                  className={`flex w-full items-center gap-3 py-3 text-left ${
                    m.disabled ? "opacity-60" : ""
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-md ${m.iconBg}`}
                  >
                    {m.id === "wallet" ? (
                      <Wallet className={`h-4 w-4 ${m.iconColor}`} />
                    ) : (
                      <span className={`text-xs font-bold ${m.iconColor}`}>
                        {m.badge}
                      </span>
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {m.label}
                    </div>
                    {m.hint ? (
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {m.hint}
                      </div>
                    ) : null}
                  </div>

                  {m.disabled ? (
                    <span className="text-[11px] text-gray-400">余额不足</span>
                  ) : (
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        checked
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-white text-transparent"
                      }`}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agreement */}
        <div className="mt-5 px-1">
          <label className="flex items-start gap-2 text-[12px] text-gray-600">
            <button
              type="button"
              onClick={() => setAgreed((v) => !v)}
              aria-pressed={agreed}
              aria-label="同意协议"
              className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                agreed
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-transparent"
              }`}
            >
              <Check className="h-2.5 w-2.5" />
            </button>
            <span>
              我已阅读并同意
              <a
                href="#"
                className="text-gray-900 underline-offset-2 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                《照片下载使用协议》
              </a>
            </span>
          </label>
          <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
            温馨提示：照片视频属于数字产品，根据我国法律要求，不支持退换货，感谢您的理解
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white px-4 pt-3 pb-5 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          disabled={paying}
          onClick={handlePay}
          className="w-full rounded-full bg-gray-900 py-3.5 text-base font-semibold text-white disabled:opacity-70"
        >
          {paying ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              支付中…
            </span>
          ) : (
            "确认支付"
          )}
        </button>
      </div>
    </div>
  );
}
