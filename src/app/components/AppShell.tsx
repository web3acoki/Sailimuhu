import { Outlet } from "react-router";
import { useCallback, useState } from "react";
import { SplashScreen } from "./SplashScreen";

export function AppShell() {
  const [showSplash, setShowSplash] = useState(true);

  const handleDone = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <Outlet />
      {showSplash ? <SplashScreen seconds={5} onDone={handleDone} /> : null}
    </>
  );
}

