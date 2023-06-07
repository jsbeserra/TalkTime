using Microsoft.EntityFrameworkCore;

public class SigninUserTest
{
    private DataContext dbcontext;
    public SigninUserTest()
    {
        var options = new DbContextOptionsBuilder<DataContext>()
                    .UseInMemoryDatabase(databaseName: "fakeDatabaseContext")
                    .Options;
        dbcontext = new DataContext(options);
    }

    private void ClearAccounts(){
        var registros = dbcontext.Accounts.ToList();
        dbcontext.RemoveRange(registros);
        dbcontext.SaveChangesAsync();
    }



    [Fact(DisplayName = "Should sign-in")]
    public async void ShouldCreateAccount()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        HashPassword hasher = new HashPasswordBcryptAdpter();
        Account account = new Account(new Name("teste"), new Username("testeUsername"), new Email("teste@email"), new Password("4002@Pxx"), hasher.GenerateSalt());
        await repository.Create(account);
        TokenManager tokenManager = new TokenManagerAdpter();
        SingIn singIn = new SingIn(repository, hashPassword, tokenManager);
        InputSingIn input = new InputSingIn("teste@email", "4002@Pxx");
        var result = await singIn.Handle(input);

        Assert.Equal(result.name, "teste");
        Assert.Equal(result.username, "testeUsername");
        Assert.Equal(result.email, "teste@email");
        Assert.NotNull(result.token);
        ClearAccounts();
    }

    [Fact(DisplayName = "Should login fail if password is different and return account not found")]
    public async void ShouldLoginFailIfPasswordIsDifferentAndReturnAccountNotFound()
    {
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        AccountRepositoryAdpterEntityFramework repository = new AccountRepositoryAdpterEntityFramework(dbcontext);
        HashPassword hasher = new HashPasswordBcryptAdpter();
        Account account = new Account(new Name("teste"), new Username("testeUsername"), new Email("teste@email"), new Password("4002@Pxx"), hasher.GenerateSalt());
        await repository.Create(account);
        TokenManager tokenManager = new TokenManagerAdpter();
        SingIn singIn = new SingIn(repository, hashPassword, tokenManager);
        InputSingIn input = new InputSingIn("teste@email", "580x@Pxx");
        var exception = await Assert.ThrowsAsync<ArgumentException>(async () => await singIn.Handle(input));
        Assert.Equal("Account not found", exception.Message);
    }

}