"use client";

import { useCallback, useEffect, useState } from "react";

type UserRow = {
  _id: string;
  email: string;
  name?: string;
  role: string;
  isActive: boolean;
  googleLoginEnabled: boolean;
  createdAt: string;
  listingsCount: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = new URLSearchParams({
      page: String(page),
      limit: "15",
      search: appliedSearch,
    });
    const res = await fetch(`/api/admin/users?${q}`);
    const data = await res.json();
    setUsers(data.users || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, appliedSearch]);

  useEffect(() => {
    load();
  }, [load]);

  async function patch(id: string, body: Record<string, unknown>) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this user permanently?")) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    load();
  }

  const pages = Math.max(1, Math.ceil(total / 15));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">User management</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Roles, Google login, and activity. Super Admin can assign roles.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Search email / name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                setAppliedSearch(searchInput.trim());
              }
            }}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm w-64"
          />
          <button
            type="button"
            onClick={() => {
              setPage(1);
              setAppliedSearch(searchInput.trim());
            }}
            className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left text-zinc-500">
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Listings</th>
              <th className="p-3 font-medium">Joined</th>
              <th className="p-3 font-medium">Active</th>
              <th className="p-3 font-medium">Google</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-zinc-500">
                  Loading…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-zinc-500">
                  No users
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-zinc-100 dark:border-zinc-800/80"
                >
                  <td className="p-3 align-top">{u.email}</td>
                  <td className="p-3 align-top">{u.name || "—"}</td>
                  <td className="p-3 align-top">
                    <select
                      value={u.role}
                      onChange={(e) => patch(u._id, { role: e.target.value })}
                      className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-2 py-1"
                    >
                      <option value="user">user</option>
                      <option value="moderator">moderator</option>
                      <option value="admin">admin</option>
                      <option value="super_admin">super_admin</option>
                    </select>
                  </td>
                  <td className="p-3 align-top tabular-nums">{u.listingsCount}</td>
                  <td className="p-3 align-top text-xs text-zinc-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 align-top">
                    <input
                      type="checkbox"
                      checked={u.isActive}
                      onChange={(e) =>
                        patch(u._id, { isActive: e.target.checked })
                      }
                    />
                  </td>
                  <td className="p-3 align-top">
                    <input
                      type="checkbox"
                      checked={u.googleLoginEnabled}
                      onChange={(e) =>
                        patch(u._id, { googleLoginEnabled: e.target.checked })
                      }
                    />
                  </td>
                  <td className="p-3 align-top">
                    <button
                      type="button"
                      onClick={() => remove(u._id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">
          Page {page} / {pages} — {total} users
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
