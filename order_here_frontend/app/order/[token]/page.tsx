"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { resolveQr } from "@/lib/api";
import type { ApiErrorResponse } from "@/types/qr";
import { saveTableSession } from "@/lib/session";

export default function OrderEntryPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

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

  return <div className="p-10 text-center">Redirecting to menu...</div>;
}
