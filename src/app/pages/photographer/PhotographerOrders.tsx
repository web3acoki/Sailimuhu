import { ChevronLeft, Clock, Check, X, Phone, MessageCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

const MOCK_PHOTOGRAPHER_ORDERS = [
  {
    id: "202604271430",
    clientName: "晓晓",
    clientPhone: "186****3948",
    clientAvatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?w=100",
    service: "单人·赛湖蓝冰精灵",
    location: "克勒涌珠打卡点",
    date: "2026-05-01",
    time: "08:00-11:00",
    status: "confirmed",
    amount: 1280,
    deposit: 256,
    thumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?w=300"
  },
  {
    id: "202604261120",
    clientName: "小美",
    clientPhone: "138****5678",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    service: "双人·漫步松树头",
    location: "松树头",
    date: "2026-05-01",
    time: "14:00-16:00",
    status: "pending",
    amount: 599,
    deposit: 199,
    thumbnail: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=300"
  },
  {
    id: "202604201145",
    clientName: "娜扎",
    clientPhone: "139****9999",
    clientAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    service: "艾德莱斯绸礼服套餐",
    location: "松树头礼服馆",
    date: "2026-04-18",
    time: "14:00-17:00",
    status: "completed",
    amount: 2880,
    deposit: 2880,
    thumbnail: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=300"
  }
];

const STATUS_CONFIG = {
  pending: { label: "待确认", color: "text-orange-600 bg-orange-50", icon: Clock },
  confirmed: { label: "已确认", color: "text-blue-600 bg-blue-50", icon: Check },
  completed: { label: "已完成", color: "text-green-600 bg-green-50", icon: Check },
  cancelled: { label: "已取消", color: "text-gray-500 bg-gray-50", icon: X }
};

export function PhotographerOrders() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = filter === "all"
    ? MOCK_PHOTOGRAPHER_ORDERS
    : MOCK_PHOTOGRAPHER_ORDERS.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">订单管理</h1>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-5 py-3 flex gap-3 overflow-x-auto scrollbar-hide border-b border-gray-100">
        {[
          { key: "all", label: "全部" },
          { key: "pending", label: "待确认" },
          { key: "confirmed", label: "已确认" },
          { key: "completed", label: "已完成" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="px-5 mt-4 space-y-3">
        {filteredOrders.map(order => {
          const statusConfig = STATUS_CONFIG[order.status];
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={order.id}
              className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* Order Header */}
              <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={order.clientAvatar}
                    alt={order.clientName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{order.clientName}</span>
                    <p className="text-xs text-gray-500">{order.clientPhone}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </div>
              </div>

              {/* Order Content */}
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <img
                    src={order.thumbnail}
                    alt={order.service}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{order.service}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" /> {order.location}
                    </p>
                    <p className="text-xs text-gray-500">{order.date} {order.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">¥{order.amount}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 flex items-center justify-center gap-1">
                    <Phone className="w-4 h-4" />
                    联系客户
                  </button>
                  <button
                    onClick={() => navigate(`/photographer/order/${order.id}`)}
                    className="flex-1 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    查看详情
                  </button>
                </div>

                {order.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-full hover:bg-red-50">
                      拒绝订单
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700">
                      确认接单
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
