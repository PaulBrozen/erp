import type { ReactNode } from "react";

type Tone = "accent" | "info" | "warn" | "crit" | "ok" | "neutral";

const toneClass: Record<Tone, string> = {
  accent: "bg-accent/15 text-accent ring-accent/25",
  info: "bg-info/15 text-info ring-info/25",
  warn: "bg-warn/15 text-warn ring-warn/25",
  crit: "bg-crit/15 text-crit ring-crit/25",
  ok: "bg-ok/15 text-ok ring-ok/25",
  neutral: "bg-foreground/5 text-muted ring-foreground/10",
};

const textTone: Record<Tone, string> = {
  accent: "text-accent",
  info: "text-info",
  warn: "text-warn",
  crit: "text-crit",
  ok: "text-ok",
  neutral: "text-muted",
};

const dotClass: Record<Tone, string> = {
  accent: "bg-accent",
  info: "bg-info",
  warn: "bg-warn",
  crit: "bg-crit",
  ok: "bg-ok",
  neutral: "bg-muted",
};

export const statusTone: Record<string, Tone> = {
  Draft: "neutral",
  Pending: "info",
  Sent: "info",
  Processing: "warn",
  Confirmed: "accent",
  Shipped: "accent",
  Delivered: "ok",
  Received: "ok",
  Paid: "ok",
  Open: "info",
  Late: "crit",
  Overdue: "crit",
  "In stock": "ok",
  "Low stock": "warn",
  Critical: "crit",
  Queued: "neutral",
  Running: "warn",
  Complete: "ok",
  Blocked: "crit",
  Active: "ok",
  "On hold": "warn",
  Prospect: "info",
  Approved: "ok",
  Review: "warn",
  Suspended: "crit",
};

export function StatusChip({ status }: { status: string }) {
  const tone = statusTone[status] ?? "neutral";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] ring-1 ${toneClass[tone]}`}
    >
      <span className={`size-1.5 rounded-full ${dotClass[tone]}`} />
      {status}
    </span>
  );
}

export function Meter({ pct, tone = "accent" }: { pct: number; tone?: Tone }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-foreground/10">
      <div
        className={`bar h-full ${dotClass[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
      />
    </div>
  );
}

export function Panel({
  title,
  meta,
  action,
  children,
}: {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="frost overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <div className="flex items-center gap-3 border-b border-line/70 px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {meta ? <span className="text-[11px] text-muted">{meta}</span> : null}
        {action ? <div className="ml-auto flex items-center gap-2">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function Kpi({
  label,
  value,
  delta,
  deltaTone = "accent",
  caption,
  pct,
  barTone = "accent",
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone?: Tone;
  caption: string;
  pct: number;
  barTone?: Tone;
}) {
  return (
    <div className="frost rounded-xl p-4 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</span>
        <span className={`font-mono text-[10px] ${textTone[deltaTone]}`}>{delta}</span>
      </div>
      <div className="num mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-[11px] text-muted">{caption}</div>
      <div className="mt-3">
        <Meter pct={pct} tone={barTone} />
      </div>
    </div>
  );
}

export function Th({
  children,
  right,
}: {
  children: ReactNode;
  right?: boolean;
}) {
  return (
    <th
      className={`px-3 py-2 font-medium first:pl-4 last:pr-4 ${right ? "text-right" : ""}`}
    >
      {children}
    </th>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-line/70 text-left text-[10px] uppercase tracking-[0.12em] text-muted">
        {children}
      </tr>
    </thead>
  );
}
