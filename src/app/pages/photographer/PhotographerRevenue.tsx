import { ChevronLeft, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router";

const REVENUE_DATA = [
  { month: "1月", amount: 8500 },
  { month: "2月", amount: 9200 },
  { month: "3月", amount: 10500 },
  { month: "4月", amount: 12580 }
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    type: "income",
    title: "订单收入",
    client: "晓晓",
    orderId: "202604271430",
    amount: 1024,
    time: "2026-04-27 15:30"
  },
  {
    id: 2,
    type: "income",
    title: "订单收入",
    client: "小美",
    orderId: "202604261120",
    amount: 400,
    time: "2026-04-26 16:20"
  },
  {
    id: 3,
    type: "withdraw",
    title: "提现",
    bank: "招商银行(****1234)",
    amount: -5000,
    time: "2026-04-25 10:15"
  },
  {
    id: 4,
    type: "income",
    title: "订单收入",
    client: "娜扎",
    orderId: "202604201145",
    amount: 2624,
    time: "2026-04-20 17:50"
  }
];

export function PhotographerRevenue() {
  const navigate = useNavigate();
  const maxAmount = Math.max(...REVENUE_DATA.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent px-5 py-4 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">收益中心</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <Wallet className="w-4 h-4" />
            <span>当前余额</span>
          </div>
          <div className="text-4xl font-bold text-white mb-4">¥18,360</div>
          <div className="flex gap-3">
            <button className="flex-1 py-2 bg-white text-primary rounded-full text-sm font-medium hover:bg-white/90">
              提现
            </button>
            <button className="flex-1 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 border border-white/30">
              明细
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-gray-900">¥12,580</div>
              <div className="text-xs text-gray-500 mt-1">本月收益</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+23%</span>
              </div>
            </div>
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-gray-900">28</div>
              <div className="text-xs text-gray-500 mt-1">本月订单</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-gray-900">¥449</div>
              <div className="text-xs text-gray-500 mt-1">客单价</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">收益趋势</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-end justify-between h-40 gap-2">
            {REVENUE_DATA.map((data, idx) => {
              const height = (data.amount / maxAmount) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-primary">¥{(data.amount / 1000).toFixed(1)}k</div>
                  <div
                    className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-500">{data.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5 mt-6">
        <h2 className="text-sm font-bold text-gray-900 mb-3">最近交易</h2>
        <div className="space-y-2">
          {RECENT_TRANSACTIONS.map(transaction => (
            <div key={transaction.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowDownRight className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{transaction.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {transaction.type === "income"
                        ? `客户: ${transaction.client}`
                        : transaction.bank}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-base font-bold ${
                      transaction.type === "income" ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : ""}¥{Math.abs(transaction.amount)}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{transaction.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
