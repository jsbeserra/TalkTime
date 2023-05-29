public class AccountRepositoryAdpterEntityFramework:UsersRepository
{   
    private DataContext dbcontext;
    public AccountRepositoryAdpterEntityFramework (DataContext dbcontext){
        this.dbcontext = dbcontext;
    }

    public async Task<bool> Create(Account account)
    {
        AccountModel model = new AccountModel(){
            username = account.username.value,
            name = account.name.value,
            email = account.email.value,
            password = account.password.value
        };
       this.dbcontext._AccountModel.Add(model);
       int affectedRows = await this.dbcontext.SaveChangesAsync();
       return affectedRows > 0;
    }
}