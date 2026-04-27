import { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Wallet, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { clsx } from "clsx";

export function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pkgId = searchParams.get("pkg");
  const [paymentMethod, setPaymentMethod] = useState("alipay");
  const [isPaying, setIsPaying] = useState(false);

  // Mock data
  const deposit = pkgId === "2" ? 199 : 99;
  const total = pkgId === "2" ? 599 : 399;

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      // Simulate success
      alert("支付成功！摄影师已接单。");
      navigate("/profile"); // Redirect to profile/orders
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center font-bold text-gray-900 pr-7">确认订单</h1>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h2 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">预约信息</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">服务项目</span>
              <span className="font-medium text-gray-900">赛湖蓝冰精灵 (单人)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">预约时间</span>
              <span className="font-medium text-gray-900">明天 14:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">摄影师</span>
              <span className="font-medium text-gray-900">王摄</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">套餐总价</span>
              <span className="text-gray-900">¥{total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-bold text-base">需付定金</span>
              <span className="text-red-500 font-bold text-xl">¥{deposit}</span>
            </div>
            <p className="text-xs text-gray-400 text-right mt-1">尾款 ¥{total - deposit} 成片交付后支付</p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-blue-50/50 rounded-xl p-3 flex items-start gap-2 mb-6 border border-blue-100">
          <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            平台担保交易：定金由平台安全托管，拍摄完成并交付原片后自动结算给摄影师。如遇恶劣天气可全额退款。
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
          <h2 className="text-sm font-bold text-gray-800 mb-4">支付方式</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors hover:bg-gray-50 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">支付宝支付</div>
                  <div className="text-xs text-gray-500">推荐支付宝用户使用</div>
                </div>
              </div>
              <div className={clsx("w-5 h-5 rounded-full border flex items-center justify-center", paymentMethod === 'alipay' ? "border-primary bg-primary" : "border-gray-300")}>
                {paymentMethod === 'alipay' && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'alipay'} onChange={() => setPaymentMethod('alipay')} />
            </label>

            <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors border-primary bg-blue-50/30 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    花呗分期
                    <span className="text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded">免息</span>
                  </div>
                  <div className="text-xs text-gray-500">支持定金分期，减轻压力</div>
                </div>
              </div>
              <div className={clsx("w-5 h-5 rounded-full border flex items-center justify-center relative z-10", paymentMethod === 'huabei' ? "border-primary bg-primary" : "border-gray-300")}>
                {paymentMethod === 'huabei' && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'huabei'} onChange={() => setPaymentMethod('huabei')} />
            </label>

            <label className="flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors hover:bg-gray-50 border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16.1 11.5c0 3.3-2.6 6-6 6s-6-2.6-6-6 2.6-6 6-6 6 2.6 6 6zm1.3-4.4c.5.5 1.1 1 1.7 1.5.3-.4.6-.9.8-1.4-1-.1-1.9-.3-2.5-.1z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">微信支付</div>
                </div>
              </div>
              <div className={clsx("w-5 h-5 rounded-full border flex items-center justify-center", paymentMethod === 'wechat' ? "border-primary bg-primary" : "border-gray-300")}>
                {paymentMethod === 'wechat' && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'wechat'} onChange={() => setPaymentMethod('wechat')} />
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-100 p-4 pb-safe">
        <button 
          onClick={handlePay}
          disabled={isPaying}
          className="w-full bg-primary text-white py-3.5 rounded-full font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity"
        >
          {isPaying ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            `确认支付 ¥${deposit}`
          )}
        </button>
      </div>
    </div>
  );
}
