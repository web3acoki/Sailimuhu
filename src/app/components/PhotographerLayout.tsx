import { Outlet, NavLink } from "react-router";
import { Home, FileText, Wallet, User } from "lucide-react";
import { clsx } from "clsx";

export function PhotographerLayout() {
  const navItems = [
    { to: "/photographer-center", icon: Home, label: "工作台" },
    { to: "/photographer-center/orders", icon: FileText, label: "订单" },
    { to: "/photographer-center/revenue", icon: Wallet, label: "收益" },
    { to: "/photographer-center/profile", icon: User, label: "我的" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16 scrollbar-hide">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around items-center h-16 px-2 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/photographer-center"}
            className={({ isActive }) =>
              clsx(
                "flex flex-col items-center justify-center w-16 h-full transition-colors",
                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={clsx("w-6 h-6 mb-1", isActive && "fill-primary/20")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
