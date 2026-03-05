using QrFoodOrdering.Application.Abstractions;

namespace QrFoodOrdering.Application.Menu.GetByTable;

public sealed class GetMenuByTableHandler
{
    private readonly IMenuRepository _menuRepository;

    public GetMenuByTableHandler(IMenuRepository menuRepository)
    {
        _menuRepository = menuRepository;
    }

    public async Task<IReadOnlyList<GetMenuByTableResult>> Handle(
        GetMenuByTableQuery query,
        CancellationToken ct
    )
    {
        var items = await _menuRepository.GetMenuForTableAsync(query.TableId, ct);

        // BE-40: hide inactive items
        return items
            .Where(x => x.IsActive)
            .Select(x => new GetMenuByTableResult(x.Id, x.Code, x.Name, x.Price, x.IsAvailable))
            .ToList();
    }
}
