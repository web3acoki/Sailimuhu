import { Outlet, NavLink, useLocation } from "react-router";
import { useLayoutEffect, useRef } from "react";
import { Home, Map, Sparkles, User } from "lucide-react";
import { clsx } from "clsx";
import { Toaster } from "sonner";

export function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  /** 子路由切换时把主滚动区回到顶部，避免从长列表底部点进新页只看到空白 */
  useLayoutEffect(() => {
    const el = mainRef.current;
    if (el) el.scrollTop = 0;
  }, [location.pathname]);

  const navItems = [
    { to: "/", icon: Home, label: "首页" },
    { to: "/map", icon: Map, label: "导航" },
    { to: "/ai", icon: Sparkles, label: "AI写真" },
    { to: "/profile", icon: User, label: "我的" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <Toaster position="top-center" richColors />
      {/* Main Content */}
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto pb-16 scrollbar-hide"
      >
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-around items-center h-16 px-2 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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
