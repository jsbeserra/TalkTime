public class CreateAccount : UseCase<InputCreateAccount, object>
{
    private UsersRepository repository;
    private HashPassword hashPassword;
    public CreateAccount(UsersRepository repository, HashPassword hashPassword)
    {
        this.repository = repository;
        this.hashPassword = hashPassword;
    }

    public async Task<object> Handle(InputCreateAccount input)
    {
        Name name = new Name(input.name);
        Username username = new Username(input.username);
        Email email = new Email(input.email);
        Password password = new Password(input.password,this.hashPassword);
        Account account = new Account(name, username, email, password);
        await this.repository.Create(account);
        return null;
    }

}