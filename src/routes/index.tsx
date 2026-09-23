import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Shell } from "@/components/erp/Shell";
import { Kpi, Meter, Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { inventory, money, salesOrders, stockLevel } from "@/lib/erp-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Vantage ERP" },
      {
        name: "description",
        content:
          "Live operations dashboard: revenue, open orders, low stock and receivables at a glance.",
      },
      { property: "og:title", content: "Dashboard · Vantage ERP" },
      {
        property: "og:description",
        content:
          "Live operations dashboard: revenue, open orders, low stock and receivables at a glance.",
      },
    ],
  }),
  component: Dashboard,
});

const filters = ["All", "Open", "Shipped", "Overdue"] as const;

function Dashboard() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState("SO-20483");

  const rows = salesOrders.filter((o) => {
    if (filter === "All") return true;
    if (filter === "Open") return ["Draft", "Pending", "Processing"].includes(o.status);
    if (filter === "Shipped") return ["Shipped", "Delivered"].includes(o.status);
    return o.status === "Overdue";
  });

  const selected = salesOrders.find((o) => o.id === selectedId) ?? salesOrders[0]!;

  return (
    <Shell
      breadcrumb="Dashboard"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New Order
        </button>
      }
    >
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          label="Revenue · MTD"
          value="$1,284,900"
          delta="▲ 6.4%"
          caption="Target $1,500,000 · 85.7%"
          pct={85.7}
        />
        <Kpi
          label="Open Orders"
          value="1,284"
          delta="▲ 12"
          caption="Avg. cycle 3.2 days"
          pct={64}
        />
        <Kpi
          label="Low Stock"
          value="37"
          delta="▲ 5"
          deltaTone="warn"
          caption="SKUs below reorder point"
          pct={22}
          barTone="warn"
        />
        <Kpi
          label="Receivables"
          value="$482,300"
          delta="▼ 2.1%"
          deltaTone="crit"
          caption="19 invoices · 14 overdue"
          pct={41}
          barTone="crit"
        />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
        <Panel
          title="Sales Orders"
          action={
            <>
              <div className="flex items-center rounded-md bg-foreground/5 px-2.5 py-1.5 text-[11px] text-muted ring-1 ring-foreground/10">
                Search SKU, PO…
              </div>
              <Link
                to="/orders"
                className="rounded-md bg-foreground/5 px-2.5 py-1.5 text-[11px] text-muted ring-1 ring-foreground/10"
              >
                Open module
              </Link>
            </>
          }
        >
          <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-2.5 py-1 text-[11px] transition-colors ${
                  filter === f
                    ? "bg-accent/15 font-medium text-accent ring-1 ring-accent/25"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <TableShell>
            <Thead>
              <Th>Order</Th>
              <Th>Customer</Th>
              <Th>SKU</Th>
              <Th right>Qty</Th>
              <Th right>Amount</Th>
              <Th>Currency</Th>
              <Th>Status</Th>
            </Thead>
            <tbody className="num">
              {rows.map((o) => {
                const active = o.id === selected.id;
                return (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedId(o.id)}
                    className={`cursor-pointer border-b border-line/40 transition-colors ${
                      active
                        ? "bg-accent/[0.06] ring-1 ring-inset ring-accent/20 hover:bg-accent/[0.09]"
                        : "hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <td
                      className={`px-4 py-2.5 font-mono ${active ? "text-accent" : "text-foreground"}`}
                    >
                      {o.id}
                    </td>
                    <td className="px-3 py-2.5">{o.customer}</td>
                    <td className="px-3 py-2.5 font-mono text-muted">{o.sku}</td>
                    <td className="px-3 py-2.5 text-right">{o.qty.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right">{money(o.amount, o.currency)}</td>
                    <td className="px-3 py-2.5 font-mono text-muted">{o.currency}</td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={o.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
          <div className="flex items-center justify-between border-t border-line/70 px-4 py-2.5 text-[11px] text-muted">
            <span>Showing {rows.length} of 1,284 orders</span>
            <span className="font-mono">Page 1 / 214</span>
          </div>
        </Panel>

        <aside
          key={selected.id}
          className="frost2 slidein overflow-hidden rounded-xl ring-1 ring-foreground/10"
        >
          <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted">
                Order Detail
              </div>
              <div className="font-mono text-sm font-semibold text-accent">{selected.id}</div>
            </div>
            <StatusChip status={selected.status} />
          </div>
          <div className="space-y-3 px-4 py-4 text-[13px]">
            <Row label="Customer" value={selected.customer} bold />
            <Row label="SKU" value={selected.sku} mono />
            <Row label="Quantity" value={`${selected.qty.toLocaleString()} units`} />
            <Row
              label="Unit price"
              value={money(selected.amount / selected.qty, selected.currency)}
            />
            <Row label="Amount" value={money(selected.amount, selected.currency)} bold />
            <Row label="Currency" value={selected.currency} mono />
            <Row label="Placed" value={selected.placed} />
            <Row label="Ship date" value={selected.shipDate} />
            <Row label="Warehouse" value={selected.warehouse} />
            <Row label="Fulfillment" value={`${selected.fulfillment}%`} />
            <Meter pct={selected.fulfillment} />
            <div className="flex gap-2 pt-1">
              <button className="h-8 flex-1 rounded-md bg-accent text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
                Advance
              </button>
              <button className="h-8 flex-1 rounded-md bg-foreground/5 text-xs text-muted ring-1 ring-foreground/10">
                Hold
              </button>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-4">
        <Panel
          title="Inventory · Stock Levels"
          meta="44 SKUs · 37 low"
          action={
            <Link
              to="/inventory"
              className="rounded-md bg-foreground/5 px-2.5 py-1.5 text-[11px] text-muted ring-1 ring-foreground/10"
            >
              Open module
            </Link>
          }
        >
          <TableShell>
            <Thead>
              <Th>SKU</Th>
              <Th>Description</Th>
              <Th right>On Hand</Th>
              <Th right>Reorder Pt</Th>
              <Th>Level</Th>
              <Th>Status</Th>
            </Thead>
            <tbody className="num">
              {inventory.slice(0, 4).map((item) => {
                const level = stockLevel(item);
                return (
                  <tr
                    key={item.sku}
                    className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <td className="px-4 py-2.5 font-mono">{item.sku}</td>
                    <td className="px-3 py-2.5">{item.description}</td>
                    <td className="px-3 py-2.5 text-right">{item.onHand.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right text-muted">
                      {item.reorderPoint.toLocaleString()}
                    </td>
                    <td className="w-40 px-3 py-2.5">
                      <Meter
                        pct={level.pct}
                        tone={
                          level.label === "Critical"
                            ? "crit"
                            : level.label === "Low stock"
                              ? "warn"
                              : "accent"
                        }
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <StatusChip status={level.label} />
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

function Row({
  label,
  value,
  mono,
  bold,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span
        className={`${mono ? "font-mono" : "num"} ${bold ? "font-semibold" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
