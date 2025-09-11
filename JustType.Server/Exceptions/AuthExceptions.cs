namespace JustType.Server.Exceptions
{
    public class AuthException : Exception
    {
        public AuthException(string message) : base(message) { }
        public AuthException(string message, Exception innerException) : base(message, innerException) { }
    }

    public class UserNotFoundException : AuthException
    {
        public UserNotFoundException(string identifier)
            : base($"User with identifier '{identifier}' not found") { }
    }

    public class InvalidPasswordException : AuthException
    {
        public InvalidPasswordException(string identifier)
            : base($"Invalid password for user '{identifier}'") { }
    }

    public class UserNotActiveException : AuthException
    {
        public UserNotActiveException(string identifier)
            : base($"User '{identifier}' is not active") { }
    }

    public class UserAlreadyExistsException : AuthException
    {
        public UserAlreadyExistsException(string message) : base(message) { }
    }

    public class InvalidRefreshTokenException : AuthException
    {
        public InvalidRefreshTokenException()
            : base("Invalid or expired refresh token") { }
    }
}