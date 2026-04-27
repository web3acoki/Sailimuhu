import { ChevronLeft, Grid3x3, List, Download, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

const MOCK_GALLERY = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=600",
    title: "蓝冰仙境",
    photographer: "王摄",
    category: "风光",
    likes: 1240,
    downloads: 342,
    tags: ["蓝冰", "克勒涌珠"]
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1575201079349-225d33422ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBzd2FuJTIwbGFrZXxlbnwxfHx8fDE3NzcyNzg4ODd8MA&ixlib=rb-4.1.0&q=80&w=600",
    title: "天鹅湖晨曦",
    photographer: "古丽",
    category: "生态",
    likes: 891,
    downloads: 256,
    tags: ["天鹅", "日出"]
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1746087848758-45581f239fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwaWNlJTIwbGFrZSUyMHdpbnRlciUyMHNub3d8ZW58MXx8fHwxNzc3Mjc4ODc0fDA&ixlib=rb-4.1.0&q=80&w=600",
    title: "冬日蓝宝石",
    photographer: "阿迪力",
    category: "风光",
    likes: 2103,
    downloads: 567,
    tags: ["冬季", "蓝冰"]
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBsYWtlJTIwd2ludGVyJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4ODZ8MA&ixlib=rb-4.1.0&q=80&w=600",
    title: "冰封世界",
    photographer: "李明",
    category: "风光",
    likes: 1567,
    downloads: 423,
    tags: ["冰雪", "自然"]
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBkcmVzc3xlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=600",
    title: "艾德莱斯绸之美",
    photographer: "阿丽娜",
    category: "人像",
    likes: 987,
    downloads: 198,
    tags: ["民族服饰", "人像"]
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1464207687429-7505649dae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNub3d8ZW58MXx8fHwxNzc3Mjc4ODg2fDA&ixlib=rb-4.1.0&q=80&w=600",
    title: "雪山倒影",
    photographer: "张伟",
    category: "风光",
    likes: 1456,
    downloads: 389,
    tags: ["雪山", "倒影"]
  }
];

const CATEGORIES = ["全部", "风光", "人像", "生态", "星空", "民俗"];

export function Gallery() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState("全部");

  const filteredGallery = category === "全部"
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter(item => item.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">风光图库</h1>
        </div>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="text-gray-700"
        >
          {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white px-5 py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              category === cat
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {viewMode === "grid" ? (
        <div className="px-3 mt-3">
          <div className="grid grid-cols-2 gap-2">
            {filteredGallery.map(item => (
              <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden shadow-sm">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-sm font-medium mb-1 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="opacity-80">@{item.photographer}</span>
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {item.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 mt-4 space-y-3">
          {filteredGallery.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="flex gap-3 p-3">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">@{item.photographer}</p>
                  <div className="flex gap-2 mb-2">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {item.downloads}
                    </span>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
