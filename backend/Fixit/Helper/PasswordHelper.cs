using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Fixit.API.Helper
{
    public class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            // Skapa en 128-bitars salt
            byte[] emptySalt = new byte[0];

            // Skapa hash med PBKDF2
            string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: emptySalt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hash;
        }

        public static bool VerifyPassword(string inputPassword, string storedHash)
        {
            string hash = HashPassword(inputPassword);

            return hash == storedHash;
        }
    }
}
