import { ChevronLeft, MapPin, Calendar, Clock, Phone, MessageCircle, Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const MOCK_ORDER = {
  id: "202604271430",
  clientName: "晓晓",
  clientPhone: "186****3948",
  clientAvatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?w=200",
  service: "单人·赛湖蓝冰精灵",
  serviceDescription: "包含3小时专业拍摄 + 30张精修 + 所有原片",
  location: "克勒涌珠打卡点",
  locationDetail: "赛里木湖北门进入,沿环湖公路东行8km",
  date: "2026-05-01",
  time: "08:00-11:00",
  bookingTime: "2026-04-27 14:30",
  status: "confirmed",
  totalAmount: 1280,
  depositAmount: 256,
  balanceAmount: 1024,
  photographerEarning: 1152, // 扣除平台费用后
  thumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?w=600",
  notes: "客户要求早上光线最好的时候拍摄,准备蓝色系服装",
  timeline: [
    { time: "2026-04-27 14:30", event: "客户下单", status: "completed" },
    { time: "2026-04-27 14:31", event: "支付定金¥256", status: "completed" },
    { time: "2026-04-27 15:00", event: "摄影师确认接单", status: "completed" },
    { time: "2026-05-01 08:00", event: "开始拍摄", status: "pending" },
    { time: "2026-05-03", event: "成片交付", status: "pending" }
  ]
};

export function PhotographerOrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">订单详情</h1>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-primary px-5 py-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">订单状态</div>
            <div className="text-xl font-bold">已确认 - 待拍摄</div>
            <div className="text-xs opacity-80 mt-2">拍摄时间: {MOCK_ORDER.date} {MOCK_ORDER.time}</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">预计收益</div>
            <div className="text-2xl font-bold">¥{MOCK_ORDER.photographerEarning}</div>
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">客户信息</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={MOCK_ORDER.clientAvatar}
              alt={MOCK_ORDER.clientName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{MOCK_ORDER.clientName}</div>
              <div className="text-xs text-gray-500 mt-0.5">{MOCK_ORDER.clientPhone}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">服务内容</h3>
        <div className="flex gap-3 mb-3">
          <img
            src={MOCK_ORDER.thumbnail}
            alt={MOCK_ORDER.service}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">{MOCK_ORDER.service}</h4>
            <p className="text-xs text-gray-500">{MOCK_ORDER.serviceDescription}</p>
          </div>
        </div>
      </div>

      {/* Shooting Details */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">拍摄安排</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{MOCK_ORDER.location}</div>
              <div className="text-xs text-gray-500 mt-1">{MOCK_ORDER.locationDetail}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{MOCK_ORDER.date}</div>
              <div className="text-xs text-gray-500 mt-1">{MOCK_ORDER.time}</div>
            </div>
          </div>
        </div>
        {MOCK_ORDER.notes && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-xs font-medium text-orange-800 mb-1">客户备注</div>
            <div className="text-xs text-orange-700">{MOCK_ORDER.notes}</div>
          </div>
        )}
      </div>

      {/* Revenue Details */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">收益明细</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">服务费用</span>
            <span className="text-gray-900">¥{MOCK_ORDER.totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">平台服务费 (10%)</span>
            <span className="text-red-600">-¥{MOCK_ORDER.totalAmount * 0.1}</span>
          </div>
          <div className="h-px bg-gray-100 my-2" />
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">预计到账</span>
            <span className="text-base font-bold text-green-600">¥{MOCK_ORDER.photographerEarning}</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            * 客户支付尾款后，款项将在3个工作日内到账
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">订单进度</h3>
        <div className="relative">
          {MOCK_ORDER.timeline.map((item, index) => (
            <div key={index} className="flex gap-3 pb-4 last:pb-0 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "completed" ? "bg-primary" : "bg-gray-300"
                  }`}
                />
                {index < MOCK_ORDER.timeline.length - 1 && (
                  <div className="w-px h-full bg-gray-200 mt-1" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className={`text-xs ${item.status === "completed" ? "text-gray-900" : "text-gray-500"}`}>
                  {item.event}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-white mt-3 px-5 py-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>订单编号</span>
          <span>{MOCK_ORDER.id}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>下单时间</span>
          <span>{MOCK_ORDER.bookingTime}</span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 max-w-md mx-auto">
        {MOCK_ORDER.status === "pending" && (
          <div className="flex gap-3">
            <button className="flex-1 py-3 text-sm font-medium text-red-600 border border-red-300 rounded-full hover:bg-red-50">
              拒绝订单
            </button>
            <button className="flex-1 py-3 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700">
              确认接单
            </button>
          </div>
        )}
        {MOCK_ORDER.status === "confirmed" && (
          <button className="w-full py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90">
            联系客户确认细节
          </button>
        )}
      </div>
    </div>
  );
}
