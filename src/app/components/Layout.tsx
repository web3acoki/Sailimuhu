import { Outlet, NavLink, useLocation } from "react-router";
import { useLayoutEffect, useRef } from "react";
import { Home, Map, Image as ImageIcon, User } from "lucide-react";
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

  const navItems: {
    to: string;
    icon: typeof Home;
    label: string;
    isActive?: (pathname: string) => boolean;
  }[] = [
    { to: "/", icon: Home, label: "首页" },
    { to: "/map", icon: Map, label: "导航" },
    {
      to: "/gallery",
      icon: ImageIcon,
      label: "光影档案",
      isActive: (pathname) =>
        pathname === "/gallery" || pathname.startsWith("/gallery/"),
    },
    { to: "/profile", icon: User, label: "我的" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
      <Toaster position="top-center" richColors />
      {/* Main Content */}
      <main
        ref={mainRef}
        className="scrollbar-hide flex-1 overflow-y-auto pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]"
      >
        <Outlet />
      </main>

      {/* 底部 Tab：对齐小程序习惯 — 固定栏、安全区、约 44px+ 热区、点击态 */}
      <nav className="absolute inset-x-0 bottom-0 z-50 border-t border-gray-200/90 bg-[#F7F7F7]/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md supports-[backdrop-filter]:bg-[#F7F7F7]/90">
        <div className="flex h-14 items-stretch justify-around px-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex min-h-[48px] min-w-[3rem] flex-1 max-w-[5.5rem] flex-col items-center justify-center gap-0.5 rounded-lg transition-[color,transform,background-color] duration-150 active:scale-[0.97] active:bg-black/[0.05]",
                  (item.isActive ? item.isActive(location.pathname) : isActive)
                    ? "text-primary"
                    : "text-gray-500 active:text-gray-700",
                )
              }
            >
              {({ isActive }) => {
                const active = item.isActive
                  ? item.isActive(location.pathname)
                  : isActive;
                return (
                  <>
                    <item.icon
                      className={clsx(
                        "mb-0.5 h-6 w-6 shrink-0",
                        active && "fill-primary/15",
                      )}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span className="text-[11px] font-medium leading-none">
                      {item.label}
                    </span>
                  </>
                );
              }}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
