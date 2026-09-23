import { createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/erp/Shell";
import { Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { money, purchaseOrders } from "@/lib/erp-data";

export const Route = createFileRoute("/purchasing")({
  head: () => ({
    meta: [
      { title: "Purchasing · Vantage ERP" },
      {
        name: "description",
        content: "Purchase orders, supplier commitments and expected receipt dates.",
      },
      { property: "og:title", content: "Purchasing · Vantage ERP" },
      {
        property: "og:description",
        content: "Purchase orders, supplier commitments and expected receipt dates.",
      },
    ],
  }),
  component: Purchasing,
});

function Purchasing() {
  return (
    <Shell
      breadcrumb="Purchasing"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          New PO
        </button>
      }
    >
      <Panel title="Purchase Orders" meta={`${purchaseOrders.length} open commitments`}>
        <TableShell>
          <Thead>
            <Th>PO</Th>
            <Th>Supplier</Th>
            <Th>SKU</Th>
            <Th right>Qty</Th>
            <Th right>Amount</Th>
            <Th>Expected</Th>
            <Th>Status</Th>
          </Thead>
          <tbody className="num">
            {purchaseOrders.map((po) => (
              <tr
                key={po.id}
                className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
              >
                <td className="px-4 py-2.5 font-mono text-accent">{po.id}</td>
                <td className="px-3 py-2.5">{po.supplier}</td>
                <td className="px-3 py-2.5 font-mono text-muted">{po.sku}</td>
                <td className="px-3 py-2.5 text-right">{po.qty.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-right">{money(po.amount, po.currency)}</td>
                <td className="px-3 py-2.5 text-muted">{po.expected}</td>
                <td className="px-4 py-2.5">
                  <StatusChip status={po.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </Panel>
    </Shell>
  );
}
