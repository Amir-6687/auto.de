import { use } from "react";
import EditCarClient from "./EditCarClient";

export default function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ اینجا روی سرور params را با use باز می‌کنیم
  const { id } = use(params);

  return <EditCarClient id={id} />;
}
