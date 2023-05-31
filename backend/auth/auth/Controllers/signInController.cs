using Microsoft.AspNetCore.Mvc;


namespace auth.Controllers;

[ApiController]
[Route("[controller]")]
public class SignInController : ControllerBase
{

    [HttpPost(Name = "signin")]
    public async Task<IActionResult> CreateAccount(InputSingIn input, [FromServices] DataContext dbContext)
    {
        SingInFactory signinFactory = new SingInFactory(dbContext);
        OutputSingIn output = await signinFactory.singIn.Handle(input);
        return Ok(output);
    }
}
