'use client';

import { formatT, type OloLinkState } from '@/hooks/use-ololink';
import { SCENARIO_ORDER, SCENARIOS, type ScenarioId } from '@/lib/ololink';
import { cn } from '@/lib/utils';
import logoUrl from '@/assets/logo.png';

/** Thai-first labels for the scenario simulation tabs. */
const SCENARIO_LABELS: Record<ScenarioId, { th: string; en: string }> = {
  clear: { th: 'ท้องฟ้าแจ่มใส', en: 'Clear' },
  cloud: { th: 'เมฆหนา', en: 'Cloud' },
  rain: { th: 'ฝน', en: 'Rain' },
  storm: { th: 'พายุ', en: 'Storm' },
};

function ScenarioTab({
  id,
  active,
  disabled,
  onSelect,
}: {
  id: ScenarioId;
  active: boolean;
  disabled: boolean;
  onSelect: (id: ScenarioId) => void;
}) {
  const label = SCENARIO_LABELS[id];
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        'group relative flex h-9 shrink-0 flex-col items-center justify-center rounded-[8px] px-3 outline-none transition-all duration-150',
        'focus-visible:ring-1 focus-visible:ring-sky-400/60 disabled:opacity-50',
        active
          ? 'bg-sky-500/[0.14] text-sky-200'
          : 'text-muted-foreground/70 hover:bg-white/[0.05] hover:text-foreground active:scale-[0.96]'
      )}
    >
      <span className="text-[11px] font-medium leading-tight">{label.th}</span>
      <span className="font-mono text-[7.5px] uppercase leading-tight tracking-[0.22em] opacity-60">
        {label.en}
      </span>
      {/* active indicator */}
      <span
        className={cn(
          'absolute inset-x-2 -bottom-[2px] h-[2px] rounded-full bg-sky-400 transition-opacity',
          active ? 'opacity-100' : 'opacity-0'
        )}
      />
    </button>
  );
}

/** Slim brand + mission strip with the scenario simulation tab bar. */
export function SystemHeader({ state }: { state: OloLinkState }) {
  return (
    <header className="pointer-events-auto absolute inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b border-white/[0.06] bg-black/65 px-4 backdrop-blur-xl">
      <div className="flex shrink-0 items-center gap-2.5">
        <img src={logoUrl} alt="OloLink logo" className="h-6 w-auto" />
        <span className="text-[11px] font-semibold tracking-[0.28em] text-foreground">OLOLINK</span>
      </div>

      <span className="h-5 w-px shrink-0 bg-white/[0.08]" />

      {/* scenario simulation tabs */}
      <div
        role="tablist"
        aria-label="Scenario simulation"
        className="flex shrink-0 items-center gap-1 overflow-x-auto [scrollbar-width:none]"
      >
        {SCENARIO_ORDER.map((id) => (
          <ScenarioTab
            key={id}
            id={id}
            active={state.scenarioId === id}
            disabled={state.aiProcessing}
            onSelect={state.setScenario}
          />
        ))}
      </div>

      <span className="hidden h-5 w-px shrink-0 bg-white/[0.08] lg:block" />

      <div className="hidden flex-1 items-center gap-4 overflow-x-auto font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 [scrollbar-width:none] lg:flex">
        <span className="text-sky-200/90">{formatT(state.missionTime)}</span>
        <span>{state.profile.networkHealth}</span>
        <span>{state.telemetry.latency} ms</span>
        <span>{state.telemetry.bandwidth.toFixed(2)} Gbps</span>
        <span>{state.telemetry.availability.toFixed(2)}%</span>
        {state.profile.alerts.length > 0 && (
          <span className="text-rose-300/90">{state.profile.alerts.length} alerts</span>
        )}
      </div>

      {/* active scenario mode summary (compact screens) */}
      <span className="flex-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-sky-200/70 lg:hidden">
        {SCENARIOS[state.scenarioId].short}
      </span>

      {/* camera view menu — mounted here by GlobeScene via portal */}
      <div id="ololink-view-menu-slot" className="flex shrink-0 items-center" />
    </header>
  );
}
