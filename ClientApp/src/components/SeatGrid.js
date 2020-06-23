import React, { Component } from 'react';
import SeatItem from './SeatItem';


export class SeatGrid extends Component {
    static displayName = SeatGrid.name;

    constructor(props) {
        super(props);

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
                <div className="align-items-center text-centered" centered="true">
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
                </div>
          </>
        );
    }
}

export default SeatGrid;

