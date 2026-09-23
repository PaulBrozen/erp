export type OrderStatus =
  | "Draft"
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Overdue";

export interface SalesOrder {
  id: string;
  customer: string;
  sku: string;
  qty: number;
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "JPY";
  status: OrderStatus;
  placed: string;
  shipDate: string;
  warehouse: string;
  fulfillment: number;
}

export interface InventoryItem {
  sku: string;
  description: string;
  onHand: number;
  reorderPoint: number;
  warehouse: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  sku: string;
  qty: number;
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "JPY";
  expected: string;
  status: "Draft" | "Sent" | "Confirmed" | "Received" | "Late";
}

export interface Invoice {
  id: string;
  customer: string;
  issued: string;
  due: string;
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "JPY";
  daysLate: number;
  status: "Open" | "Paid" | "Overdue";
}

export const salesOrders: SalesOrder[] = [
  {
    id: "SO-20481",
    customer: "Halcyon Retail",
    sku: "HX-4471",
    qty: 240,
    amount: 18420,
    currency: "USD",
    status: "Shipped",
    placed: "2025-09-09",
    shipDate: "2025-09-12",
    warehouse: "WH-West · Bay 4",
    fulfillment: 100,
  },
  {
    id: "SO-20482",
    customer: "Northgate Supply",
    sku: "NX-1180",
    qty: 1120,
    amount: 9760,
    currency: "EUR",
    status: "Pending",
    placed: "2025-09-11",
    shipDate: "2025-09-20",
    warehouse: "WH-Central · Bay 1",
    fulfillment: 12,
  },
  {
    id: "SO-20483",
    customer: "Meridian Foods",
    sku: "MD-9023",
    qty: 64,
    amount: 4210,
    currency: "GBP",
    status: "Processing",
    placed: "2025-09-14",
    shipDate: "2025-09-18",
    warehouse: "WH-East · Bay 12",
    fulfillment: 72,
  },
  {
    id: "SO-20484",
    customer: "Cobalt Logistics",
    sku: "CB-3356",
    qty: 88,
    amount: 1204500,
    currency: "JPY",
    status: "Overdue",
    placed: "2025-08-22",
    shipDate: "2025-09-02",
    warehouse: "WH-East · Bay 7",
    fulfillment: 44,
  },
  {
    id: "SO-20485",
    customer: "Aster & Vine",
    sku: "AV-7712",
    qty: 310,
    amount: 22980,
    currency: "USD",
    status: "Delivered",
    placed: "2025-09-01",
    shipDate: "2025-09-05",
    warehouse: "WH-West · Bay 2",
    fulfillment: 100,
  },
  {
    id: "SO-20486",
    customer: "Pinnacle Co.",
    sku: "PN-5540",
    qty: 150,
    amount: 11300,
    currency: "EUR",
    status: "Draft",
    placed: "2025-09-16",
    shipDate: "2025-09-24",
    warehouse: "WH-Central · Bay 9",
    fulfillment: 0,
  },
  {
    id: "SO-20487",
    customer: "Orrery Instruments",
    sku: "OR-2290",
    qty: 42,
    amount: 31600,
    currency: "USD",
    status: "Processing",
    placed: "2025-09-15",
    shipDate: "2025-09-21",
    warehouse: "WH-West · Bay 8",
    fulfillment: 55,
  },
  {
    id: "SO-20488",
    customer: "Brightwell Pharma",
    sku: "BW-6604",
    qty: 900,
    amount: 47250,
    currency: "GBP",
    status: "Shipped",
    placed: "2025-09-08",
    shipDate: "2025-09-13",
    warehouse: "WH-East · Bay 3",
    fulfillment: 100,
  },
];

