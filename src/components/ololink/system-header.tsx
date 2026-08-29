'use client';

import { formatT, type OloLinkState } from '@/hooks/use-ololink';
import logoUrl from '@/assets/logo.png';

/** Slim brand + mission strip; all system tabs now live in the left rail. */
export function SystemHeader({ state }: { state: OloLinkState }) {
  return (
    <header className="pointer-events-auto absolute inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b border-white/[0.06] bg-black/65 px-4 backdrop-blur-xl">
      <div className="flex shrink-0 items-center gap-2.5">
        <img src={logoUrl} alt="OloLink logo" className="h-6 w-auto" />
        <span className="text-[11px] font-semibold tracking-[0.28em] text-foreground">OLOLINK</span>
      </div>

      <span className="h-5 w-px shrink-0 bg-white/[0.08]" />

      <div className="flex flex-1 items-center gap-4 overflow-x-auto font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 [scrollbar-width:none]">
        <span className="text-sky-200/90">{formatT(state.missionTime)}</span>
        <span>{state.profile.networkHealth}</span>
        <span>{state.telemetry.latency} ms</span>
        <span>{state.telemetry.bandwidth.toFixed(2)} Gbps</span>
        <span>{state.telemetry.availability.toFixed(2)}%</span>
        {state.profile.alerts.length > 0 && (
          <span className="text-rose-300/90">{state.profile.alerts.length} alerts</span>
        )}
      </div>

      {/* camera view menu — mounted here by GlobeScene via portal */}
      <div id="ololink-view-menu-slot" className="flex shrink-0 items-center" />
    </header>
  );
}
