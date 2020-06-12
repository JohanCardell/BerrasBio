using BerrasBio.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BerrasBio.Data
{
    public class CinemaContext: DbContext
    {
        public CinemaContext(DbContextOptions<CinemaContext> options) : base(options)
        {
        }

        public DbSet <Showing> Showings { get; set; }
        public DbSet <Movie> Movies { get; set; }
        public DbSet <Seat> Seats { get; set; }

    }
}
