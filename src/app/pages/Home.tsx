import { MapPin, Image as ImageIcon, Sparkles, ChevronRight, Camera, Search, Bell } from "lucide-react";
import { Link } from "react-router";

const MOCK_FEED = [
  {
    id: 1,
    user: "赛湖初见·晓晓",
    avatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwZmVtYWxlJTIwc21pbGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200",
    image: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=600",
    content: "蓝冰仙子打卡成功！冬日的赛里木湖简直是人间仙境。推荐找王摄，出片绝了！",
    likes: 342,
    location: "克勒涌珠"
  },
  {
    id: 2,
    user: "风光猎人·阿迪力",
    avatar: "https://images.unsplash.com/photo-1762708550141-2688121b9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBob2xkaW5nJTIwY2FtZXJhJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
    image: "https://images.unsplash.com/photo-1575201079349-225d33422ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzd2FuJTIwbGFrZXxlbnwxfHx8fDE3NzcyNzg4ODd8MA&ixlib=rb-4.1.0&q=80&w=600",
    content: "今日份的#赛湖天鹅，早晨光线最好的时候抓拍到的。原图已传图库。",
    likes: 891,
    location: "松树头"
  }
];

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
        
        {/* Ethnic Pattern Overlay (simulated with CSS) */}
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
            <span className="text-xs font-medium text-gray-700">风光图库</span>
          </Link>
          <Link to="/ai" className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors text-purple-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">AI写真馆</span>
          </Link>
        </div>
      </div>

      {/* Community Feed */}
      <div className="mt-8 px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
            赛湖圈子
          </h2>
          <span className="text-xs text-gray-500 flex items-center">
            发现更多 <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {MOCK_FEED.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 block">
              <div className="p-4 flex items-center gap-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{post.user}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {post.location}
                  </p>
                </div>
              </div>
              <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-800 leading-relaxed mb-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs text-primary bg-blue-50 px-2 py-1 rounded-md font-medium">#蓝冰仙子</span>
                  </div>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span className="text-xs">{post.likes}</span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Button for Map */}
      <Link to="/map" className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center transform hover:scale-105 transition-transform">
        <Camera className="w-6 h-6" />
      </Link>
    </div>
  );
}
