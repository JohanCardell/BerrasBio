using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BerrasBio.Data;
using BerrasBio.Models;

namespace BerrasBio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowingController : ControllerBase
    {
        private readonly CinemaContext _context;

        public ShowingController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Showing
        [HttpGet]
        public ActionResult<IEnumerable<Showing>> GetShowings()
        {
            return _context.Showings.Include(s => s.Movie).Include(s => s.Seats).ToList().OrderBy(s => s.StartTime).ToList();
        }
    }
}
