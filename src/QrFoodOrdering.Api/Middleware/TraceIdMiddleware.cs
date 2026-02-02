// namespace QrFoodOrdering.Api.Middleware;

// public sealed class TraceIdMiddleware
// {
//     private const string HeaderName = "X-Trace-Id";
//     private readonly RequestDelegate _next;

//     public TraceIdMiddleware(RequestDelegate next)
//     {
//         _next = next;
//     }

//     public async Task Invoke(HttpContext context)
//     {
//         if (!context.Request.Headers.TryGetValue(HeaderName, out var traceId))
//         {
//             traceId = Guid.NewGuid().ToString("N");
//             context.Request.Headers[HeaderName] = traceId;
//         }

//         context.Response.Headers[HeaderName] = traceId;
//         context.TraceIdentifier = traceId!;

//         await _next(context);
//     }
// }

// namespace QrFoodOrdering.Api.Middleware;

// public sealed class TraceIdMiddleware : IMiddleware
// {
//     private const string HeaderName = "X-Trace-Id";

//     public async Task InvokeAsync(HttpContext context, RequestDelegate next)
//     {
//         // ถ้า client ส่งมา ใช้อันนั้น, ไม่งั้นสร้างใหม่จาก TraceIdentifier
//         var traceId = context.Request.Headers[HeaderName].ToString();
//         if (string.IsNullOrWhiteSpace(traceId))
//             traceId = context.TraceIdentifier;

//         context.Response.OnStarting(() =>
//         {
//             context.Response.Headers[HeaderName] = traceId;
//             return Task.CompletedTask;
//         });

//         await next(context);
//     }
// }

namespace QrFoodOrdering.Api.Middleware;
public sealed class TraceIdMiddleware
{
    private const string HeaderName = "X-Trace-Id";
    private readonly RequestDelegate _next;

    public TraceIdMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var traceId = Guid.NewGuid().ToString("N");
        context.Response.Headers[HeaderName] = traceId;
        context.Items[HeaderName] = traceId;

        await _next(context);
    }
}
