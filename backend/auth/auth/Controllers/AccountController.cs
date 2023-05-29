using Microsoft.AspNetCore.Mvc;


namespace auth.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{

    [HttpPost(Name = "account")]
    public async Task<OkResult> CreateAccount(InputCreateAccount input, [FromServices] DataContext dbContext)
    {
        CreateAccountFactory accountFactory = new CreateAccountFactory(dbContext);
        await accountFactory.crateAccount.Handle(input);
        return Ok();
    }
}
