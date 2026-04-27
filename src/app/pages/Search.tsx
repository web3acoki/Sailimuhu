import { ChevronLeft, Search as SearchIcon, MapPin, Camera, Hash, TrendingUp, X } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useState } from "react";

const TRENDING_TAGS = [
  { tag: "#蓝冰仙子", count: 1240 },
  { tag: "#赛里木湖", count: 3420 },
  { tag: "#艾德莱斯绸", count: 890 },
  { tag: "#天鹅湖", count: 756 },
  { tag: "#环湖公路", count: 2103 }
];

const RECENT_SEARCHES = [
  "王摄·旅拍老炮儿",
  "克勒涌珠",
  "蓝冰写真"
];

const MOCK_SEARCH_RESULTS = {
  photographers: [
    {
      id: 1,
      name: "王摄·旅拍老炮儿",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
      specialty: "蓝冰写真·环湖风光",
      rating: 4.9
    },
    {
      id: 2,
      name: "阿丽娜·民族风专拍",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHBob3RvZ3JhcGhlcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
      specialty: "民族服饰·艾德莱斯绸",
      rating: 4.8
    }
  ],
  locations: [
    { name: "克勒涌珠", posts: 342, icon: "🏔️" },
    { name: "松树头", posts: 256, icon: "🌲" },
    { name: "西海天鹅栖息地", posts: 189, icon: "🦢" }
  ],
  posts: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=300",
      title: "蓝冰仙子打卡成功",
      likes: 342
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1575201079349-225d33422ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzd2FuJTIwbGFrZXxlbnwxfHx8fDE3NzcyNzg4ODd8MA&ixlib=rb-4.1.0&q=80&w=300",
      title: "日出天鹅湖",
      likes: 891
    }
  ]
};

export function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const [activeTab, setActiveTab] = useState<"all" | "photographers" | "posts" | "locations">("all");

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  const hasResults = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索摄影师、地点、话题..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>
        </div>

        {hasResults && (
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {[
              { key: "all", label: "全部" },
              { key: "photographers", label: "摄影师" },
              { key: "posts", label: "动态" },
              { key: "locations", label: "地点" }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!hasResults ? (
        <div className="px-5">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">最近搜索</h2>
                <button onClick={clearRecentSearches} className="text-xs text-gray-500">
                  清空
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 active:bg-gray-50"
                  >
                    <button
                      onClick={() => setSearchQuery(search)}
                      className="flex-1 text-left text-sm text-gray-700"
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Tags */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-gray-900">热门话题</h2>
            </div>
            <div className="space-y-3">
              {TRENDING_TAGS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(item.tag)}
                  className="w-full flex items-center justify-between py-2 active:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{item.tag.slice(1)}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{item.count}条内容</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 mt-4">
          {/* Search Results */}
          {(activeTab === "all" || activeTab === "photographers") && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">摄影师</h3>
              <div className="space-y-3">
                {MOCK_SEARCH_RESULTS.photographers.map(photographer => (
                  <Link
                    key={photographer.id}
                    to={`/photographer/${photographer.id}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 active:shadow-md transition-shadow"
                  >
                    <img
                      src={photographer.avatar}
                      alt={photographer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{photographer.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{photographer.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-900 font-medium">{photographer.rating}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "locations") && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">地点</h3>
              <div className="space-y-2">
                {MOCK_SEARCH_RESULTS.locations.map((location, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 active:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{location.icon}</span>
                      <div className="text-left">
                        <h4 className="text-sm font-medium text-gray-900">{location.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{location.posts}条内容</p>
                      </div>
                    </div>
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "posts") && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">相关动态</h3>
              <div className="grid grid-cols-2 gap-2">
                {MOCK_SEARCH_RESULTS.posts.map(post => (
                  <Link
                    key={post.id}
                    to={`/post/${post.id}`}
                    className="group relative aspect-square rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <p className="text-xs font-medium truncate">{post.title}</p>
                      <p className="text-xs opacity-80 mt-0.5">❤️ {post.likes}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
