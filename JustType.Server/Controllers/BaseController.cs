using Microsoft.AspNetCore.Mvc;

namespace JustType.Server.Controllers
{
    public class BaseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
