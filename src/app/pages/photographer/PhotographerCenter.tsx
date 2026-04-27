import { Settings, ChevronRight, Calendar, Wallet, Star, FileText, TrendingUp, Users, RefreshCw } from "lucide-react";
import { Link } from "react-router";

export function PhotographerCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Profile Info */}
      <div className="bg-gradient-to-br from-primary to-accent px-5 pt-10 pb-8 rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10 mb-6">
          <div className="w-16 h-16 rounded-full bg-white border-2 border-white/50 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-white">
            <h1 className="text-xl font-bold">王摄·风光专精</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded border border-white/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> 官方认证摄影师
              </span>
            </div>
          </div>
          <Link to="/settings" className="text-white/80 hover:text-white">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">4.9</div>
            <div className="text-xs text-white/80 mt-1">评分</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">342</div>
            <div className="text-xs text-white/80 mt-1">评价</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">28</div>
            <div className="text-xs text-white/80 mt-1">本月订单</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-xs text-white/80 mt-1">累计服务</div>
          </div>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="px-5 -mt-4 relative z-10">
        <Link
          to="/photographer/revenue"
          className="block bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 shadow-lg border border-orange-400/20"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-medium">本月收益</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">¥12,580</div>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <TrendingUp className="w-3 h-3" />
            <span>较上月增长 23%</span>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">快捷功能</h2>
        <div className="grid grid-cols-4 gap-4">
          <Link to="/photographer-center/orders" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary relative">
              <FileText className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                3
              </span>
            </div>
            <span className="text-xs text-gray-600 text-center">订单管理</span>
          </Link>

          <Link to="/photographer/schedule" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 text-center">档期管理</span>
          </Link>

          <Link to="/photographer/reviews" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 text-center">评价管理</span>
          </Link>

          <Link to="/photographer/clients" className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs text-gray-600 text-center">客户管理</span>
          </Link>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">今日档期</h2>
          <Link to="/photographer/schedule" className="text-xs text-primary flex items-center gap-1">
            查看全部 <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-gray-900">09:00 - 11:00</span>
              </div>
              <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded">进行中</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1525060539736-979c838b7072?w=100"
                alt="Client"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">单人·赛湖蓝冰精灵</p>
                <p className="text-xs text-gray-500">客户: 186****3948 · 克勒涌珠</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <span className="text-sm font-medium text-gray-900">14:00 - 16:00</span>
              </div>
              <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">待开始</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100"
                alt="Client"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">双人·漫步松树头</p>
                <p className="text-xs text-gray-500">客户: 138****5678 · 松树头</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Menu */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">服务管理</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link
            to="/photographer/packages"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">套餐管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/photographer/portfolio"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">作品集管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/photographer/analytics"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">数据分析</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
