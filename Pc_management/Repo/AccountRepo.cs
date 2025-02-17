using BO.Models;
using DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repo
{
    public class AccountRepo : IAccountRepo
    {
        public async Task<bool> AddAccount(Account account)
        {
            return await AccountDAO.Instance.AddAccount(account);
        }

        public async Task<bool> DeleteAccount(int id)
        {
            return await AccountDAO.Instance.DeleteAccount(id);
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
            return await AccountDAO.Instance.GetAccountByEmail(email);
        }

        public async Task<Account> GetAccountByUserID(int userid)
        {
           return await AccountDAO.Instance.GetAccountByUserID(userid);
        }

        public async Task<Account> GetAccountLogin(string email, string password)
        {
            return await AccountDAO.Instance.GetAccountLogin(email, password);
        }

        public async Task<List<Account>> GetAllAccountsAsync()
        {
            return await AccountDAO.Instance.GetAllAccountsAsync();
        }

        public async Task<bool> UpdateStatusById(int accountId, string newStatus)
        {
            return await AccountDAO.Instance.UpdateStatusById(accountId, newStatus);
        }
    }
}
