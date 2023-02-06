namespace ProAtividade.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        public DbSet<Atividade> Atividades { get; set; }
    }
}