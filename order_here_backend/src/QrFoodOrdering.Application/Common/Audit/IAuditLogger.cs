namespace QrFoodOrdering.Application.Common.Audit;

public interface IAuditLogger
{
    Task LogAsync(string action, Guid subjectId, object data, CancellationToken ct);
}
