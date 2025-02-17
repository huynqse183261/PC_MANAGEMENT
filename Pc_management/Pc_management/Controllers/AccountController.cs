using BO.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pc_management.Models;
using Service;

namespace Pc_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return Unauthorized("Email and password are required.");
            }

            var account = await _accountService.GetAccountLogin(request.Email, request.Password);
            if (account == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(account);
        }

        [HttpGet ("GetAllAccount")]
        public async Task<IActionResult> GetAllAccount()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            var account = await _accountService.GetAccountByUserID(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost("CreateAccountUser")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountDTO accountDto)
        {
            if (accountDto == null || string.IsNullOrEmpty(accountDto.Username) || string.IsNullOrEmpty(accountDto.Email) || string.IsNullOrEmpty(accountDto.Password))
            {
                return BadRequest("Account data is required.");
            }

            // Check if the username already exists
            var existingAccount = await _accountService.GetAccountByEmail(accountDto.Email);
            if (existingAccount != null)
            {
                return BadRequest("An account with this email already exists.");
            }

            var account = new Account
            {
                Username = accountDto.Username,
                Email = accountDto.Email,
                Password = accountDto.Password,
                Createdat = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Local), // Change to local time
                Role = "Customer",
                Status = "active"
            };

            var result = await _accountService.AddAccount(account);
            if (!result)
            {
                return BadRequest("Account already exists.");
            }

            return CreatedAtAction(nameof(GetAccountById), new { id = account.Accountid }, account);
        }

        [HttpPut("UpdateStatusById/{id}")]
        public async Task<IActionResult> UpdateStatusById(int id, [FromBody] string status)
        {
            if (string.IsNullOrEmpty(status))
            {
                return BadRequest("Status is required.");
            }

            var result = await _accountService.UpdateStatusById(id, status);
            if (!result)
            {
                return NotFound("Account not found or status update failed.");
            }

            return Ok(new { message = "Account status updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var result = await _accountService.DeleteAccount(id);
            if (!result)
            {
                return NotFound("Account not found.");
            }

            return Ok(new { message = "Account deleted successfully." });
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(); 

            return Ok(new { message = "Đăng xuất thành công." });
        }
    }
}
