import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Shell } from "@/components/erp/Shell";
import { Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { customers, money } from "@/lib/erp-data";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers · Vantage ERP" },
      {
        name: "description",
        content: "Customer accounts, segments, open orders and outstanding balances.",
      },
      { property: "og:title", content: "Customers · Vantage ERP" },
      {
        property: "og:description",
        content: "Customer accounts, segments, open orders and outstanding balances.",
      },
    ],
  }),
  component: Customers,
});

function Customers() {
  const [query, setQuery] = useState("");
  const rows = customers.filter((c) =>
    `${c.id} ${c.name} ${c.segment} ${c.region}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Shell
      breadcrumb="Customers"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New Customer
        </button>
      }
    >
      <Panel
        title="Customer Accounts"
        meta={`${rows.length} accounts`}
        action={
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, segment, region…"
            className="w-56 rounded-md bg-foreground/5 px-2.5 py-1.5 text-[11px] text-foreground ring-1 ring-foreground/10 outline-none placeholder:text-muted focus:ring-accent/40"
          />
        }
      >
        <TableShell>
          <Thead>
            <Th>Account</Th>
            <Th>Name</Th>
            <Th>Segment</Th>
            <Th>Region</Th>
            <Th right>Open orders</Th>
            <Th right>Balance</Th>
            <Th>Status</Th>
          </Thead>
          <tbody className="num">
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
              >
                <td className="px-4 py-2.5 font-mono text-accent">{c.id}</td>
                <td className="px-3 py-2.5">{c.name}</td>
                <td className="px-3 py-2.5 text-muted">{c.segment}</td>
                <td className="px-3 py-2.5 text-muted">{c.region}</td>
                <td className="px-3 py-2.5 text-right">{c.openOrders}</td>
                <td className="px-3 py-2.5 text-right">{money(c.balance, c.currency)}</td>
                <td className="px-4 py-2.5">
                  <StatusChip status={c.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[12px] text-muted">
                  No customers match “{query}”.
                </td>
              </tr>
            ) : null}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
