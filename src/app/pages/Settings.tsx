import { ChevronLeft, ChevronRight, User, Lock, HelpCircle, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Settings() {
  const navigate = useNavigate();

  const handleComingSoon = (feature: string) => {
    toast.info(`${feature}功能开发中`, {
      description: "敬请期待",
      duration: 2000
    });
  };

  const settingsGroups = [
    {
      title: "账号设置",
      items: [
        { icon: User, label: "个人信息", value: "186****3948", action: "profile" },
        { icon: Lock, label: "账号安全", value: "修改密码", action: "security" }
      ]
    },
    {
      title: "其他",
      items: [
        { icon: FileText, label: "用户协议", action: "agreement" },
        { icon: FileText, label: "隐私政策", action: "privacy" },
        { icon: HelpCircle, label: "帮助与反馈", action: "help" },
        { icon: FileText, label: "关于赛湖镜界", value: "v1.0.0", action: "about" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">设置</h1>
      </div>

      {/* Settings Groups */}
      <div className="px-5 mt-6 space-y-4">
        {settingsGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h2 className="text-xs font-medium text-gray-500 mb-2 px-1">{group.title}</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    onClick={() => handleComingSoon(item.label)}
                    className="w-full flex items-center justify-between p-4 border-b border-gray-50 last:border-b-0 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-xs text-gray-400">{item.value}</span>}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-5 mt-8">
        <button
          onClick={() => {
            if (confirm("确定要退出登录吗？")) {
              toast.success("已退出登录");
              setTimeout(() => navigate("/"), 1000);
            }
          }}
          className="w-full py-3 bg-white text-red-500 font-medium rounded-full shadow-sm border border-gray-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>
    </div>
  );
}
