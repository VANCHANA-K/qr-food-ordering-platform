"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getTableSession } from "@/lib/session"

export default function MenuPage() {

  const router = useRouter()

  const [tableCode, setTableCode] = useState<string | null>(null)

  useEffect(() => {

    const session = getTableSession()

    if (!session) {
      router.push("/")
      return
    }

    setTableCode(session.tableCode)

  }, [])

  if (!tableCode) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold">
        Menu
      </h1>

      <p className="mt-4">
        Table {tableCode}
      </p>

    </div>
  )
}
