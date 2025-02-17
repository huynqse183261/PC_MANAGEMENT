using BO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public interface IAccountService
    {
        Task<Account> GetAccountLogin(string email, string password);
        Task<Account> GetAccountByEmail(string email);
        Task<Account> GetAccountByUserID(int userid);
        Task<bool> AddAccount(Account account);
        Task<bool> UpdateStatusById(int accountId, string newStatus);
        Task<bool> DeleteAccount(int id);
        Task<List<Account>> GetAllAccountsAsync();
    }
}
