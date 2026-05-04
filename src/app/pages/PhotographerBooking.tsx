import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Info,
  MapPin,
  Navigation,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { clsx } from "clsx";
import { addDays, format } from "date-fns";
import { getPhotographer } from "../data/photographersMock";

const PACKAGES = [
  {
    id: 1,
    name: "单人 · 赛湖蓝冰精灵",
    price: 399,
    deposit: 99,
    desc: "包含1套服装/1小时拍摄/精修9张",
    type: "单人",
  },
  {
    id: 2,
    name: "双人 · 漫步松树头",
    price: 599,
    deposit: 199,
    desc: "包含2套服装/2小时拍摄/精修15张",
    type: "双人",
  },
];

const LAKE_LOCATIONS = [
  {
    id: 1,
    name: "克勒涌珠",
    segment: "1/10",
    distance: "5km",
    feature: "蓝冰秘境",
    icon: "🏔️",
    popular: true,
  },
  {
    id: 2,
    name: "松树头",
    segment: "2/10",
    distance: "12km",
    feature: "松林倒影",
    icon: "🌲",
    popular: true,
  },
  {
    id: 3,
    name: "西海天鹅栖息地",
    segment: "3/10",
    distance: "18km",
    feature: "天鹅湖",
    icon: "🦢",
    popular: false,
  },
  {
    id: 4,
    name: "成吉思汗点将台",
    segment: "4/10",
    distance: "25km",
    feature: "草原全景",
    icon: "🏛️",
    popular: false,
  },
  {
    id: 5,
    name: "三台海子",
    segment: "5/10",
    distance: "32km",
    feature: "高山湖泊",
    icon: "💧",
    popular: false,
  },
  {
    id: 6,
    name: "赛里木湖北门",
    segment: "6/10",
    distance: "38km",
    feature: "主入口",
    icon: "🎫",
    popular: true,
  },
  {
    id: 7,
    name: "东海湾",
    segment: "7/10",
    distance: "45km",
    feature: "日出圣地",
    icon: "🌅",
    popular: false,
  },
  {
    id: 8,
    name: "蒙古包度假村",
    segment: "8/10",
    distance: "52km",
    feature: "民族风情",
    icon: "⛺",
    popular: false,
  },
  {
    id: 9,
    name: "石头房子",
    segment: "9/10",
    distance: "58km",
    feature: "网红打卡",
    icon: "🏠",
    popular: true,
  },
  {
    id: 10,
    name: "南门观景台",
    segment: "10/10",
    distance: "65km",
    feature: "全景视角",
    icon: "📸",
    popular: false,
  },
];

export function PhotographerBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const photographer = getPhotographer(id);
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[0]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(LAKE_LOCATIONS[0]);

  const dates = [
    { label: "今天", date: new Date() },
    { label: "明天", date: addDays(new Date(), 1) },
    {
      label: format(addDays(new Date(), 2), "MM-dd"),
      date: addDays(new Date(), 2),
    },
  ];

  const handleBook = () => {
    navigate(
      `/payment/order_12345?pkg=${selectedPkg.id}&location=${selectedLocation.id}&photographer=${photographer.id}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-100 bg-white px-4 pt-safe">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="-ml-2 p-2 text-gray-700"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold text-gray-900">
            约拍 · {photographer.name}
          </h1>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-medium text-accent">
              {photographer.rating}
            </span>
            <span>· 月售 {photographer.orders}</span>
          </p>
        </div>
      </div>

      <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <img
          src={photographer.avatar}
          alt={photographer.name}
          className="h-14 w-14 rounded-full border border-gray-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center gap-1.5 text-base font-bold text-gray-900">
            <span className="truncate">{photographer.name}</span>
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
            <MapPin className="h-3 w-3" /> 常驻：赛里木湖北门 / 克勒涌珠
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["官方认证", "押金保障", "人脸核验", "爽约包退"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] text-primary"
              >
                <CheckCircle2 className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 px-5">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
          <span className="inline-block h-4 w-1 rounded-full bg-primary" />
          选择拍摄位置
          <span className="ml-auto text-xs font-normal text-gray-500">
            环湖10个景点
          </span>
        </h2>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
              {selectedLocation.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">
                  {selectedLocation.name}
                </h3>
                {selectedLocation.popular ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">
                    热门
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Navigation className="h-3 w-3" /> {selectedLocation.distance}
                </span>
                <span>•</span>
                <span>{selectedLocation.feature}</span>
              </p>
            </div>
            <div className="rounded-full bg-white px-2 py-1 text-xs font-medium text-primary">
              {selectedLocation.segment}
            </div>
          </div>

          <div className="scrollbar-hide max-h-64 space-y-2 overflow-y-auto">
            {LAKE_LOCATIONS.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => setSelectedLocation(location)}
                className={clsx(
                  "flex w-full items-center gap-3 rounded-lg border p-2.5 transition-all",
                  selectedLocation.id === location.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50",
                )}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-lg">
                  {location.icon}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h4
                      className={clsx(
                        "truncate text-sm font-medium",
                        selectedLocation.id === location.id
                          ? "text-primary"
                          : "text-gray-900",
                      )}
                    >
                      {location.name}
                    </h4>
                    {location.popular ? (
                      <span className="flex-shrink-0 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] text-white">
                        HOT
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500">{location.feature}</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                  <span className="text-[10px] text-gray-400">
                    {location.segment}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {location.distance}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-2">
            <p className="flex items-start gap-2 text-xs text-blue-700">
              <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span>摄影师会根据选择位置提前到达,请提前沟通确认集合时间</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5">
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
          <span className="inline-block h-4 w-1 rounded-full bg-primary" />
          选择服务套餐
        </h2>
        <div className="flex flex-col gap-3">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPkg(pkg)}
              className={clsx(
                "relative w-full overflow-hidden rounded-xl border-2 bg-white p-4 text-left transition-colors",
                selectedPkg.id === pkg.id
                  ? "border-primary"
                  : "border-gray-100",
              )}
            >
              {selectedPkg.id === pkg.id ? (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-2 py-1 text-[10px] font-medium text-white">
                  已选
                </div>
              ) : null}
              <div className="mb-1 flex items-start justify-between">
                <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                <span className="text-lg font-bold text-red-500">
                  <span className="text-xs">¥</span>
                  {pkg.price}
                </span>
              </div>
              <p className="text-xs text-gray-500">{pkg.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-white p-4 px-5">
        <h2 className="mb-3 text-base font-bold text-gray-900">选择档期</h2>
        <div className="mb-4 flex gap-3">
          {dates.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setSelectedDate(i)}
              className={clsx(
                "flex-1 rounded-lg border py-2 text-center transition-colors",
                selectedDate === i
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 text-gray-600",
              )}
            >
              <div className="text-xs font-medium">{d.label}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["09:00", "11:00", "14:00", "16:00", "18:00"].map((time, i) => (
            <button
              key={time}
              type="button"
              className={clsx(
                "rounded border py-2 text-sm",
                i === 2
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100",
              )}
            >
              {time}
            </button>
          ))}
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded border border-gray-100 bg-gray-50 py-2 text-sm text-gray-300"
          >
            已满
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-30 flex w-full items-center justify-between border-t border-gray-100 bg-white p-4 pb-safe">
        <div>
          <div className="mb-0.5 text-xs text-gray-500">
            预约定金 (尾款交付后结)
          </div>
          <div className="text-xl font-bold text-red-500">
            <span className="text-sm">¥</span>
            {selectedPkg.deposit}
          </div>
        </div>
        <button
          type="button"
          onClick={handleBook}
          className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/30"
        >
          立即预约 <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
