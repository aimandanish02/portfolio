"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface LocalTimeProps {
  timeZone: string;
  seconds?: boolean;
  className?: string;
}

/** Live wall-clock time in a given zone. Renders a placeholder on the server to avoid hydration drift. */
export default function LocalTime({ timeZone, seconds = false, className }: LocalTimeProps) {
  const [now, setNow] = useState<Date | null>(null);

  const format = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: seconds ? "2-digit" : undefined,
        hour12: false,
      }),
    [timeZone, seconds]
  );

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, seconds ? 1000 : 10_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [seconds]);

  return (
    <time dateTime={now?.toISOString()} className={cn("tabular-nums", className)}>
      {now ? format.format(now) : seconds ? "--:--:--" : "--:--"}
    </time>
  );
}
