import { ChevronLeft, MapPin, Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router";
import { useState } from "react";

const MOCK_POST = {
  id: 1,
  user: "赛湖初见·晓晓",
  userId: 123,
  avatar: "https://images.unsplash.com/photo-1525060539736-979c838b7072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3J0cmFpdCUyMGFzaWFuJTIwZmVtYWxlJTIwc21pbGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=200",
  images: [
    "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwc25vdyUyMG1vdW50YWluJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4Nzh8MA&ixlib=rb-4.1.0&q=80&w=800",
    "https://images.unsplash.com/photo-1746087848758-45581f239fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwaWNlJTIwbGFrZSUyMHdpbnRlciUyMHNub3d8ZW58MXx8fHwxNzc3Mjc4ODc0fDA&ixlib=rb-4.1.0&q=80&w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBsYWtlJTIwd2ludGVyJTIwYmx1ZXxlbnwxfHx8fDE3NzcyNzg4ODZ8MA&ixlib=rb-4.1.0&q=80&w=800"
  ],
  content: "蓝冰仙子打卡成功！冬日的赛里木湖简直是人间仙境❄️\n\n今天跟着@王摄·旅拍老炮儿 拍了一整个上午，专业度真的没得说！从选景到构图到光线运用，每一个细节都照顾得特别好。\n\n📍拍摄地点：克勒涌珠\n⏰最佳时段：早上8-10点，光线最柔和\n💡穿搭建议：白色、浅蓝色系最出片\n❗注意事项：一定要做好保暖！风真的超级大\n\n成片太美了，后期调色也很自然。推荐给想拍蓝冰写真的姐妹们！",
  likes: 342,
  comments: 28,
  shares: 15,
  isLiked: false,
  location: "克勒涌珠",
  tags: ["#蓝冰仙子", "#赛里木湖", "#冬日写真"],
  publishTime: "2026-04-25 15:30",
  photographerId: 1,
  photographerName: "王摄·旅拍老炮儿"
};

const MOCK_COMMENTS = [
  {
    id: 1,
    user: "草原之花·娜扎",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHBob3RvZ3JhcGhlcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=100",
    content: "太美了！请问王摄怎么约？",
    time: "2小时前",
    likes: 12
  },
  {
    id: 2,
    user: "镜头捕手·阿力木",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=100",
    content: "构图和光影处理都很到位👍",
    time: "5小时前",
    likes: 8
  },
  {
    id: 3,
    user: "旅行者·小美",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZlbWFsZSUyMHNtaWxpbmd8ZW58MXx8fHwxNzc3Mjc4ODc1fDA&ixlib=rb-4.1.0&q=80&w=100",
    content: "下个月要去，已经收藏了这篇攻略！",
    time: "1天前",
    likes: 5
  }
];

export function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(MOCK_POST);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">动态详情</h1>
        <button className="text-gray-700">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 px-5 py-4">
        <img
          src={post.avatar}
          alt={post.user}
          className="h-12 w-12 rounded-full border border-gray-100 object-cover"
        />
        <div>
          <h3 className="text-sm font-medium text-gray-900">{post.user}</h3>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" /> {post.location}
            </p>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{post.publishTime}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={post.images[currentImageIndex]}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
        {post.images.length > 1 && (
          <>
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{post.images.length}
            </div>
            <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide">
              {post.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart className={`w-6 h-6 ${post.isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
            <Share2 className="w-6 h-6" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-primary bg-blue-50 px-2 py-1 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>
        {post.photographerId && (
          <Link
            to={`/photographer/${post.photographerId}`}
            className="mt-4 flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <Camera className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <div className="text-xs text-gray-500">拍摄摄影师</div>
              <div className="text-sm font-medium text-gray-900 mt-0.5">@{post.photographerName}</div>
            </div>
            <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
          </Link>
        )}
      </div>

      {/* Comments Section */}
      <div className="px-5 py-4 bg-gray-50">
        <h3 className="text-sm font-bold text-gray-900 mb-4">评论 {post.comments}</h3>
        <div className="space-y-4">
          {MOCK_COMMENTS.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-xs font-medium text-gray-900 mb-1">{comment.user}</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex items-center gap-3 mt-2 px-1">
                  <span className="text-xs text-gray-400">{comment.time}</span>
                  <button className="text-xs text-gray-400 hover:text-primary">回复</button>
                  <button className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {comment.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="说点什么..."
            className="flex-1 px-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            disabled={!comment.trim()}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const Camera = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
