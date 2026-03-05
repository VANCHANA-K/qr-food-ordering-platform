namespace QrFoodOrdering.Domain.Menu;

public class MenuItem
{
    public Guid Id { get; private set; }
    public string Code { get; private set; } = default!;
    public string Name { get; private set; } = default!;
    public decimal Price { get; private set; }

    // BE-40
    public bool IsActive { get; private set; } = true; // inactive -> hide
    public bool IsAvailable { get; private set; } = true; // unavailable -> return but disabled

    private MenuItem() { }

    public MenuItem(string code, string name, decimal price)
    {
        Id = Guid.NewGuid();
        Code = code;
        Name = name;
        Price = price;
        IsActive = true;
        IsAvailable = true;
    }

    public void Deactivate() => IsActive = false;
    public void SetAvailability(bool isAvailable) => IsAvailable = isAvailable;
}
