namespace BerrasBio.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Row { get; set; }
        public bool IsBooked { get; set; } = false;
        public int ShowingId { get; set; }

    }
}
