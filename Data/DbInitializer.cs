using BerrasBio.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

namespace BerrasBio.Data
{
    public static class DbInitializer
    {
        public static void Initialize(CinemaContext context)
        {
            context.Database.EnsureCreated();

            if (context.Showings.Any())
            {
                return; 
            }

            // Seed Movies
            var moviesSeed = new Movie[]
            {
                new Movie{Title="Star Wars: A New Hope"},
                new Movie{Title="The Matrix"},
                new Movie{Title="The Boondock Saints"}
            };

            context.AddRange(moviesSeed);
            context.SaveChanges();

            // Seed showings
            var showingsSeed = new Showing[]
            {
                new Showing{MovieId = 1, StartTime = DateTime.Parse("16:00")},
                new Showing{MovieId = 2, StartTime = DateTime.Parse("18:00")},
                new Showing{MovieId = 3, StartTime = DateTime.Parse("20:00")}
            };

            context.AddRange(showingsSeed);
            context.SaveChanges();

            // Seed seats
            var seatsSeed = new List<Seat>();
            for (int showingId = 1; showingId < 4; showingId++)
            {
                for (int row = 1; row < 6; row++)
                {
                    for (int seatInRow = 1; seatInRow < 11; seatInRow++)
                    {
                        seatsSeed.Add(new Seat { ShowingId = showingId, Row = row, Number = ((10 * (row-1)) + seatInRow )});
                    }
                }
               
            }
            
            context.AddRange(seatsSeed);
            context.SaveChanges();

            // Reserve some tickets for one showing
            var firstShowing = context.Showings.Find(1);
            for (int i = 0; i < 35; i++)
            {
                firstShowing.Seats.ElementAt(i).IsBooked = true;
            }

            // Reserve all tickets for another showing
            var secondShowing = context.Showings.Find(2);
            foreach (Seat s in secondShowing.Seats)
            {
                s.IsBooked = true;
            }

            context.SaveChanges();
        }
    }
}