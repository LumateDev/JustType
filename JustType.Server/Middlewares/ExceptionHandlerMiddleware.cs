using JustType.Server.Exceptions;
using System.Net;
using System.Text.Json;

namespace JustType.Server.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception has occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode code;
            string message;

            switch (exception)
            {
                case UserNotFoundException:
                    code = HttpStatusCode.NotFound;
                    message = exception.Message;
                    break;

                case InvalidPasswordException:
                case InvalidRefreshTokenException:
                    code = HttpStatusCode.Unauthorized;
                    message = exception.Message;
                    break;

                case UserNotActiveException:
                    code = HttpStatusCode.Forbidden;
                    message = exception.Message;
                    break;

                case UserAlreadyExistsException:
                    code = HttpStatusCode.Conflict;
                    message = exception.Message;
                    break;

                case AuthException:
                    code = HttpStatusCode.BadRequest;
                    message = exception.Message;
                    break;

                default:
                    code = HttpStatusCode.InternalServerError;
                    message = "An internal server error has occurred.";
                    break;
            }

            var result = JsonSerializer.Serialize(new { error = message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}