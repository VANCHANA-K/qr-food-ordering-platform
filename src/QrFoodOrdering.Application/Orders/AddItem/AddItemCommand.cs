// namespace QrFoodOrdering.Application.Orders.AddItem;

// public sealed record AddItemCommand(
//     Guid OrderId,
//     string ProductName,
//     int Quantity,
//     decimal UnitPrice
// );


namespace QrFoodOrdering.Application.Orders.AddItem;

public sealed record AddItemCommand(
    Guid OrderId,
    string ProductName,
    int Quantity,
    decimal UnitPrice);
