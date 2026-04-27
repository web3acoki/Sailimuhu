import { ChevronLeft, Heart, MessageCircle, Camera, Bell } from "lucide-react";
import { useNavigate, Link } from "react-router";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    user: "草原之花·娜扎",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHBob3RvZ3JhcGhlcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=100",
    content: "赞了你的动态",
    postThumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=100",
    time: "5分钟前",
    isRead: false
  },
  {
    id: 2,
    type: "comment",
    user: "镜头捕手·阿力木",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=100",
    content: "评论了你: 构图和光影处理都很到位👍",
    postThumbnail: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=100",
    time: "2小时前",
    isRead: false
  },
  {
    id: 3,
    type: "order",
    content: "您的订单已确认,摄影师王摄已接单",
    orderId: "202604271430",
    time: "3小时前",
    isRead: true
  },
  {
    id: 4,
    type: "follow",
    user: "旅行者·小美",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHNtaWxpbmd8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=100",
    content: "关注了你",
    time: "1天前",
    isRead: true
  },
  {
    id: 5,
    type: "system",
    content: "您的AI写真已生成完成,快去查看吧!",
    time: "2天前",
    isRead: true
  }
];

const NOTIFICATION_ICONS = {
  like: { icon: Heart, color: "text-red-500 bg-red-50" },
  comment: { icon: MessageCircle, color: "text-blue-500 bg-blue-50" },
  order: { icon: Camera, color: "text-primary bg-blue-50" },
  follow: { icon: Bell, color: "text-purple-500 bg-purple-50" },
  system: { icon: Bell, color: "text-gray-500 bg-gray-50" }
};

export function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">消息通知</h1>
        </div>
        <button className="text-sm text-primary">全部已读</button>
      </div>

      {/* Notifications List */}
      <div className="mt-3">
        {MOCK_NOTIFICATIONS.map(notification => {
          const iconConfig = NOTIFICATION_ICONS[notification.type];
          const Icon = iconConfig.icon;

          return (
            <div
              key={notification.id}
              className={`bg-white border-b border-gray-100 px-5 py-4 flex gap-3 active:bg-gray-50 ${
                !notification.isRead ? "bg-blue-50/30" : ""
              }`}
            >
              {notification.user ? (
                <img
                  src={notification.avatar}
                  alt={notification.user}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    {notification.user && (
                      <span className="text-sm font-medium text-gray-900">{notification.user} </span>
                    )}
                    <span className="text-sm text-gray-600">{notification.content}</span>
                  </div>
                  {notification.postThumbnail && (
                    <img
                      src={notification.postThumbnail}
                      alt="Post"
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{notification.time}</span>
                  {notification.type === "follow" && (
                    <button className="text-xs font-medium text-primary border border-primary px-3 py-1 rounded-full hover:bg-blue-50">
                      回关
                    </button>
                  )}
                  {notification.type === "order" && notification.orderId && (
                    <Link
                      to={`/order/${notification.orderId}`}
                      className="text-xs font-medium text-primary"
                    >
                      查看详情
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {MOCK_NOTIFICATIONS.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">暂无消息</p>
        </div>
      )}
    </div>
  );
}