export const inventory: InventoryItem[] = [
  {
    sku: "HX-4471",
    description: "Aluminum housing, 40mm",
    onHand: 1840,
    reorderPoint: 500,
    warehouse: "WH-West",
  },
  {
    sku: "MD-9023",
    description: "Sealed pail, 20L",
    onHand: 64,
    reorderPoint: 120,
    warehouse: "WH-East",
  },
  {
    sku: "CB-3356",
    description: "Pallet strap, 12mm",
    onHand: 12,
    reorderPoint: 200,
    warehouse: "WH-East",
  },
  {
    sku: "AV-7712",
    description: "Glass bottle, 750ml",
    onHand: 3100,
    reorderPoint: 800,
    warehouse: "WH-West",
  },
  {
    sku: "NX-1180",
    description: "Corrugated tray, A3",
    onHand: 410,
    reorderPoint: 350,
    warehouse: "WH-Central",
  },
  {
    sku: "PN-5540",
    description: "Steel bracket, L-type",
    onHand: 96,
    reorderPoint: 250,
    warehouse: "WH-Central",
  },
  {
    sku: "OR-2290",
    description: "Precision lens, 18mm",
    onHand: 74,
    reorderPoint: 60,
    warehouse: "WH-West",
  },
  {
    sku: "BW-6604",
    description: "Blister foil, 120mic",
    onHand: 5200,
    reorderPoint: 1500,
    warehouse: "WH-East",
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-11204",
    supplier: "Kestrel Metals",
    sku: "HX-4471",
    qty: 2000,
    amount: 64000,
    currency: "USD",
    expected: "2025-09-26",
    status: "Confirmed",
  },
  {
    id: "PO-11205",
    supplier: "Lindholm Packaging",
    sku: "NX-1180",
    qty: 5000,
    amount: 12400,
    currency: "EUR",
    expected: "2025-09-24",
    status: "Sent",
  },
  {
    id: "PO-11206",
    supplier: "Dunmore Plastics",
    sku: "MD-9023",
    qty: 800,
    amount: 9600,
    currency: "GBP",
    expected: "2025-09-19",
    status: "Late",
  },
  {
    id: "PO-11207",
    supplier: "Tanaka Fixings",
    sku: "PN-5540",
    qty: 1200,
    amount: 986000,
    currency: "JPY",
    expected: "2025-10-02",
    status: "Draft",
  },
  {
    id: "PO-11208",
    supplier: "Orrery Optics",
    sku: "OR-2290",
    qty: 300,
    amount: 41800,
    currency: "USD",
    expected: "2025-09-17",
    status: "Received",
  },
];

export const invoices: Invoice[] = [
  {
    id: "INV-8841",
    customer: "Halcyon Retail",
    issued: "2025-08-14",
    due: "2025-09-13",
    amount: 18420,
    currency: "USD",
    daysLate: 10,
    status: "Overdue",
  },
  {
    id: "INV-8842",
    customer: "Aster & Vine",
    issued: "2025-09-05",
    due: "2025-10-05",
    amount: 22980,
    currency: "USD",
    daysLate: 0,
    status: "Open",
  },
  {
    id: "INV-8843",
    customer: "Brightwell Pharma",
    issued: "2025-09-13",
    due: "2025-10-13",
    amount: 47250,
    currency: "GBP",
    daysLate: 0,
    status: "Open",
  },
  {
    id: "INV-8844",
    customer: "Cobalt Logistics",
    issued: "2025-07-30",
    due: "2025-08-29",
    amount: 1204500,
    currency: "JPY",
    daysLate: 25,
    status: "Overdue",
  },
  {
    id: "INV-8845",
    customer: "Meridian Foods",
    issued: "2025-08-02",
    due: "2025-09-01",
    amount: 4210,
    currency: "GBP",
    daysLate: 0,
    status: "Paid",
  },
];

const symbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

export function money(amount: number, currency: string): string {
  const fractionDigits = currency === "JPY" ? 0 : 2;
  return `${symbols[currency] ?? ""}${amount.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

export function stockLevel(item: InventoryItem): {
  pct: number;
  label: "In stock" | "Low stock" | "Critical";
} {
  const ratio = item.onHand / (item.reorderPoint * 2);
  const pct = Math.max(4, Math.min(100, Math.round(ratio * 100)));
  if (item.onHand < item.reorderPoint * 0.25) return { pct, label: "Critical" };
  if (item.onHand < item.reorderPoint) return { pct, label: "Low stock" };
  return { pct, label: "In stock" };
}
