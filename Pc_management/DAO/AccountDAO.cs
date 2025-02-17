using BO.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class AccountDAO
    {
        private Pc_managementContext _context;
        private static AccountDAO instance = null;

        public static AccountDAO Instance 
        {
            get
            {
                if (instance == null)
                {
                    instance = new AccountDAO();
                }
                return instance;
            }
        }
        public AccountDAO() 
        {
            _context = new Pc_managementContext();
        }
        public async Task<Account> GetAccountLogin(string email, string password)
        {
            return await _context.Accounts.SingleOrDefaultAsync(m => m.Email.Equals(email) && m.Password.Equals(password));
        }

        public async Task<Account> GetAccountByEmail(string email)
        {
            return await _context.Accounts.SingleOrDefaultAsync(m => m.Email.Equals(email));
        }

        public async Task<Account> GetAccountByUserID(int userid)
        {
            try
            {
                return await _context.Accounts.SingleOrDefaultAsync(m => m.Accountid == userid);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error retrieving account by ID: {ex.Message}");
                throw; // Rethrow the exception to be handled higher up
            }
        }
        // Create
        public async Task<bool> AddAccount(Account account)
        {
            // Log the account details
            Console.WriteLine($"Adding account: {account.Username}, {account.Email}");

            var acc = await GetAccountByUserID(account.Accountid);
            if (acc != null) return false;

            try
            {
                await _context.Accounts.AddAsync(account);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error adding account: {ex.Message}");
                throw; // Rethrow the exception to be handled higher up
            }
        }

        // Read
        public async Task<List<Account>> GetAllAccountsAsync()
        {
            return await _context.Accounts.ToListAsync();
        }

        // Delete
        public async Task<bool> DeleteAccount(int id)
        {
            var acc = await GetAccountByUserID(id);
            if (acc == null) return false;

            try
            {
                _context.Accounts.Remove(acc);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> UpdateStatusById(int accountId, string newStatus)
        {
            try
            {
                var existingAccount = await GetAccountByUserID(accountId);
                if (existingAccount == null) return false;

                existingAccount.Status = newStatus;
                existingAccount.Createdat = DateTime.SpecifyKind(existingAccount.Createdat ?? DateTime.Now, DateTimeKind.Local); // Ensure it's local

                _context.Entry(existingAccount).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error updating account status: {ex.Message}");
                throw; // Rethrow the exception to be handled higher up
            }
        }

        // Update by User
        public async Task<bool> UpdateAccountByUser(Account newAccountData)
        {
            try
            {
                var existingAccount = await GetAccountByUserID(newAccountData.Accountid);
                if (existingAccount == null) return false;

                existingAccount.Email = newAccountData.Email;
                existingAccount.Password = newAccountData.Password;

                _context.Entry(existingAccount).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<Account> GetAccountDetailsByIdAsync(int accountId)
        {
            try
            {
                return await _context.Accounts
                    .Include(a => a.Orders)
                        .ThenInclude(o => o.Orderdetails)
                    .FirstOrDefaultAsync(a => a.Accountid == accountId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving account details: {ex.Message}");
                throw;
            }
        }
    }
}
