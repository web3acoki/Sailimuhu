import { ChevronLeft, Clock, Check, X, Camera, Images } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const MOCK_ORDERS = [
  {
    id: "202604271430",
    photographerId: 1,
    photographerName: "王摄·旅拍老炮儿",
    photographerAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
    service: "半日环湖蓝冰写真",
    location: "克勒涌珠打卡点",
    date: "2026-05-01 08:00",
    status: "pending_payment",
    totalAmount: 1280,
    paidAmount: 256,
    thumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=300"
  },
  {
    id: "202604110930",
    photographerId: 4,
    photographerName: "阿木·风光人像混拍",
    photographerAvatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBtYW58ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200",
    service: "环湖旅拍·进阶档",
    location: "赛里木湖环湖公路",
    date: "2026-04-10 16:00",
    status: "selecting",
    totalAmount: 1680,
    paidAmount: 1680,
    thumbnail:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NzI3ODg4N3ww&ixlib=rb-4.1.0&q=80&w=300",
  },
  {
    id: "202604201145",
    photographerId: 2,
    photographerName: "阿丽娜·民族风专拍",
    photographerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHBob3RvZ3JhcGhlcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
    service: "艾德莱斯绸礼服套餐",
    location: "松树头礼服馆",
    date: "2026-04-18 14:00",
    status: "completed",
    totalAmount: 2880,
    paidAmount: 2880,
    thumbnail: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBkcmVzc3xlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=300",
    rating: 5
  },
  {
    id: "202603151020",
    photographerId: 3,
    photographerName: "天鹅追光手·古丽",
    photographerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHNtaWxpbmd8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200",
    service: "日出天鹅湖抓拍",
    location: "西海天鹅栖息地",
    date: "2026-03-15 06:30",
    status: "cancelled",
    totalAmount: 980,
    paidAmount: 0,
    thumbnail: "https://images.unsplash.com/photo-1575201079349-225d33422ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzd2FuJTIwbGFrZXxlbnwxfHx8fDE3NzcyNzg4ODd8MA&ixlib=rb-4.1.0&q=80&w=300"
  }
];

const STATUS_CONFIG = {
  pending_payment: { label: "待付尾款", color: "text-orange-600 bg-orange-50", icon: Clock },
  completed: { label: "已完成", color: "text-green-600 bg-green-50", icon: Check },
  cancelled: { label: "已取消", color: "text-gray-500 bg-gray-50", icon: X },
  in_progress: { label: "拍摄中", color: "text-primary bg-blue-50", icon: Camera },
  selecting: { label: "选片中", color: "text-violet-700 bg-violet-50", icon: Images },
};

export function OrderList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = filter === "all"
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的订单</h1>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-5 py-3 flex gap-3 overflow-x-auto scrollbar-hide border-b border-gray-100">
        {[
          { key: "all", label: "全部" },
          { key: "pending_payment", label: "待付款" },
          { key: "in_progress", label: "进行中" },
          { key: "selecting", label: "选片中" },
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
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">暂无订单</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const statusConfig = STATUS_CONFIG[order.status];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="p-4 flex items-center justify-between border-b border-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={order.photographerAvatar}
                      alt={order.photographerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">{order.photographerName}</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Order Content */}
                <div
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="p-4 flex gap-3 cursor-pointer"
                >
                  <img
                    src={order.thumbnail}
                    alt={order.service}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{order.service}</h3>
                    <p className="text-xs text-gray-500 mb-1">{order.location}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">¥{order.totalAmount}</div>
                    {order.paidAmount > 0 && order.paidAmount < order.totalAmount && (
                      <div className="text-xs text-gray-500 mt-1">已付¥{order.paidAmount}</div>
                    )}
                  </div>
                </div>

                {/* Order Actions */}
                {order.status === "pending_payment" && (
                  <div className="px-4 pb-4 flex gap-2 justify-end">
                    <button className="px-4 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50">
                      取消订单
                    </button>
                    <Link
                      to={`/payment/${order.id}`}
                      className="px-4 py-1.5 text-xs font-medium text-white bg-primary rounded-full hover:bg-primary/90"
                    >
                      支付尾款
                    </Link>
                  </div>
                )}

                {order.status === "selecting" && (
                  <div className="px-4 pb-4 flex gap-2 justify-end">
                    <Link
                      to={`/order/${order.id}/pick`}
                      className="px-4 py-1.5 text-xs font-medium text-white bg-primary rounded-full hover:bg-primary/90"
                    >
                      去选片
                    </Link>
                  </div>
                )}

                {order.status === "completed" && !order.rating && (
                  <div className="px-4 pb-4 flex gap-2 justify-end">
                    <Link
                      to={`/review/${order.id}`}
                      className="px-4 py-1.5 text-xs font-medium text-primary border border-primary rounded-full hover:bg-blue-50"
                    >
                      去评价
                    </Link>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
