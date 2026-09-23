import { createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/erp/Shell";
import { Kpi, Meter, Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { productionRuns } from "@/lib/erp-data";

export const Route = createFileRoute("/production")({
  head: () => ({
    meta: [
      { title: "Production · Vantage ERP" },
      {
        name: "description",
        content: "Work orders, line assignments and build progress across every production line.",
      },
      { property: "og:title", content: "Production · Vantage ERP" },
      {
        property: "og:description",
        content: "Work orders, line assignments and build progress across every production line.",
      },
    ],
  }),
  component: Production,
});

function Production() {
  const running = productionRuns.filter((r) => r.status === "Running").length;
  const blocked = productionRuns.filter((r) => r.status === "Blocked").length;
  const planned = productionRuns.reduce((s, r) => s + r.plannedQty, 0);
  const completed = productionRuns.reduce((s, r) => s + r.completedQty, 0);

  return (
    <Shell
      breadcrumb="Production"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New Work Order
        </button>
      }
    >
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          label="Work orders"
          value={String(productionRuns.length)}
          delta="▲ 2"
          caption="Open on the floor"
          pct={68}
        />
        <Kpi
          label="Running"
          value={String(running)}
          delta="▲ 1"
          caption="Lines active now"
          pct={(running / productionRuns.length) * 100}
        />
        <Kpi
          label="Units built"
          value={completed.toLocaleString()}
          delta={`${Math.round((completed / planned) * 100)}%`}
          caption={`of ${planned.toLocaleString()} planned`}
          pct={(completed / planned) * 100}
        />
        <Kpi
          label="Blocked"
          value={String(blocked)}
          delta="▲ 1"
          deltaTone="crit"
          caption="Awaiting materials"
          pct={(blocked / productionRuns.length) * 100}
          barTone="crit"
        />
      </section>

      <div className="mt-4">
        <Panel title="Work Orders" meta={`${productionRuns.length} runs · ${blocked} blocked`}>
          <TableShell>
            <Thead>
              <Th>Work order</Th>
              <Th>SKU</Th>
              <Th>Description</Th>
              <Th>Line</Th>
              <Th right>Planned</Th>
              <Th right>Built</Th>
              <Th>Progress</Th>
              <Th>Due</Th>
              <Th>Status</Th>
            </Thead>
            <tbody className="num">
              {productionRuns.map((r) => {
                const pct = Math.round((r.completedQty / r.plannedQty) * 100);
                return (
                  <tr
                    key={r.id}
                    className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <td className="px-4 py-2.5 font-mono text-accent">{r.id}</td>
                    <td className="px-3 py-2.5 font-mono text-muted">{r.sku}</td>
                    <td className="px-3 py-2.5">{r.description}</td>
                    <td className="px-3 py-2.5 text-muted">{r.line}</td>
                    <td className="px-3 py-2.5 text-right">{r.plannedQty.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right">{r.completedQty.toLocaleString()}</td>
                    <td className="w-36 px-3 py-2.5">
                      <Meter
                        pct={pct}
                        tone={r.status === "Blocked" ? "crit" : pct === 100 ? "ok" : "accent"}
                      />
                    </td>
                    <td className="px-3 py-2.5 text-muted">{r.due}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={r.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
        </Panel>
      </div>
    </Shell>
  );
}
