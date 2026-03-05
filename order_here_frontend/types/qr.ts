/**
 * QR Resolve API
 * GET /api/v1/qr/{token}
 */
export interface QrResolveResponse {
  tableId: string;
  tableCode: string;
}

/**
 * Standard Error Contract
 * ใช้กับ middleware backend
 */
export interface ApiErrorResponse {
  errorCode: string;
  message: string;
  traceId?: string;
}

/**
 * QR Error Codes
 * sync กับ backend
 */
export type QrErrorCode =
  | "QR_NOT_FOUND"
  | "QR_EXPIRED"
  | "QR_INACTIVE"
  | "TABLE_INACTIVE";

/**
 * Type Guard
 */
export function isApiError(obj: unknown): obj is ApiErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "errorCode" in obj &&
    "message" in obj
  );
}
