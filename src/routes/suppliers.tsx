import { createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/erp/Shell";
import { Meter, Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { suppliers } from "@/lib/erp-data";

export const Route = createFileRoute("/suppliers")({
  head: () => ({
    meta: [
      { title: "Suppliers · Vantage ERP" },
      {
        name: "description",
        content: "Supplier directory with lead times, on-time delivery and approval status.",
      },
      { property: "og:title", content: "Suppliers · Vantage ERP" },
      {
        property: "og:description",
        content: "Supplier directory with lead times, on-time delivery and approval status.",
      },
    ],
  }),
  component: Suppliers,
});

function Suppliers() {
  const review = suppliers.filter((s) => s.status !== "Approved").length;

  return (
    <Shell
      breadcrumb="Suppliers"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New Supplier
        </button>
      }
    >
      <Panel title="Supplier Directory" meta={`${suppliers.length} suppliers · ${review} flagged`}>
        <TableShell>
          <Thead>
            <Th>Code</Th>
            <Th>Supplier</Th>
            <Th>Category</Th>
            <Th>Region</Th>
            <Th right>Open POs</Th>
            <Th right>Lead time</Th>
            <Th>On-time</Th>
            <Th>Status</Th>
          </Thead>
          <tbody className="num">
            {suppliers.map((s) => (
              <tr
                key={s.id}
                className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
              >
                <td className="px-4 py-2.5 font-mono text-accent">{s.id}</td>
                <td className="px-3 py-2.5">{s.name}</td>
                <td className="px-3 py-2.5 text-muted">{s.category}</td>
                <td className="px-3 py-2.5 text-muted">{s.region}</td>
                <td className="px-3 py-2.5 text-right">{s.openPos}</td>
                <td className="px-3 py-2.5 text-right text-muted">{s.leadTimeDays} d</td>
                <td className="w-40 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-right text-[11px] text-muted">{s.onTimePct}%</span>
                    <span className="flex-1">
                      <Meter
                        pct={s.onTimePct}
                        tone={s.onTimePct < 65 ? "crit" : s.onTimePct < 85 ? "warn" : "ok"}
                      />
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <StatusChip status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
