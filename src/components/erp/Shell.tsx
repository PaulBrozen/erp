import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const modules = [
  {
    group: "Operations",
    items: [
      { to: "/", label: "Dashboard", count: "01" },
      { to: "/orders", label: "Sales Orders", count: "128" },
      { to: "/inventory", label: "Inventory", count: "44" },
      { to: "/purchasing", label: "Purchasing", count: "31" },
      { to: "/receivables", label: "Receivables", count: "19" },
    ],
  },
] as const;

function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex-1 space-y-0.5 px-3 py-4 text-sm">
      {modules.map((group) => (
        <div key={group.group}>
          <div className="px-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {group.group}
          </div>
          {group.items.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between rounded-md px-2.5 py-2 transition-colors ${
                  active
                    ? "bg-accent/10 text-foreground ring-1 ring-accent/25"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`size-1.5 rounded-full ${active ? "bg-accent" : "bg-line"}`}
                  />
                  {item.label}
                </span>
                <span
                  className={`font-mono text-[10px] ${active ? "text-accent" : ""}`}
                >
                  {item.count}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function Shell({
  breadcrumb,
  action,
  children,
}: {
  breadcrumb: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-foreground">
      <div className="glow pointer-events-none absolute inset-0" />

      <div className="relative flex h-screen">
        <aside className="frost flex w-60 shrink-0 flex-col border-r border-line/70">
          <div className="border-b border-line/70 px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-[10px] bg-accent/15 ring-1 ring-accent/30">
                <span className="font-mono text-xs font-semibold text-accent">VX</span>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">Vantage</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  ERP Console
                </div>
              </div>
            </div>
          </div>

          <Nav />

          <div className="border-t border-line/70 px-3 py-3">
            <div className="frost2 rounded-[10px] px-3 py-2.5 ring-1 ring-foreground/10">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-full bg-accent/20 font-mono text-[10px] font-semibold text-accent">
                  DM
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium">D. Marchetti</div>
                  <div className="truncate text-[10px] text-muted">Ops · North Region</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="frost flex h-14 shrink-0 items-center gap-4 border-b border-line/70 px-5">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">Operations</span>
              <span className="text-line">/</span>
              <span className="font-medium">{breadcrumb}</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-md bg-foreground/5 px-3 py-1.5 text-xs text-muted ring-1 ring-foreground/10 md:flex">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>Live · synced 12s ago</span>
              </div>
              <div className="flex items-center rounded-md bg-foreground/5 px-3 py-1.5 text-xs text-muted ring-1 ring-foreground/10">
                FY2025 · Q3
              </div>
              {action}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-5 py-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
