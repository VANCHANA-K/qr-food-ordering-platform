using System.Net;
using QrFoodOrdering.Api.Contracts.Common;
using QrFoodOrdering.Domain.Common;

namespace QrFoodOrdering.Api.Middleware;

public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (DomainException ex)
        {
            await WriteErrorAsync(
                context,
                HttpStatusCode.Conflict,
                "DOMAIN_RULE_VIOLATION",
                ex.Message);
        }
        catch (ArgumentException ex)
        {
            await WriteErrorAsync(
                context,
                HttpStatusCode.BadRequest,
                "INVALID_ARGUMENT",
                ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            await WriteErrorAsync(
                context,
                HttpStatusCode.NotFound,
                "RESOURCE_NOT_FOUND",
                ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");

            await WriteErrorAsync(
                context,
                HttpStatusCode.InternalServerError,
                "INTERNAL_ERROR",
                "An unexpected error occurred.");
        }
    }

    private static async Task WriteErrorAsync(
        HttpContext context,
        HttpStatusCode statusCode,
        string code,
        string message)
    {
        var traceId = context.Items["X-Trace-Id"]?.ToString()
                      ?? context.TraceIdentifier;

        var response = new ApiErrorResponse(
            new ApiError(code, message, traceId));

        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsJsonAsync(response);
    }
}
