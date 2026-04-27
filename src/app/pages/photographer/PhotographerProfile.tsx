import { Settings, ChevronRight, Star, Award, TrendingUp, RefreshCw, Edit } from "lucide-react";
import { Link } from "react-router";

export function PhotographerProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Profile Info */}
      <div className="bg-gradient-to-br from-primary to-accent px-5 pt-10 pb-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Switch back to User Mode */}
          <Link
            to="/profile"
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
          </Link>

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
                <Star className="w-3 h-3 fill-white" /> 官方认证
              </span>
            </div>
          </div>
          <Link to="/settings" className="text-white/80 hover:text-white">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-6 px-4 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-xs opacity-80 mt-1">综合评分</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">342</div>
            <div className="text-xs opacity-80 mt-1">评价数</div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs opacity-80 mt-1">累计服务</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-5 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">本月数据</h2>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">28</div>
              <div className="text-xs text-gray-500 mt-1">接单数</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">¥12.5k</div>
              <div className="text-xs text-gray-500 mt-1">收益</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-500 mt-1">好评率</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Management */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">个人主页</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link
            to="/photographer/edit-profile"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <Edit className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">编辑个人资料</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/photographer/packages"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">套餐管理</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">2个套餐</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>

          <Link
            to="/photographer/portfolio"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800">作品集</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">36张</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        </div>
      </div>

      {/* Service Management */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">服务管理</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link
            to="/photographer-center/schedule"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800">档期管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/photographer-center/reviews"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">评价管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/photographer/clients"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800">客户管理</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mt-6 pb-24">
        <h2 className="text-sm font-bold text-gray-900 mb-3">其他</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link
            to="/photographer/analytics"
            className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">数据分析</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            to="/settings"
            className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <Settings className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">系统设置</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
