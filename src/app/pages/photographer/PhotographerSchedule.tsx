import { ChevronLeft, Calendar as CalendarIcon, Plus, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

const SCHEDULE_DATA = {
  "2026-05-01": [
    { time: "09:00-11:00", client: "晓晓", status: "confirmed" },
    { time: "14:00-16:00", client: "小美", status: "confirmed" }
  ],
  "2026-05-03": [
    { time: "10:00-12:00", client: "娜扎", status: "pending" }
  ],
  "2026-05-05": [
    { time: "08:00-10:00", client: "李华", status: "confirmed" },
    { time: "15:00-17:00", client: "王芳", status: "confirmed" }
  ]
};

export function PhotographerSchedule() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const daySchedule = SCHEDULE_DATA[selectedDateKey] || [];

  const hasSchedule = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return SCHEDULE_DATA[dateKey] && SCHEDULE_DATA[dateKey].length > 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">档期管理</h1>
        <button className="ml-auto w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar */}
      <div className="px-5 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">
              {format(currentDate, "yyyy年MM月")}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentDate(addDays(currentDate, -30))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentDate(addDays(currentDate, 30))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                ›
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["日", "一", "二", "三", "四", "五", "六"].map(day => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((date, idx) => {
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              const hasEvent = hasSchedule(date);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative ${
                    isSelected
                      ? "bg-primary text-white"
                      : isToday
                      ? "bg-accent/10 text-accent font-medium"
                      : isSameMonth(date, currentDate)
                      ? "text-gray-900 hover:bg-gray-50"
                      : "text-gray-300"
                  }`}
                >
                  {format(date, "d")}
                  {hasEvent && (
                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      isSelected ? "bg-white" : "bg-primary"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Schedule */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          {format(selectedDate, "M月d日")} 的档期
        </h2>

        {daySchedule.length > 0 ? (
          <div className="space-y-3">
            {daySchedule.map((schedule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-gray-900">{schedule.time}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      schedule.status === "confirmed"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {schedule.status === "confirmed" ? "已确认" : "待确认"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 font-medium">
                    {schedule.client[0]}
                  </div>
                  <span className="text-sm text-gray-700">客户: {schedule.client}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">暂无档期安排</p>
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90">
              添加档期
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 mt-6">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 text-white">
          <h3 className="text-sm font-medium mb-3 opacity-90">本月统计</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold">28</div>
              <div className="text-xs opacity-80 mt-1">总订单</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs opacity-80 mt-1">已完成</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs opacity-80 mt-1">进行中</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
