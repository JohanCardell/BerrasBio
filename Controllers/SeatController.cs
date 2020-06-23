using BerrasBio.Data;
using BerrasBio.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BerrasBio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly CinemaContext _context;

        public SeatController(CinemaContext context)
        {
            _context = context;
        }

        // GET: api/Seat/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Seat>> GetShowingSeats(int id)
        {

            return _context.Seats.Where(s => s.ShowingId == id).ToList().OrderBy(s => s.Row).ThenBy(s => s.Number).ToList();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateSeats([FromBody] List<Seat> seats)
        {
            foreach (var seat in seats)
            {
                seat.IsBooked = true;

                _context.Entry(seat).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SeatExists(seat.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return NoContent();
        }

        private bool SeatExists(int id)
        {
            return _context.Seats.Any(e => e.Id == id);
        }
    }
}
