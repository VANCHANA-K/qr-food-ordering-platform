import { TableSession } from "@/types/session"

const STORAGE_KEY = "order_here_table_session"

/**
 * Save table session
 */
export function saveTableSession(session: TableSession) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(session)
  )
}

/**
 * Get table session
 */
export function getTableSession(): TableSession | null {

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as TableSession
  } catch {
    return null
  }
}

/**
 * Clear table session
 */
export function clearTableSession() {
  localStorage.removeItem(STORAGE_KEY)
}
