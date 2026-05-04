import { MapPin, Image as ImageIcon, Sparkles, Search, Bell } from "lucide-react";
import { Link } from "react-router";
import { SaihuCircleSection } from "../components/home/SaihuCircleSection";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">赛湖镜界</h1>
        <div className="flex gap-3">
          <Link to="/search" className="text-gray-700 hover:text-primary">
            <Search className="w-6 h-6" />
          </Link>
          <Link to="/notifications" className="text-gray-700 hover:text-primary relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">2</span>
          </Link>
        </div>
      </div>

      {/* Header / Banner */}
      <div className="relative h-72 w-full rounded-b-3xl overflow-hidden shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1746087848758-45581f239fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwaWNlJTIwbGFrZSUyMHdpbnRlciUyMHNub3d8ZW58MXx8fHwxNzc3Mjc4ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Sayram Lake"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary to-accent opacity-80" />

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium border border-white/20">
              官方推荐
            </span>
            <span className="text-sm font-light flex items-center gap-1">
              <MapPin className="w-3 h-3" /> 赛里木湖·北门
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-wider mb-1">遇见最美赛湖蓝</h1>
          <p className="text-sm text-white/80 font-light">12位认证摄影师本周在此出片</p>
        </div>
      </div>

      {/* Quick Entries */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-4 grid grid-cols-3 gap-4 border border-gray-100">
          <Link to="/map" className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">开启环湖</span>
          </Link>
          <Link to="/gallery" className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors text-accent">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">光影档案</span>
          </Link>
          <Link to="/ai" className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">AI写真馆</span>
          </Link>
        </div>
      </div>

      <SaihuCircleSection />
    </div>
  );
}
