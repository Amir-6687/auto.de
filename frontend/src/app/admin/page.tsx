"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  users: number;
  cars: number;
  activeListings: number;
  pendingListings: number;
  contactMessages: number;
  totalViews: number;
  userGrowth: { _id: string; count: number }[];
  listingGrowth: { _id: string; count: number }[];
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load stats");
        return r.json();
      })
      .then(setStats)
      .catch((e) => setErr(String(e.message || e)));
  }, []);

  const chartData = useMemo(() => {
    if (!stats) return [];
    const map = new Map<string, { month: string; users: number; listings: number }>();
    for (const u of stats.userGrowth || []) {
      map.set(u._id, { month: u._id, users: u.count, listings: 0 });
    }
    for (const l of stats.listingGrowth || []) {
      const prev = map.get(l._id) || { month: l._id, users: 0, listings: 0 };
      prev.listings = l.count;
      map.set(l._id, prev);
    }
    return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
  }, [stats]);

  if (err) {
    return <p className="text-red-600">{err}</p>;
  }

  if (!stats) {
    return <p className="text-zinc-600 dark:text-zinc-400">Loading dashboard…</p>;
  }

  const cards = [
    { label: "Users", value: stats.users },
    { label: "All listings", value: stats.cars },
    { label: "Active", value: stats.activeListings },
    { label: "Pending review", value: stats.pendingListings },
    { label: "Contact messages", value: stats.contactMessages },
    { label: "Page views (sum)", value: stats.totalViews },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Overview of users, listings, and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm"
          >
            <div className="text-xs uppercase tracking-wide text-zinc-500">
              {c.label}
            </div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm h-[360px]">
        <h2 className="text-sm font-medium mb-4">Growth (last ~12 months)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" name="New users" stroke="#2563eb" dot={false} />
            <Line
              type="monotone"
              dataKey="listings"
              name="New listings"
              stroke="#16a34a"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
