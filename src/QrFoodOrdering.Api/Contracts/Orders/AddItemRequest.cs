// namespace QrFoodOrdering.Api.Contracts.Orders;

// public sealed record AddItemRequest(
//     string ProductName,
//     int Quantity,
//     decimal UnitPrice
// );

using System.ComponentModel.DataAnnotations;

namespace QrFoodOrdering.Api.Contracts.Orders;

public sealed class AddItemRequest
{
    [Required]
    public string ProductName { get; init; } = string.Empty;

    [Range(1, int.MaxValue)]
    public int Quantity { get; init; }

    [Range(0.01, double.MaxValue)]
    public decimal UnitPrice { get; init; }
}
