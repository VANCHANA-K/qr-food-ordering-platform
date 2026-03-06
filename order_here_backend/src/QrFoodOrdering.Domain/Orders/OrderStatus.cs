namespace QrFoodOrdering.Domain.Orders;

public enum OrderStatus
{
    Pending = 0,
    Confirmed = 1,
    Cooking = 2,
    Ready = 3,
    Served = 4,
    Completed = 5,
    Cancelled = 6
}
