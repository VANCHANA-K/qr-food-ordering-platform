"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { resolveQr } from "@/lib/api";
import type { QrResolveResponse, ApiErrorResponse } from "@/types/qr";
import { saveTableSession } from "@/lib/session";

export default function OrderEntryPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [data, setData] = useState<QrResolveResponse | null>(null);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await resolveQr(token);
        saveTableSession({
          tableId: result.tableId,
          tableCode: result.tableCode,
          createdAt: Date.now(),
        });
        router.push("/menu");
      } catch (err) {
        setError(err as ApiErrorResponse);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router, token]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error.message}</div>;
  }

  if (!data) {
    return <div className="p-10 text-center">QR not found</div>;
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Welcome</h1>

      <p className="mt-4 text-lg">Table {data.tableCode}</p>
    </div>
  );
}
