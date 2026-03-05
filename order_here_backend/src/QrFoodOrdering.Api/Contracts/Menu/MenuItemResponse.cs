namespace QrFoodOrdering.Api.Contracts.Menu;

public sealed record MenuItemResponse(
    Guid Id,
    string Code,
    string Name,
    decimal Price,
    bool IsAvailable
);
