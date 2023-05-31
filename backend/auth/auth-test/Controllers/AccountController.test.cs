using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;


    public class AccountControllerTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public AccountControllerTest(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact(DisplayName = "Should not create Account and return BadRequest")]
        public async Task ShouldNotCreateAccountReturnBadRequest()
        {
            var payload = new
            {
                name = "string",
                username = "string",
                email = "string",
                password = "string"
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "/Account");
            request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await _client.SendAsync(request);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }


        [Fact(DisplayName = "Should Create Account and return Ok")]
        public async Task ShouldCreateAccountReturnOk()
        {
            var payload = new
            {
                name = "fakeName",
                username = "fakeUsernameX",
                email = "fake@email.com",
                password = "Fake@123"
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "/Account");
            request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await _client.SendAsync(request);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }

