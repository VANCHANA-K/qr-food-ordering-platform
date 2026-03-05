namespace QrFoodOrdering.Application.Menu.GetByTable;

public sealed record GetMenuByTableResult(
    Guid Id,
    string Code,
    string Name,
    decimal Price,
    bool IsAvailable
);
