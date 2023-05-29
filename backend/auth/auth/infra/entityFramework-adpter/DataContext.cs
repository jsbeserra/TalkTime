using Microsoft.EntityFrameworkCore;


public class DataContext: DbContext {
    public DbSet<AccountModel> _AccountModel {get;set;}
    public DataContext(DbContextOptions<DataContext> options): base (options){

    }

}