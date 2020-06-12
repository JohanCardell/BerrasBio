using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BerrasBio.Models
{
    public class Showing
    {
        public int Id { get; set; }

        public virtual Movie Movie { get; set; }

        public int MovieId { get; set; }

        public DateTime StartTime { get; set; }

        public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();

     
    }
}
