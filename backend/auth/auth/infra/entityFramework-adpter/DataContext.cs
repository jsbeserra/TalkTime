using Microsoft.EntityFrameworkCore;


public class DataContext: DbContext {
    public DbSet<Accounts> Accounts {get;set;}
    public DataContext(DbContextOptions<DataContext> options): base (options){

    }

}