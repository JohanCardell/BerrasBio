using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BerrasBio.Data;
using BerrasBio.Models;
using Microsoft.Data.SqlClient;

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

        // GET: api/Seat
        [HttpGet]
        public ActionResult<IEnumerable<Seat>> GetSeats()
        {
            return _context.Seats.ToList().OrderBy(s => s.Row).ThenBy(s => s.Number).ToList();
        }

        // GET: api/Seat/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Seat>> GetShowingSeats(int id)
        {

            return _context.Seats.Where(s => s.ShowingId == id).ToList().OrderBy(s => s.Row).ThenBy(s => s.Number).ToList();
        }

        // PUT: api/Seat/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeat([FromRoute] int id, [FromBody] Seat seat)
        {
            if (id != seat.Id)
            {
                return BadRequest();
            }

            _context.Entry(seat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateSeats([FromBody] List<Seat> seats )
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

        // POST: api/Seat
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Seat>> PostSeat(Seat seat)
        {
            _context.Seats.Add(seat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeat", new { id = seat.Id }, seat);
        }

        // DELETE: api/Seat/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Seat>> DeleteSeat(int id)
        {
            var seat = await _context.Seats.FindAsync(id);
            if (seat == null)
            {
                return NotFound();
            }

            _context.Seats.Remove(seat);
            await _context.SaveChangesAsync();

            return seat;
        }

        private bool SeatExists(int id)
        {
            return _context.Seats.Any(e => e.Id == id);
        }
    }
}
