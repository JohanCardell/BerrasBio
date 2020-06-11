using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BerrasBio.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public bool IsReserved { get; set; } = false;

        public virtual Showing Showing { get; set; }
        public int ShowingId { get; set; }

        public virtual Seat Seat { get; set; }
        public int SeatId { get; set; }
    }
}
