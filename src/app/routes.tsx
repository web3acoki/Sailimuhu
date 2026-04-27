import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MapNavigate } from "./pages/MapNavigate";
import { AIStudio } from "./pages/AIStudio";
import { Profile } from "./pages/Profile";
import { PhotographerDetail } from "./pages/PhotographerDetail";
import { Payment } from "./pages/Payment";
import { OrderList } from "./pages/OrderList";
import { OrderDetail } from "./pages/OrderDetail";
import { PostDetail } from "./pages/PostDetail";
import { Gallery } from "./pages/Gallery";
import { Notifications } from "./pages/Notifications";
import { Settings } from "./pages/Settings";
import { Search } from "./pages/Search";
import { Review } from "./pages/Review";
import { PhotographerApply } from "./pages/PhotographerApply";
import { NotFound } from "./pages/NotFound";
import { PhotographerLayout } from "./components/PhotographerLayout";
import { PhotographerCenter } from "./pages/photographer/PhotographerCenter";
import { PhotographerOrders } from "./pages/photographer/PhotographerOrders";
import { PhotographerRevenue } from "./pages/photographer/PhotographerRevenue";
import { PhotographerSchedule } from "./pages/photographer/PhotographerSchedule";
import { PhotographerReviews } from "./pages/photographer/PhotographerReviews";
import { PhotographerProfile } from "./pages/photographer/PhotographerProfile";
import { PhotographerOrderDetail } from "./pages/photographer/PhotographerOrderDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "map", Component: MapNavigate },
      { path: "ai", Component: AIStudio },
      { path: "profile", Component: Profile },
      { path: "gallery", Component: Gallery },
      { path: "notifications", Component: Notifications },
      { path: "settings", Component: Settings },
      { path: "search", Component: Search },
      { path: "orders", Component: OrderList },
    ],
  },
  {
    path: "/photographer/:id",
    Component: PhotographerDetail,
  },
  {
    path: "/payment/:orderId",
    Component: Payment,
  },
  {
    path: "/order/:orderId",
    Component: OrderDetail,
  },
  {
    path: "/post/:postId",
    Component: PostDetail,
  },
  {
    path: "/review/:orderId",
    Component: Review,
  },
  {
    path: "/photographer-apply",
    Component: PhotographerApply,
  },
  {
    path: "/photographer-center",
    Component: PhotographerLayout,
    children: [
      { index: true, Component: PhotographerCenter },
      { path: "orders", Component: PhotographerOrders },
      { path: "revenue", Component: PhotographerRevenue },
      { path: "profile", Component: PhotographerProfile },
    ],
  },
  {
    path: "/photographer/schedule",
    Component: PhotographerSchedule,
  },
  {
    path: "/photographer/reviews",
    Component: PhotographerReviews,
  },
  {
    path: "/photographer/order/:orderId",
    Component: PhotographerOrderDetail,
  },
  {
    path: "*",
    Component: NotFound,
  }
]);
