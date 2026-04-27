import { ChevronLeft, Star, Camera, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

const MOCK_ORDER_INFO = {
  id: "202604201145",
  photographerName: "阿丽娜·民族风专拍",
  photographerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHBob3RvZ3JhcGhlcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=200",
  service: "艾德莱斯绸礼服套餐",
  thumbnail: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBkcmVzc3xlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=300"
};

const RATING_ITEMS = [
  { key: "professionalism", label: "专业度", icon: Camera },
  { key: "communication", label: "沟通", icon: Camera },
  { key: "quality", label: "成片质量", icon: Camera },
  { key: "service", label: "服务态度", icon: Camera }
];

const QUICK_TAGS = [
  "很专业", "出片快", "态度好", "构图棒",
  "光线运用好", "后期精修", "性价比高", "值得推荐"
];

export function Review() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [overallRating, setOverallRating] = useState(5);
  const [itemRatings, setItemRatings] = useState({
    professionalism: 5,
    communication: 5,
    quality: 5,
    service: 5
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleItemRating = (key: string, rating: number) => {
    setItemRatings(prev => ({ ...prev, [key]: rating }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    // Submit review logic here
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">评价服务</h1>
      </div>

      {/* Order Info */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <img
          src={MOCK_ORDER_INFO.thumbnail}
          alt={MOCK_ORDER_INFO.service}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{MOCK_ORDER_INFO.service}</h3>
          <div className="flex items-center gap-2 mt-1">
            <img
              src={MOCK_ORDER_INFO.photographerAvatar}
              alt={MOCK_ORDER_INFO.photographerName}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs text-gray-500">{MOCK_ORDER_INFO.photographerName}</span>
          </div>
        </div>
      </div>

      {/* Overall Rating */}
      <div className="bg-white mt-3 px-5 py-6">
        <h2 className="text-sm font-bold text-gray-900 mb-4 text-center">整体评分</h2>
        <div className="flex justify-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => setOverallRating(rating)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-10 h-10 ${
                  rating <= overallRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="text-center text-sm text-gray-500">
          {overallRating === 5 && "非常满意"}
          {overallRating === 4 && "满意"}
          {overallRating === 3 && "一般"}
          {overallRating === 2 && "不满意"}
          {overallRating === 1 && "很不满意"}
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="bg-white mt-3 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900 mb-4">详细评分</h2>
        <div className="space-y-4">
          {RATING_ITEMS.map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleItemRating(item.key, rating)}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        rating <= itemRatings[item.key]
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tags */}
      <div className="bg-white mt-3 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">快速标签</h2>
        <div className="flex flex-wrap gap-2">
          {QUICK_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="bg-white mt-3 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">评价内容</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="分享你的拍摄体验吧~(选填)"
          className="w-full h-32 p-3 bg-gray-50 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Upload Images */}
      <div className="bg-white mt-3 px-5 py-4">
        <h2 className="text-sm font-bold text-gray-900 mb-3">晒成片(选填)</h2>
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          {images.length < 9 && (
            <button className="w-20 h-20 bg-gray-50 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 flex-shrink-0">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-xs">上传</span>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">最多上传9张图片</p>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
        <button
          onClick={handleSubmit}
          disabled={!overallRating}
          className="w-full py-3 bg-primary text-white font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          提交评价
        </button>
      </div>
    </div>
  );
}
