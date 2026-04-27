import { useState } from "react";
import { ArrowLeft, Star, MapPin, CheckCircle2, ChevronRight, Info, Navigation } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { clsx } from "clsx";
import { format, addDays } from "date-fns";

const PACKAGES = [
  { id: 1, name: "单人·赛湖蓝冰精灵", price: 399, deposit: 99, desc: "包含1套服装/1小时拍摄/精修9张", type: "单人" },
  { id: 2, name: "双人·漫步松树头", price: 599, deposit: 199, desc: "包含2套服装/2小时拍摄/精修15张", type: "双人" },
];

const LAKE_LOCATIONS = [
  { id: 1, name: "克勒涌珠", segment: "1/10", distance: "5km", feature: "蓝冰秘境", icon: "🏔️", popular: true },
  { id: 2, name: "松树头", segment: "2/10", distance: "12km", feature: "松林倒影", icon: "🌲", popular: true },
  { id: 3, name: "西海天鹅栖息地", segment: "3/10", distance: "18km", feature: "天鹅湖", icon: "🦢", popular: false },
  { id: 4, name: "成吉思汗点将台", segment: "4/10", distance: "25km", feature: "草原全景", icon: "🏛️", popular: false },
  { id: 5, name: "三台海子", segment: "5/10", distance: "32km", feature: "高山湖泊", icon: "💧", popular: false },
  { id: 6, name: "赛里木湖北门", segment: "6/10", distance: "38km", feature: "主入口", icon: "🎫", popular: true },
  { id: 7, name: "东海湾", segment: "7/10", distance: "45km", feature: "日出圣地", icon: "🌅", popular: false },
  { id: 8, name: "蒙古包度假村", segment: "8/10", distance: "52km", feature: "民族风情", icon: "⛺", popular: false },
  { id: 9, name: "石头房子", segment: "9/10", distance: "58km", feature: "网红打卡", icon: "🏠", popular: true },
  { id: 10, name: "南门观景台", segment: "10/10", distance: "65km", feature: "全景视角", icon: "📸", popular: false }
];

export function PhotographerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[0]);
  const [selectedDate, setSelectedDate] = useState(0); // 0 = today, 1 = tomorrow
  const [selectedLocation, setSelectedLocation] = useState(LAKE_LOCATIONS[0]);

  const dates = [
    { label: "今天", date: new Date() },
    { label: "明天", date: addDays(new Date(), 1) },
    { label: format(addDays(new Date(), 2), "MM-dd"), date: addDays(new Date(), 2) },
  ];

  const handleBook = () => {
    navigate(`/payment/order_12345?pkg=${selectedPkg.id}&location=${selectedLocation.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="relative h-64">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent z-10" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img 
          src="https://images.unsplash.com/photo-1762708550141-2688121b9ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjBob2xkaW5nJTIwY2FtZXJhJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzcyNzg4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Photographer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="bg-white px-5 py-4 rounded-b-3xl shadow-sm relative z-20 -mt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              王摄·风光专精
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </h1>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> 常驻：赛里木湖北门 / 克勒涌珠
            </p>
          </div>
          <div className="bg-accent/10 p-2 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <span className="font-bold">4.9</span>
            </div>
            <span className="text-[10px] text-gray-500">342评价</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {["官方认证", "押金保障", "人脸核验通过", "爽约包退"].map(tag => (
            <span key={tag} className="text-[10px] bg-blue-50 text-primary px-2 py-1 rounded border border-blue-100 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <div className="mt-4 px-5">
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full inline-block"></span>
          选择拍摄位置
          <span className="text-xs font-normal text-gray-500 ml-auto">环湖10个景点</span>
        </h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          {/* Selected Location Display */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20 mb-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
              {selectedLocation.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{selectedLocation.name}</h3>
                {selectedLocation.popular && (
                  <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full">热门</span>
                )}
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1">
                  <Navigation className="w-3 h-3" /> {selectedLocation.distance}
                </span>
                <span>•</span>
                <span>{selectedLocation.feature}</span>
              </p>
            </div>
            <div className="text-xs font-medium text-primary bg-white px-2 py-1 rounded-full">
              {selectedLocation.segment}
            </div>
          </div>

          {/* Location List */}
          <div className="max-h-64 overflow-y-auto scrollbar-hide space-y-2">
            {LAKE_LOCATIONS.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={clsx(
                  "w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all",
                  selectedLocation.id === location.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                )}
              >
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {location.icon}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={clsx(
                      "text-sm font-medium truncate",
                      selectedLocation.id === location.id ? "text-primary" : "text-gray-900"
                    )}>
                      {location.name}
                    </h4>
                    {location.popular && (
                      <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">HOT</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{location.feature}</p>
                </div>
                <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                  <span className="text-[10px] text-gray-400">{location.segment}</span>
                  <span className="text-[10px] text-gray-400">{location.distance}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 flex items-start gap-2">
              <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
              <span>摄影师会根据选择位置提前到达,请提前沟通确认集合时间</span>
            </p>
          </div>
        </div>
      </div>

      {/* Package Selection */}
      <div className="mt-4 px-5">
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full inline-block"></span>
          选择服务套餐
        </h2>
        <div className="flex flex-col gap-3">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => setSelectedPkg(pkg)}
              className={clsx(
                "border-2 rounded-xl p-4 transition-colors relative overflow-hidden bg-white",
                selectedPkg.id === pkg.id ? "border-primary" : "border-gray-100"
              )}
            >
              {selectedPkg.id === pkg.id && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-1 rounded-bl-lg font-medium">
                  已选
                </div>
              )}
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                <span className="text-red-500 font-bold text-lg"><span className="text-xs">¥</span>{pkg.price}</span>
              </div>
              <p className="text-xs text-gray-500">{pkg.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="mt-4 px-5 bg-white p-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">选择档期</h2>
        <div className="flex gap-3 mb-4">
          {dates.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(i)}
              className={clsx(
                "flex-1 py-2 rounded-lg border text-center transition-colors",
                selectedDate === i ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600"
              )}
            >
              <div className="text-xs font-medium">{d.label}</div>
            </button>
          ))}
        </div>
        
        {/* Mock Time Slots */}
        <div className="grid grid-cols-3 gap-2">
          {["09:00", "11:00", "14:00", "16:00", "18:00"].map((time, i) => (
            <button
              key={time}
              className={clsx(
                "py-2 text-sm rounded border",
                i === 2 ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100"
              )}
            >
              {time}
            </button>
          ))}
          <button className="py-2 text-sm rounded border border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed">
            已满
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between z-30">
        <div>
          <div className="text-xs text-gray-500 mb-0.5">预约定金 (尾款交付后结)</div>
          <div className="text-red-500 font-bold text-xl"><span className="text-sm">¥</span>{selectedPkg.deposit}</div>
        </div>
        <button 
          onClick={handleBook}
          className="bg-primary text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-primary/30 flex items-center gap-2"
        >
          立即预约 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
