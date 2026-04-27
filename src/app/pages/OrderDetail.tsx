import { ChevronLeft, MapPin, Calendar, Clock, Phone, MessageCircle, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

const MOCK_ORDER_DETAIL = {
  id: "202604271430",
  status: "pending_payment",
  photographerId: 1,
  photographerName: "王摄·旅拍老炮儿",
  photographerAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
  photographerPhone: "138****8888",
  service: "半日环湖蓝冰写真",
  serviceDescription: "包含3小时专业拍摄 + 30张精修 + 所有原片",
  location: "克勒涌珠打卡点",
  locationDetail: "赛里木湖北门进入,沿环湖公路东行8km",
  date: "2026-05-01",
  time: "08:00-11:00",
  bookingTime: "2026-04-27 14:30",
  totalAmount: 1280,
  depositAmount: 256,
  balanceAmount: 1024,
  paidAmount: 256,
  thumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=600",
  notes: "请自备保暖衣物,拍摄地海拔较高温度较低。建议提前一天到达适应高原气候。",
  timeline: [
    { time: "2026-04-27 14:30", event: "预约成功", status: "completed" },
    { time: "2026-04-27 14:31", event: "支付定金¥256", status: "completed" },
    { time: "待支付", event: "支付尾款¥1024", status: "pending" },
    { time: "2026-05-01 08:00", event: "开始拍摄", status: "pending" },
    { time: "预计3日内", event: "成片交付", status: "pending" }
  ]
};

export function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const order = MOCK_ORDER_DETAIL;

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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">订单状态</div>
            <div className="text-xl font-bold">待支付尾款</div>
            <div className="text-xs opacity-80 mt-2">请在拍摄前完成支付</div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">还需支付</div>
            <div className="text-2xl font-bold">¥{order.balanceAmount}</div>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div className="bg-white mt-3 px-5 py-4">
        <div className="flex gap-3">
          <img
            src={order.thumbnail}
            alt={order.service}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 mb-1">{order.service}</h2>
            <p className="text-xs text-gray-500 mb-2">{order.serviceDescription}</p>
            <div className="text-sm font-bold text-primary">¥{order.totalAmount}</div>
          </div>
        </div>
      </div>

      {/* Photographer Info */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">摄影师信息</h3>
        <div className="flex items-center justify-between">
          <Link to={`/photographer/${order.photographerId}`} className="flex items-center gap-3 flex-1">
            <img
              src={order.photographerAvatar}
              alt={order.photographerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{order.photographerName}</div>
              <div className="text-xs text-gray-500 mt-0.5">查看主页</div>
            </div>
          </Link>
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

      {/* Appointment Details */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">拍摄详情</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">{order.location}</div>
              <div className="text-xs text-gray-500 mt-1">{order.locationDetail}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">{order.date}</div>
              <div className="text-xs text-gray-500 mt-1">{order.time}</div>
            </div>
          </div>
        </div>
        {order.notes && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-xs font-medium text-orange-800 mb-1">温馨提示</div>
            <div className="text-xs text-orange-700 leading-relaxed">{order.notes}</div>
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">费用明细</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">套餐费用</span>
            <span className="text-gray-900">¥{order.totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">已付定金</span>
            <span className="text-green-600">-¥{order.depositAmount}</span>
          </div>
          <div className="h-px bg-gray-100 my-2" />
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">待付尾款</span>
            <span className="text-base font-bold text-primary">¥{order.balanceAmount}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white mt-3 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">订单进度</h3>
        <div className="relative">
          {order.timeline.map((item, index) => (
            <div key={index} className="flex gap-3 pb-4 last:pb-0 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === "completed" ? "bg-primary" : "bg-gray-300"
                  }`}
                />
                {index < order.timeline.length - 1 && (
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
          <span>{order.id}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>下单时间</span>
          <span>{order.bookingTime}</span>
        </div>
      </div>

      {/* Bottom Actions */}
      {order.status === "pending_payment" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 flex gap-3">
          <button className="flex-1 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">
            取消订单
          </button>
          <Link
            to={`/payment/${order.id}`}
            className="flex-1 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 text-center"
          >
            支付尾款 ¥{order.balanceAmount}
          </Link>
        </div>
      )}
    </div>
  );
}
