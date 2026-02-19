namespace QrFoodOrdering.Application.Tables.UpdateStatus;

public sealed record UpdateTableStatusCommand(Guid TableId, bool Activate);
