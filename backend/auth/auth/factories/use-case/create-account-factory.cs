public class CreateAccountFactory
{
    public CreateAccount crateAccount {get;}
    public CreateAccountFactory(DataContext dbcontext){
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        this.crateAccount = new CreateAccount(repository);
    }
}