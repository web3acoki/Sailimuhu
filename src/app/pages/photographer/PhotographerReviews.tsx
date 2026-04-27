import { ChevronLeft, Star, ThumbsUp, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

const MOCK_REVIEWS = [
  {
    id: 1,
    client: "晓晓",
    avatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?w=100",
    rating: 5,
    date: "2026-04-27",
    service: "单人·赛湖蓝冰精灵",
    content: "王摄老师太专业了！从选景到拍摄指导都非常细致，出片效果超出预期。蓝冰倒影拍得太美了，朋友们都说像大片。后期调色也很用心，保留了赛湖的自然色彩。强烈推荐！",
    images: [
      "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?w=300",
      "https://images.unsplash.com/photo-1746087848758-45581f239fd8?w=300"
    ],
    tags: ["很专业", "出片快", "态度好"],
    helpful: 12
  },
  {
    id: 2,
    client: "娜扎",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    rating: 5,
    date: "2026-04-20",
    service: "艾德莱斯绸礼服套餐",
    content: "拍摄过程很愉快，摄影师很会调动情绪，让我放松自然。艾德莱斯绸的色彩和光影把握得特别好，每一张都很有感觉。成片质量高，后期也很精细。",
    images: [
      "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=300"
    ],
    tags: ["构图棒", "光线运用好", "值得推荐"],
    helpful: 8
  },
  {
    id: 3,
    client: "小美",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    rating: 4,
    date: "2026-04-15",
    service: "双人·漫步松树头",
    content: "整体不错，摄影师很敬业，早上很早就到了拍摄地等我们。构图和角度选择都很专业，就是后期交付比预期晚了一天。",
    images: [],
    tags: ["很专业", "性价比高"],
    helpful: 5
  }
];

export function PhotographerReviews() {
  const navigate = useNavigate();

  const averageRating = (
    MOCK_REVIEWS.reduce((sum, review) => sum + review.rating, 0) / MOCK_REVIEWS.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">评价管理</h1>
      </div>

      {/* Stats Card */}
      <div className="px-5 mt-4">
        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-90 mb-1">综合评分</div>
              <div className="text-4xl font-bold">{averageRating}</div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 fill-white" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{MOCK_REVIEWS.length}</div>
              <div className="text-xs opacity-80 mt-1">总评价</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs opacity-80 mt-1">好评率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {MOCK_REVIEWS.reduce((sum, r) => sum + r.helpful, 0)}
              </div>
              <div className="text-xs opacity-80 mt-1">有用数</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">全部评价</h2>
        <div className="space-y-3">
          {MOCK_REVIEWS.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              {/* User Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.client}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{review.client}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{review.service}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.content}</p>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
                  {review.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review ${idx + 1}`}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {review.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary">
                  <ThumbsUp className="w-3 h-3" />
                  有用 ({review.helpful})
                </button>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <MessageCircle className="w-3 h-3" />
                  回复评价
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
