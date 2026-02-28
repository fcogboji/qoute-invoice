"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

type DatePoint = { date: string; count: number; cumulative: number };
type RevenuePoint = { date: string; paid: number; invoiced: number };

function formatDate(d: string): string {
  return new Date(d + "Z").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function UserGrowthChart({ data }: { data: DatePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
        <XAxis dataKey="date" tickFormatter={formatDate} stroke="#78716c" fontSize={12} />
        <YAxis yAxisId="left" stroke="#78716c" fontSize={12} tickFormatter={(v) => v.toString()} />
        <YAxis yAxisId="right" orientation="right" stroke="#78716c" fontSize={12} tickFormatter={(v) => v.toString()} />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e7e5e4", borderRadius: "8px" }}
          labelFormatter={(label) => new Date(label + "Z").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
          formatter={(value, name) => [
            (value ?? 0).toString(),
            name === "count" ? "New signups" : "Total users",
          ]}
        />
        <Legend formatter={(value) => (value === "count" ? "New signups" : "Total users")} />
        <Bar yAxisId="left" dataKey="count" fill="#f59e0b" name="count" radius={[4, 4, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#059669" strokeWidth={2} dot={false} name="cumulative" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
        <XAxis dataKey="date" tickFormatter={formatDate} stroke="#78716c" fontSize={12} />
        <YAxis stroke="#78716c" fontSize={12} tickFormatter={(v) => "£" + v.toLocaleString()} />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: "1px solid #e7e5e4", borderRadius: "8px" }}
          labelFormatter={(label) => new Date(label + "Z").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
          formatter={(value, name) => [
            "£" + (value ?? 0).toLocaleString("en-GB", { minimumFractionDigits: 2 }),
            name === "paid" ? "Paid" : "Invoiced",
          ]}
        />
        <Legend formatter={(value) => (value === "paid" ? "Paid" : "Invoiced")} />
        <Bar dataKey="invoiced" fill="#d6d3d1" name="invoiced" radius={[4, 4, 0, 0]} />
        <Bar dataKey="paid" fill="#059669" name="paid" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
