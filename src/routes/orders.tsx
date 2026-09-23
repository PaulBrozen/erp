import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Shell } from "@/components/erp/Shell";
import { Meter, Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { money, salesOrders } from "@/lib/erp-data";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Sales Orders · Vantage ERP" },
      {
        name: "description",
        content:
          "Track sales orders by status, customer and fulfillment progress across all warehouses.",
      },
      { property: "og:title", content: "Sales Orders · Vantage ERP" },
      {
        property: "og:description",
        content:
          "Track sales orders by status, customer and fulfillment progress across all warehouses.",
      },
    ],
  }),
  component: Orders,
});

function Orders() {
  const [query, setQuery] = useState("");

  const rows = salesOrders.filter((o) =>
    `${o.id} ${o.customer} ${o.sku}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Shell
      breadcrumb="Sales Orders"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New Order
        </button>
      }
    >
      <Panel
        title="All Sales Orders"
        meta={`${rows.length} records`}
        action={
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, customer, SKU…"
            className="w-56 rounded-md bg-foreground/5 px-2.5 py-1.5 text-[11px] text-foreground ring-1 ring-foreground/10 outline-none placeholder:text-muted focus:ring-accent/40"
          />
        }
      >
        <TableShell>
          <Thead>
            <Th>Order</Th>
            <Th>Customer</Th>
            <Th>SKU</Th>
            <Th right>Qty</Th>
            <Th right>Amount</Th>
            <Th>Ship date</Th>
            <Th>Warehouse</Th>
            <Th>Fulfillment</Th>
            <Th>Status</Th>
          </Thead>
          <tbody className="num">
            {rows.map((o) => (
              <tr
                key={o.id}
                className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
              >
                <td className="px-4 py-2.5 font-mono text-accent">{o.id}</td>
                <td className="px-3 py-2.5">{o.customer}</td>
                <td className="px-3 py-2.5 font-mono text-muted">{o.sku}</td>
                <td className="px-3 py-2.5 text-right">{o.qty.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right">{money(o.amount, o.currency)}</td>
                <td className="px-3 py-2.5 text-muted">{o.shipDate}</td>
                <td className="px-3 py-2.5 text-muted">{o.warehouse}</td>
                <td className="w-36 px-3 py-2.5">
                  <Meter pct={o.fulfillment} />
                </td>
                <td className="px-4 py-2.5">
                  <StatusChip status={o.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-[12px] text-muted">
                  No orders match “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
