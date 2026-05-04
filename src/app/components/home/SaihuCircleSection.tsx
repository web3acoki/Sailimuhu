import { useState } from "react";
import { Link } from "react-router";
import Masonry from "react-responsive-masonry";
import { Heart, MapPin, Search, Plus } from "lucide-react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  type CircleTab,
  getPostsForTab,
  type CirclePost,
} from "../../data/saihuCircleMock";

function CirclePostCard({ post }: { post: CirclePost }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 block mb-3"
    >
      <div className="relative">
        <img
          src={post.image}
          alt=""
          className={`w-full object-cover rounded-t-xl ${post.imageHeightClass}`}
        />
        {post.tag ? (
          <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {post.tag}
          </span>
        ) : null}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent h-16 pointer-events-none rounded-b-none" />
        <span className="absolute bottom-2 right-2 text-[10px] text-white/95 flex items-center gap-0.5 drop-shadow">
          <MapPin className="w-3 h-3" />
          {post.location}
        </span>
      </div>
      <div className="p-2.5">
        <p className="text-xs text-gray-900 font-medium leading-snug line-clamp-2 mb-2">
          {post.content}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={post.avatar}
              alt=""
              className="w-6 h-6 rounded-full object-cover border border-gray-100 shrink-0"
            />
            <span className="text-[11px] text-gray-600 truncate">{post.user}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400 shrink-0">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-[11px]">{post.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SaihuCircleSection() {
  const [tab, setTab] = useState<CircleTab>("latest");

  return (
    <section className="mt-8 px-4 pb-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            赛湖圈子
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">笔记 · 用户 · 动态</p>
        </div>
        <label className="sr-only" htmlFor="circle-search">
          搜索笔记或用户
        </label>
        <Link
          to="/search"
          id="circle-search"
          className="flex items-center gap-1.5 bg-gray-100 rounded-full pl-3 pr-3 py-2 min-w-0 max-w-[52%] border border-gray-200/80"
        >
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs text-gray-400 truncate">搜索笔记 / 用户</span>
        </Link>
      </div>

      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as CircleTab)}
        className="w-full"
      >
        <TabsList className="w-full h-auto p-0 bg-transparent border-b border-gray-200 rounded-none justify-center gap-8 mb-3">
          {(
            [
              ["latest", "最新"],
              ["hot", "热门"],
              ["following", "关注"],
            ] as const
          ).map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent shadow-none flex-none px-0 pb-2 text-sm text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-bold"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="latest" className="mt-0">
          <Masonry columnsCount={2} gutter="10px">
            {getPostsForTab("latest").map((post) => (
              <CirclePostCard key={post.id} post={post} />
            ))}
          </Masonry>
        </TabsContent>
        <TabsContent value="hot" className="mt-0">
          <Masonry columnsCount={2} gutter="10px">
            {getPostsForTab("hot").map((post) => (
              <CirclePostCard key={post.id} post={post} />
            ))}
          </Masonry>
        </TabsContent>
        <TabsContent value="following" className="mt-0">
          <Masonry columnsCount={2} gutter="10px">
            {getPostsForTab("following").map((post) => (
              <CirclePostCard key={post.id} post={post} />
            ))}
          </Masonry>
        </TabsContent>
      </Tabs>

      <button
        type="button"
        aria-label="发布笔记"
        onClick={() => toast.message("发布功能敬请期待")}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-7 h-7" strokeWidth={2} />
      </button>
    </section>
  );
}
