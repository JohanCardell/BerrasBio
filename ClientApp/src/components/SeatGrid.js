import React, { Component } from 'react';
import SeatItem from './SeatItem';


export class SeatGrid extends Component {
    static displayName = SeatGrid.name;

    constructor(props) {
        super(props);
        this.state = {
            //selectedSeatsList: []
        };
        this.onSeatClick = this.onSeatClick.bind(this)
    }

    onSeatClick(seat) {
        this.props.onSeatClick(seat);
    }

    render() {

        const firstRowSeats = this.props.seats.filter(s => s.row === 1);
        const secondRowSeats = this.props.seats.filter(s => s.row === 2);
        const thirdRowSeats = this.props.seats.filter(s => s.row === 3);
        const fourthRowSeats = this.props.seats.filter(s => s.row === 4);
        const fifthRowSeats = this.props.seats.filter(s => s.row === 5);


        return (
            <> 
            <div className="mr-2" key={1}>
                {firstRowSeats.map((seat, index) => (
                    <SeatItem
                        key={index}
                        seat={seat}
                        onSeatClick={this.onSeatClick}
                    />
                  ))}
            </div>
            <br />
            <div className="mr-2" key={2}>
                {secondRowSeats.map((seat, index) => (
                    <SeatItem
                        key={index}
                        seat={seat}
                        onSeatClick={this.onSeatClick}
                    />
                ))}
            </div>
            <br />

            <div className="mr-2" key={3}>
                 {thirdRowSeats.map((seat, index) => (
                    <SeatItem
                        key={index}
                        seat={seat}
                        onSeatClick={this.onSeatClick}
                    />
                ))}
            </div>
            <br />

            <div className="mr-2" key={4}>
                    {fourthRowSeats.map((seat, index) => (
                    <SeatItem
                        key={index}
                        seat={seat}
                        onSeatClick={this.onSeatClick}
                    />
                ))}
            </div>
            <br/>

            <div className="mr-2" key={5}>
                    {fifthRowSeats.map((seat, index) => (
                    <SeatItem
                        key={index}
                        seat={seat}
                        onSeatClick={this.onSeatClick}
                    />
                ))}
            </div>
            <br />
          </>
        );
    }
}



export default SeatGrid;


    //const [checked, setChecked] = useState(false);

    //const firstRowSeats = props.seats.filter(s => s.row === 1);
    //const secondRowSeats = props.seats.filter(s => s.row === 2);
    //const thirdRowSeats = props.seats.filter(s => s.row === 3);
    //const fourthRowSeats = props.seats.filter(s => s.row === 4);
    //const fifthRowSeats = props.seats.filter(s => s.row === 5);

//return (
//    <ButtonToolbar aria-label="Toolbar with button groups">
//        <ButtonGroup className="mr-2" key={1}>
//            {firstRowSeats.map(seat =>
//                <ToggleButton
//                    type="checkbox"
//                    variant="secondary"
//                    checked={checked}
//                    value={seat.number}
//                    onChange={(e) => setChecked(e.currentTarget.checked)}
//                >{seat.number}</ToggleButton>

//            )}
//        </ButtonGroup>
//        <br />
//        <ButtonGroup className="mr-2" key={2}>
//            {secondRowSeats.map(seat =>
//                <button>{seat.number}</button>
//            )}
//        </ButtonGroup>
//        <br />
//        <ButtonGroup className="mr-2" key={3}>
//            {thirdRowSeats.map(seat =>
//                <button>{seat.number}</button>
//            )}
//        </ButtonGroup>
//        <br />
//        <ButtonGroup className="mr-2" key={4}>
//            {fourthRowSeats.map(seat =>
//                <button>{seat.number}</button>
//            )}
//        </ButtonGroup>
//        <br />
//        <ButtonGroup className="mr-2" key={5}>
//            {fifthRowSeats.map(seat =>
//                <button>{seat.number}</button>
//            )}
//        </ButtonGroup>
//    </ButtonToolbar>
//);

