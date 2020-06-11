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
            var movies = new Movie[]
            {
                new Movie{Title="Star Wars: A New Hope"},
                new Movie{Title="The Matrix"},
                new Movie{Title="The Boondock Saints"}
            };

            context.AddRange(movies);
            context.SaveChanges();

            // Seed showings
            var showings = new Showing[]
            {
                new Showing{MovieId = 1, StartTime = DateTime.Parse("16:00")},
                new Showing{MovieId = 2, StartTime = DateTime.Parse("18:00")},
                new Showing{MovieId = 3, StartTime = DateTime.Parse("20:00")}
            };

            context.AddRange(showings);
            context.SaveChanges();

            // Seed seats
            var seats = new List<Seat>();
            for (int i = 0; i < 50; i++)
            {
                seats.Add(new Seat());
            }

            context.Seats.AddRange(seats);
            context.SaveChanges();

            // Seed default tickets
            var tickets = new List<Ticket>();

            foreach (Showing s in showings)
            {
                for (int i = 1; i < 50+1; i++)
                {
                    tickets.Add(new Ticket {ShowingId = s.Id, SeatId = i });
                }
            }

            context.Tickets.AddRange(tickets);
            context.SaveChanges();

            // Reserve some tickets for one showing
            var firstMovieTicketsReservations = context.Tickets.ToList().Where(t => t.ShowingId == 1);

            for (int i = 1; i < 35; i++)
            {
                firstMovieTicketsReservations.ElementAt(i).IsReserved = true;
            }

            // Reserve all tickets for another showing
            var secondMovieTicketsReservations = context.Tickets.ToList().Where(t => t.ShowingId == 2);

            foreach (Ticket t in secondMovieTicketsReservations)
            {
                t.IsReserved = true;
            }

            context.SaveChanges();
        }
    }
}