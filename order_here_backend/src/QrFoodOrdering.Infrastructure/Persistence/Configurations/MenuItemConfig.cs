using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrFoodOrdering.Domain.Menu;

namespace QrFoodOrdering.Infrastructure.Persistence.Configurations;

public sealed class MenuItemConfig : IEntityTypeConfiguration<MenuItem>
{
    public void Configure(EntityTypeBuilder<MenuItem> builder)
    {
        builder.ToTable("MenuItems");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code).HasMaxLength(32).IsRequired();
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.Price).HasColumnType("decimal(18,2)");

        builder.Property(x => x.IsActive).IsRequired();
        builder.Property(x => x.IsAvailable).IsRequired();

        builder.HasIndex(x => x.Code).IsUnique();
    }
}
