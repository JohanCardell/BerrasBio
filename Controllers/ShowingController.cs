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
        public async Task<ActionResult<IEnumerable<Showing>>> GetShowings()
        {
            return await _context.Showings.ToListAsync();
        }

        // GET: api/Showing/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Showing>> GetShowing(int id)
        {
            var showing = await _context.Showings.FindAsync(id);

            if (showing == null)
            {
                return NotFound();
            }

            return showing;
        }

        // PUT: api/Showing/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShowing(int id, Showing showing)
        {
            if (id != showing.Id)
            {
                return BadRequest();
            }

            _context.Entry(showing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShowingExists(id))
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

        // POST: api/Showing
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Showing>> PostShowing(Showing showing)
        {
            _context.Showings.Add(showing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShowing", new { id = showing.Id }, showing);
        }

        // DELETE: api/Showing/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Showing>> DeleteShowing(int id)
        {
            var showing = await _context.Showings.FindAsync(id);
            if (showing == null)
            {
                return NotFound();
            }

            _context.Showings.Remove(showing);
            await _context.SaveChangesAsync();

            return showing;
        }

        private bool ShowingExists(int id)
        {
            return _context.Showings.Any(e => e.Id == id);
        }
    }
}
