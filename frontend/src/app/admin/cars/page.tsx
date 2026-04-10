"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
type CarRow = {
  _id: string;
  title: string;
  price?: number;
  brand?: string;
  status: string;
  coverImage?: string;
  images?: string[];
  owner?: { email?: string; name?: string };
};

export default function AdminCarsPage() {
  const [cars, setCars] = useState<CarRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({
      page: String(page),
      limit: "12",
    });
    if (status) q.set("status", status);
    if (brand.trim()) q.set("brand", brand.trim());
    if (search.trim()) q.set("search", search.trim());
    const res = await fetch(`/api/admin/cars?${q}`);
    const data = await res.json();
    setCars(data.cars || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, status, brand, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function setCarStatus(
    id: string,
    next: "pending" | "active" | "rejected",
  ) {
    const body: { status: string; rejectionReason?: string } = { status: next };
    if (next === "rejected") {
      const reason = prompt("Rejection reason (optional)") || "";
      body.rejectionReason = reason;
    }
    await fetch(`/api/admin/cars/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/admin/cars/${id}`, {
      method: "DELETE",
    });
    load();
  }

  const pages = Math.max(1, Math.ceil(total / 12));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Car listings</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Moderate, edit, and remove listings. Public site only shows{" "}
            <strong>active</strong>.
          </p>
        </div>
        <Link
          href="/admin/cars/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium w-fit"
        >
          Add listing
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 items-end">
        <label className="text-xs text-zinc-500">
          Status
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="ml-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1.5 text-sm"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm"
        />
        <input
          placeholder="Search title / brand / model"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm w-64"
        />
        <button
          type="button"
          onClick={() => {
            setPage(1);
            load();
          }}
          className="rounded-lg bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 px-3 py-1.5 text-sm"
        >
          Apply
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="text-zinc-500">Loading…</p>
        ) : cars.length === 0 ? (
          <p className="text-zinc-500">No listings</p>
        ) : (
          cars.map((car) => (
            <div
              key={car._id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm flex flex-col"
            >
              {car.coverImage || car.images?.[0] ? (
                <img
                  src={car.coverImage || car.images?.[0]}
                  alt=""
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="h-36 bg-zinc-200 dark:bg-zinc-800" />
              )}
              <div className="p-3 flex-1 flex flex-col gap-2">
                <div className="font-medium line-clamp-2">{car.title}</div>
                <div className="text-xs text-zinc-500 flex flex-wrap gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 ${
                      car.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                        : car.status === "pending"
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {car.status}
                  </span>
                  {car.price != null ? <span>{car.price} €</span> : null}
                  {car.owner?.email ? (
                    <span className="truncate max-w-[12rem]" title={car.owner.email}>
                      {car.owner.email}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  <Link
                    href={`/admin/cars/${car._id}/edit`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="text-xs text-green-700 dark:text-green-400"
                    onClick={() => setCarStatus(car._id, "active")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="text-xs text-amber-700 dark:text-amber-300"
                    onClick={() => setCarStatus(car._id, "pending")}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    className="text-xs text-red-600"
                    onClick={() => setCarStatus(car._id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    className="text-xs text-red-600 ml-auto"
                    onClick={() => remove(car._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">
          Page {page} / {pages} — {total} listings
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded border border-zinc-300 dark:border-zinc-700 px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border border-zinc-300 dark:border-zinc-700 px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
