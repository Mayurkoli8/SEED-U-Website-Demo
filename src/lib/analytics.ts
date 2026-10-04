/**
 * Analytics hook. A no-op until NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 * (the <Analytics /> component then loads gtag). Swap the body of
 * `track` if SEED U chooses a different provider.
 */

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
}
