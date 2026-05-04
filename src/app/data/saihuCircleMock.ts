export type CircleTab = "latest" | "hot";

export type CirclePost = {
  id: number;
  user: string;
  avatar: string;
  image: string;
  content: string;
  likes: number;
  location: string;
  /** Tailwind height class for masonry variety */
  imageHeightClass: string;
  tag?: string;
};

/** 赛湖圈子配图：湖泊、草原、旅拍人像等（与 mock 文案场景一致，可整批替换） */
export const CIRCLE_POSTS: CirclePost[] = [
  {
    id: 1,
    user: "赛湖初见·晓晓",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80",
    content: "蓝冰仙子打卡成功！冬日的赛里木湖简直是人间仙境。",
    likes: 342,
    location: "克勒涌珠",
    imageHeightClass: "h-44",
    tag: "#蓝冰季",
  },
  {
    id: 2,
    user: "风光猎人·阿迪力",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=600&q=80",
    content: "今日份的赛湖天鹅，早晨光线最好的时候抓拍到的。",
    likes: 891,
    location: "松树头",
    imageHeightClass: "h-56",
  },
  {
    id: 3,
    user: "北疆旅拍·小周",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
    content: "环湖公路第一缕阳光，手机直出也很能打。",
    likes: 156,
    location: "点将台",
    imageHeightClass: "h-52",
    tag: "#环湖",
  },
  {
    id: 4,
    user: "约拍体验官·周周",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1665284776298-7d4f23b9e565?w=600&q=80",
    content: "约了认证摄影师拍湖景亲子照，精修超自然，底片全送家人都说像画报。",
    likes: 1204,
    location: "月亮湾",
    imageHeightClass: "h-48",
    tag: "#约拍返图",
  },
  {
    id: 5,
    user: "静湖摄影",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80",
    content: "镜面倒影拍摄参数分享，评论区交流。",
    likes: 567,
    location: "亲水滩",
    imageHeightClass: "h-60",
    tag: "#摄影教程",
  },
  {
    id: 6,
    user: "赛湖骑行客",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
    content: "秋季金黄草场与湖水同框，机位在果子沟大桥东侧。",
    likes: 223,
    location: "果子沟",
    imageHeightClass: "h-40",
  },
];

export function getPostsForTab(tab: CircleTab): CirclePost[] {
  const list = [...CIRCLE_POSTS];
  if (tab === "hot") {
    return list.sort((a, b) => b.likes - a.likes);
  }
  return list.sort((a, b) => a.id - b.id);
}
