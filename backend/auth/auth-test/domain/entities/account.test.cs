public class AccountTest
{
    public AccountTest() { }

    [Fact(DisplayName = "Should create valid Account")]
    public void ShouldCreateValidAccount()
    {
        Name name = new Name("teste");
        Username username = new Username("teste@");
        Email email = new Email("teste@teste.com");
        HashPassword hashPassword = new HashPasswordBcryptAdpter();
        Password password = new Password("1122@xxX",hashPassword);
        Account accountObj = new Account(name,username,email,password);
        Assert.Equal("teste", accountObj.name.value);
        Assert.Equal("teste@", accountObj.username.value);
        Assert.Equal("teste@teste.com", accountObj.email.value);
        Assert.NotNull(accountObj.password.value);
        Assert.NotNull(accountObj.password.salt);
    }
}