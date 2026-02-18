namespace QrFoodOrdering.Api.Contracts.Common;

public sealed record ApiErrorResponse(ApiError Error);

public sealed record ApiError(
    string Code,
    string Message,
    string TraceId);
