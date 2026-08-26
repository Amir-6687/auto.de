"use client";

import { useCallback, useEffect, useState } from "react";

type Msg = {
  _id: string;
  name?: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    const q = new URLSearchParams({ page: String(page), limit: "20" });
    const res = await fetch(`/api/admin/messages?${q}`);
    const data = await res.json();
    setMessages(data.messages || []);
    setTotal(data.total || 0);
  }, [page]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  const pages = Math.max(1, Math.ceil(total / 20));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Contact messages</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Messages saved from the contact form (and email copy).
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m._id}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-medium">{m.email}</div>
                <div className="text-xs text-zinc-500">
                  {new Date(m.createdAt).toLocaleString()} · {m.status}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="text-xs rounded border border-zinc-300 dark:border-zinc-700 px-2 py-1"
                  onClick={() => setStatus(m._id, "read")}
                >
                  Mark read
                </button>
                <button
                  type="button"
                  className="text-xs rounded border border-zinc-300 dark:border-zinc-700 px-2 py-1"
                  onClick={() => setStatus(m._id, "unread")}
                >
                  Unread
                </button>
                <button
                  type="button"
                  className="text-xs rounded border border-zinc-300 dark:border-zinc-700 px-2 py-1"
                  onClick={() => setStatus(m._id, "archived")}
                >
                  Archive
                </button>
                <button
                  type="button"
                  className="text-xs text-red-600"
                  onClick={() => remove(m._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            {m.subject ? (
              <div className="text-sm font-medium mt-2">{m.subject}</div>
            ) : null}
            <p className="text-sm mt-2 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
              {m.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-zinc-500 text-sm">No messages yet.</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">
          Page {page} / {pages}
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
