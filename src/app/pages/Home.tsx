import { MapPin, Image as ImageIcon, Search } from "lucide-react";
import { Link } from "react-router";
import { SaihuCircleSection } from "../components/home/SaihuCircleSection";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* 顶栏：刘海安全区 + 44px 级点击热区（类小程序导航） */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <h1 className="text-[17px] font-semibold leading-tight tracking-tight text-gray-900">
          赛湖镜界
        </h1>
        <Link
          to="/search"
          className="-m-1 flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition-colors active:bg-gray-100"
          aria-label="搜索"
        >
          <Search className="h-6 w-6" />
        </Link>
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

      {/* 快捷入口：16px 边距、整块可点、点击态 */}
      <div className="relative z-10 -mt-6 px-4">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg shadow-gray-200/40">
          <Link
            to="/map"
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-3 transition-transform active:scale-[0.98] active:bg-gray-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition-colors">
              <MapPin className="h-6 w-6" />
            </div>
            <span className="text-[13px] font-medium text-gray-800">开启环湖</span>
          </Link>
          <Link
            to="/gallery"
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-3 transition-transform active:scale-[0.98] active:bg-gray-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-accent transition-colors">
              <ImageIcon className="h-6 w-6" />
            </div>
            <span className="text-[13px] font-medium text-gray-800">光影档案</span>
          </Link>
        </div>
      </div>

      <SaihuCircleSection />
    </div>
  );
}
