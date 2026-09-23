import { createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/erp/Shell";
import { Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { invoices, money } from "@/lib/erp-data";

export const Route = createFileRoute("/receivables")({
  head: () => ({
    meta: [
      { title: "Receivables · Vantage ERP" },
      {
        name: "description",
        content: "Customer invoices, due dates and overdue ageing across the ledger.",
      },
      { property: "og:title", content: "Receivables · Vantage ERP" },
      {
        property: "og:description",
        content: "Customer invoices, due dates and overdue ageing across the ledger.",
      },
    ],
  }),
  component: Receivables,
});

function Receivables() {
  const overdue = invoices.filter((i) => i.status === "Overdue").length;

  return (
    <Shell
      breadcrumb="Receivables"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          Send Reminders
        </button>
      }
    >
      <Panel title="Open Invoices" meta={`${invoices.length} invoices · ${overdue} overdue`}>
        <TableShell>
          <Thead>
            <Th>Invoice</Th>
            <Th>Customer</Th>
            <Th>Issued</Th>
            <Th>Due</Th>
            <Th right>Amount</Th>
            <Th right>Days late</Th>
            <Th>Status</Th>
          </Thead>
          <tbody className="num">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
              >
                <td className="px-4 py-2.5 font-mono text-accent">{inv.id}</td>
                <td className="px-3 py-2.5">{inv.customer}</td>
                <td className="px-3 py-2.5 text-muted">{inv.issued}</td>
                <td className="px-3 py-2.5 text-muted">{inv.due}</td>
                <td className="px-3 py-2.5 text-right">{money(inv.amount, inv.currency)}</td>
                <td
                  className={`px-3 py-2.5 text-right ${inv.daysLate > 0 ? "text-crit" : "text-muted"}`}
                >
                  {inv.daysLate || "—"}
                </td>
                <td className="px-4 py-2.5">
                  <StatusChip status={inv.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
