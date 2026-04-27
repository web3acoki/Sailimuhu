import { useEffect, useMemo, useRef, useState } from "react";
import splashImageUrl from "../../assets/splash/sailimu.jpg";

type SplashScreenProps = {
  seconds: number;
  onDone: () => void;
};

export function SplashScreen({ seconds, onDone }: SplashScreenProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.floor(seconds)));
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (remaining <= 0) {
      doneRef.current();
      return;
    }

    const timer = window.setInterval(() => {
      setRemaining((s) => Math.max(0, s - 1));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [remaining]);

  const skipLabel = useMemo(() => `跳过 ${remaining}s`, [remaining]);

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black"
      role="dialog"
      aria-label="启动页"
      aria-modal="true"
    >
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={splashImageUrl}
        alt="赛里木湖风景"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />

      <div className="relative h-full max-w-md mx-auto">
        <button
          type="button"
          onClick={onDone}
          className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/25 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label={skipLabel}
        >
          <span>{skipLabel}</span>
        </button>

        <div className="absolute bottom-10 left-0 right-0 px-6">
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/15">
            <div className="text-white">
              <div className="text-lg font-semibold tracking-wide">赛里木湖</div>
              <div className="mt-1 text-sm text-white/85">
                清澈、辽阔、安静。{remaining}s 后进入应用
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

