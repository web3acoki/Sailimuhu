import { Settings, ChevronRight, FileImage, CreditCard, Award, HelpCircle, Camera, RefreshCw } from "lucide-react";
import { Link } from "react-router";

export function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Profile Info */}
      <div className="bg-white px-5 pt-10 pb-6 rounded-b-3xl shadow-sm relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Switch to Photographer Mode Button */}
          <Link
            to="/photographer-center"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
          >
            <Camera className="w-6 h-6" />
          </Link>

          <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center text-gray-500 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1525060539736-979c838b7072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwZmVtYWxlJTIwc21pbGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">186****3948</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1 font-medium">
                <Award className="w-3 h-3" /> 赛湖初见
              </span>
              <span className="text-xs text-gray-500">Lv.1</span>
            </div>
          </div>
          <Link to="/settings" className="text-gray-400 hover:text-gray-600">
            <Settings className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-between mt-6 px-4">
          <div className="text-center">
            <div className="font-bold text-gray-900">0</div>
            <div className="text-xs text-gray-500 mt-1">关注摄影师</div>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <div className="font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-500 mt-1">打卡足迹</div>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <div className="font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500 mt-1">获赞</div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-5 mt-6 space-y-4 pb-24">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-3">我的服务</h2>
          <div className="grid grid-cols-4 gap-4">
            <Link to="/orders" className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary relative">
                <FileImage className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">1</span>
              </div>
              <span className="text-xs text-gray-600">全部订单</span>
            </Link>
            <Link to="/orders?filter=pending_payment" className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600">待付尾款</span>
            </Link>
            <Link to="/orders?filter=in_progress" className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-600">成片交付</span>
            </Link>
            <Link to="/orders?filter=completed" className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600">服务评价</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Link to="/photographer-apply" className="flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">摄影师入驻</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              去认证 <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
          <Link to="/settings" className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-800">联系官方客服</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
