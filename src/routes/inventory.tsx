import { createFileRoute } from "@tanstack/react-router";

import { Shell } from "@/components/erp/Shell";
import { Kpi, Meter, Panel, StatusChip, TableShell, Th, Thead } from "@/components/erp/status";
import { inventory, stockLevel } from "@/lib/erp-data";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory · Vantage ERP" },
      {
        name: "description",
        content: "Stock levels, reorder points and warehouse allocation for every SKU.",
      },
      { property: "og:title", content: "Inventory · Vantage ERP" },
      {
        property: "og:description",
        content: "Stock levels, reorder points and warehouse allocation for every SKU.",
      },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const low = inventory.filter((i) => stockLevel(i).label !== "In stock").length;
  const critical = inventory.filter((i) => stockLevel(i).label === "Critical").length;
  const units = inventory.reduce((sum, i) => sum + i.onHand, 0);

  return (
    <Shell
      breadcrumb="Inventory"
      action={
        <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent/40">
          Adjust Stock
        </button>
      }
    >
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi
          label="Tracked SKUs"
          value={String(inventory.length)}
          delta="▲ 2"
          caption="Across 3 warehouses"
          pct={72}
        />
        <Kpi
          label="Units on hand"
          value={units.toLocaleString()}
          delta="▲ 1.8%"
          caption="Net of allocations"
          pct={80}
        />
        <Kpi
          label="Below reorder"
          value={String(low)}
          delta="▲ 1"
          deltaTone="warn"
          caption="Replenishment required"
          pct={(low / inventory.length) * 100}
          barTone="warn"
        />
        <Kpi
          label="Critical"
          value={String(critical)}
          delta="▲ 1"
          deltaTone="crit"
          caption="Below 25% of reorder point"
          pct={(critical / inventory.length) * 100}
          barTone="crit"
        />
      </section>

      <div className="mt-4">
        <Panel title="Stock Levels" meta={`${inventory.length} SKUs · ${low} low`}>
          <TableShell>
            <Thead>
              <Th>SKU</Th>
              <Th>Description</Th>
              <Th>Warehouse</Th>
              <Th right>On Hand</Th>
              <Th right>Reorder Pt</Th>
              <Th>Level</Th>
              <Th>Status</Th>
            </Thead>
            <tbody className="num">
              {inventory.map((item) => {
                const level = stockLevel(item);
                return (
                  <tr
                    key={item.sku}
                    className="border-b border-line/40 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <td className="px-4 py-2.5 font-mono">{item.sku}</td>
                    <td className="px-3 py-2.5">{item.description}</td>
                    <td className="px-3 py-2.5 text-muted">{item.warehouse}</td>
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
