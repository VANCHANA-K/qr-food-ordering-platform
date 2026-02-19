namespace QrFoodOrdering.Application.Tables.GetAll;

public sealed record GetAllTablesResult(
    Guid Id,
    string Name,
    string Status
);

