using BO.Models;
using DAO;
using Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepo _accountRepo;
        public AccountService()
        {
            _accountRepo = new AccountRepo();
        }

        public async Task<bool> AddAccount(Account account)
        {
           return await _accountRepo.AddAccount(account);
        }

        public async Task<bool> DeleteAccount(int id)
        {
            return await _accountRepo.DeleteAccount(id);
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
           return await _accountRepo.GetAccountByEmail(email);
        }

        public async Task<Account> GetAccountByUserID(int userid)
        {
            return await _accountRepo.GetAccountByUserID(userid);
        }

        public async Task<Account> GetAccountLogin(string email, string password)
        {
           return await _accountRepo.GetAccountLogin(email, password);
        }

        public async Task<List<Account>> GetAllAccountsAsync()
        {
            return await _accountRepo.GetAllAccountsAsync();
        }
        public async Task<bool> UpdateStatusById(int accountId, string newStatus)
        {
            return await _accountRepo.UpdateStatusById(accountId, newStatus);
        }
    }
}
