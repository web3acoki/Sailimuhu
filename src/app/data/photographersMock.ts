export type PhotographerWork = {
  id: string;
  cover: string;
  title: string;
  topics: string[];
  location: string;
  likes: number;
  pinned?: boolean;
};

export type Photographer = {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  region: string;
  intro: string;
  rating: number;
  orders: number;
  price: number;
  specialty: string[];
  works: PhotographerWork[];
};

const COVER_BLUE_ICE =
  "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1080&q=80";
const COVER_GRASSLAND =
  "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1080&q=80";
const COVER_STAR =
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1080&q=80";
const COVER_SWAN =
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1080&q=80";
const COVER_AERIAL =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1080&q=80";
const COVER_PORTRAIT =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1080&q=80";
const COVER_DOC =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1080&q=80";
const COVER_FAMILY =
  "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=1080&q=80";

const W = (
  id: string,
  cover: string,
  title: string,
  topics: string[],
  location: string,
  likes: number,
  pinned = false,
): PhotographerWork => ({ id, cover, title, topics, location, likes, pinned });

export const PHOTOGRAPHERS: Photographer[] = [
  {
    id: "p1",
    name: "王摄·风光专精",
    avatar:
      "https://images.unsplash.com/photo-1762708550141-2688121b9ebd?w=200&q=80",
    cover: COVER_BLUE_ICE,
    region: "新疆·博尔塔拉",
    intro: "环湖驻点拍摄 5 年｜蓝冰人像/航拍合作｜约拍微信 saihu-wang",
    rating: 4.9,
    orders: 342,
    price: 399,
    specialty: ["蓝冰人像", "航拍", "擅长引导"],
    works: [
      W(
        "w_p1_1",
        "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=600&q=80",
        "赛湖蓝冰仙子｜人像约拍精修片",
        ["蓝冰人像", "我要上推荐"],
        "克勒涌珠",
        2480,
        true,
      ),
      W(
        "w_p1_2",
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
        "环湖航拍｜雪山倒影 4K 素材",
        ["航拍", "金牌摄影师"],
        "西海湾",
        1320,
      ),
      W(
        "w_p1_3",
        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=80",
        "蓝冰漫游 vlog｜带你看看真实赛湖",
        ["每日湖况", "成片实拍"],
        "北门冰面",
        986,
      ),
      W(
        "w_p1_4",
        "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=600&q=80",
        "情侣蓝冰主题｜冬日仪式感约拍",
        ["情侣写真", "蓝冰人像"],
        "克勒涌珠",
        1542,
      ),
    ],
  },
  {
    id: "p2",
    name: "阿依古丽·民族风",
    avatar:
      "https://images.unsplash.com/photo-1525060539736-979c838b7072?w=200&q=80",
    cover: COVER_GRASSLAND,
    region: "新疆·伊犁",
    intro: "民族服饰主题约拍｜艾德莱斯/哈萨克｜情绪流后期",
    rating: 4.8,
    orders: 215,
    price: 299,
    specialty: ["艾德莱斯", "情绪流", "草原写真"],
    works: [
      W(
        "w_p2_1",
        "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=600&q=80",
        "草原日出｜艾德莱斯民族写真",
        ["民族风", "我要上推荐"],
        "三台海子",
        1730,
        true,
      ),
      W(
        "w_p2_2",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80",
        "湖边风之恋｜情绪人像约拍",
        ["情绪流", "风光人像"],
        "西海湾",
        1126,
      ),
      W(
        "w_p2_3",
        "https://images.unsplash.com/photo-1488376739361-413a04ce5ad4?w=600&q=80",
        "毡房民俗｜草原家庭团拍合集",
        ["民族风", "家庭团拍"],
        "蒙古包度假村",
        842,
      ),
    ],
  },
  {
    id: "p3",
    name: "阿迪力·自然光",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    cover: COVER_SWAN,
    region: "新疆·博乐",
    intro: "天鹅生态/晨昏光｜慢门长焦｜随性抓拍",
    rating: 4.9,
    orders: 287,
    price: 359,
    specialty: ["天鹅生态", "晨昏光", "随性抓拍"],
    works: [
      W(
        "w_p3_1",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80",
        "天鹅家族｜冬日生态长焦",
        ["天鹅生态", "金牌摄影师"],
        "西海天鹅栖息地",
        2056,
        true,
      ),
      W(
        "w_p3_2",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80",
        "破晓金光｜环湖晨昏光人像",
        ["晨昏光", "人像约拍"],
        "东海湾",
        1304,
      ),
      W(
        "w_p3_3",
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&q=80",
        "环湖随手记｜慢门湖面长曝",
        ["纪实", "慢门"],
        "南门观景台",
        678,
      ),
    ],
  },
  {
    id: "p4",
    name: "古丽·星空胶片",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    cover: COVER_STAR,
    region: "新疆·乌鲁木齐",
    intro: "银河/夜景｜胶片质感｜深夜守候只为一张片",
    rating: 4.7,
    orders: 168,
    price: 459,
    specialty: ["银河", "夜景", "胶片质感"],
    works: [
      W(
        "w_p4_1",
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80",
        "赛湖银河｜整夜守候的拱桥",
        ["银河", "我要上推荐"],
        "成吉思汗点将台",
        1980,
        true,
      ),
      W(
        "w_p4_2",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80",
        "胶片调｜湖边晚风人像",
        ["胶片质感", "夜景"],
        "克勒涌珠",
        1102,
      ),
      W(
        "w_p4_3",
        "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=600&q=80",
        "星轨延时｜帐篷小灯一夜",
        ["星轨", "延时"],
        "三台海子",
        854,
      ),
    ],
  },
  {
    id: "p5",
    name: "李明·航拍视角",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    cover: COVER_AERIAL,
    region: "新疆·昌吉",
    intro: "持证航拍｜环湖大片｜雪山+湖面 4K 输出",
    rating: 4.8,
    orders: 256,
    price: 499,
    specialty: ["航拍", "环湖大片", "雪山"],
    works: [
      W(
        "w_p5_1",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
        "环湖一镜到底｜航拍合集",
        ["航拍", "金牌摄影师"],
        "环湖公路",
        2310,
        true,
      ),
      W(
        "w_p5_2",
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80",
        "雪山顶视角｜清晨第一缕光",
        ["雪山", "晨昏光"],
        "松树头",
        1488,
      ),
      W(
        "w_p5_3",
        "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=600&q=80",
        "婚纱航拍｜真正环湖大片",
        ["婚纱", "航拍"],
        "西海湾",
        1056,
      ),
    ],
  },
  {
    id: "p6",
    name: "静湖·人像写真",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    cover: COVER_PORTRAIT,
    region: "新疆·伊宁",
    intro: "蓝冰仙子/草原日出/情侣｜会引导内向 mm",
    rating: 4.9,
    orders: 412,
    price: 329,
    specialty: ["蓝冰仙子", "草原日出", "情侣"],
    works: [
      W(
        "w_p6_1",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&q=80",
        "蓝冰仙子｜白裙长发约拍精修",
        ["蓝冰人像", "我要上推荐"],
        "克勒涌珠",
        3120,
        true,
      ),
      W(
        "w_p6_2",
        "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=600&q=80",
        "草原日出｜情侣牵手剪影",
        ["情侣写真", "晨昏光"],
        "三台海子",
        1820,
      ),
      W(
        "w_p6_3",
        "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=600&q=80",
        "湖畔自然系｜温柔风约拍",
        ["人像约拍", "温柔风"],
        "石头房子",
        1462,
      ),
      W(
        "w_p6_4",
        "https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?w=600&q=80",
        "城堡氛围｜复古油画约拍",
        ["复古风", "情绪流"],
        "蒙古包度假村",
        964,
      ),
    ],
  },
  {
    id: "p7",
    name: "张伟·全境记录",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    cover: COVER_DOC,
    region: "新疆·博乐",
    intro: "环湖 vlog/纪实 5 年｜陪你完整跑一圈",
    rating: 4.6,
    orders: 132,
    price: 269,
    specialty: ["环湖vlog", "纪实", "随行记录"],
    works: [
      W(
        "w_p7_1",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
        "环湖一日｜纪实 vlog 合集",
        ["环湖vlog", "纪实"],
        "环湖公路",
        856,
        true,
      ),
      W(
        "w_p7_2",
        "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&q=80",
        "湖边手记｜每日湖况播报",
        ["每日湖况", "成片实拍"],
        "南门观景台",
        532,
      ),
      W(
        "w_p7_3",
        "https://images.unsplash.com/photo-1488376739361-413a04ce5ad4?w=600&q=80",
        "牧民日常｜真实毡房一日",
        ["纪实", "民族风"],
        "蒙古包度假村",
        412,
      ),
    ],
  },
  {
    id: "p8",
    name: "周周·亲子定格",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    cover: COVER_FAMILY,
    region: "新疆·乌鲁木齐",
    intro: "亲子/家庭团拍｜会逗娃｜湖边自然光",
    rating: 4.9,
    orders: 198,
    price: 349,
    specialty: ["亲子", "家庭团拍", "自然光"],
    works: [
      W(
        "w_p8_1",
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=600&q=80",
        "湖边一家三口｜自然光团拍",
        ["亲子", "我要上推荐"],
        "西海湾",
        1684,
        true,
      ),
      W(
        "w_p8_2",
        "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=600&q=80",
        "宝宝抓周｜户外纪念约拍",
        ["亲子", "纪念日"],
        "克勒涌珠",
        1120,
      ),
      W(
        "w_p8_3",
        "https://images.unsplash.com/photo-1502808777045-0bf91e8d1d2c?w=600&q=80",
        "三代同框｜家族环湖留念",
        ["家庭团拍", "纪实"],
        "南门观景台",
        778,
      ),
    ],
  },
];

export const getPhotographer = (id?: string): Photographer =>
  PHOTOGRAPHERS.find((p) => p.id === id) ?? PHOTOGRAPHERS[0];
