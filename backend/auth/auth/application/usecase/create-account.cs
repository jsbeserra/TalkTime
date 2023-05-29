public class CreateAccount : UseCase<InputCreateAccount,object>
{
    private UsersRepository repository;

    public CreateAccount(UsersRepository repository){
       this.repository = repository;
    }

    public async Task<object> Handle(InputCreateAccount input)
    {
        Name name = new Name(input.name);
        Username username = new Username(input.username);
        Email email = new Email(input.email);
        Password password = new Password(input.password);
        Account account = new Account(name,username,email,password);
        await this.repository.Create(account);
        return null;
    }

}