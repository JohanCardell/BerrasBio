using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BerrasBio.Models
{
    public class Seat
    {
        public int Id { get; set; }

        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
