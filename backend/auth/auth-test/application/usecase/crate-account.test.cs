using Microsoft.EntityFrameworkCore;

public class CreateUserTest
{
    public CreateUserTest() { }

    [Fact(DisplayName = "Should Account")]
    public async void ShouldCreateAccount()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        var options = new DbContextOptionsBuilder<DataContext>()
            .UseInMemoryDatabase(databaseName: "YourDatabaseName")
            .Options;
        DataContext dbcontext = new DataContext(options);
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        CreateAccount crateuser = new CreateAccount(repository,hashPassword);
        InputCreateAccount input = new InputCreateAccount("fakeName","faleUsername","Fake@email.com","fakePass@123");
        var result = await crateuser.Handle(input);
        Assert.Null(result);
    }

}