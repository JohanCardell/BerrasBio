import React, { Component } from 'react';
import TicketBooker from './TicketBooker';


export class Showing extends Component {
    static displayName = Showing.name;

    constructor(props) {
        super(props);
        this.state = {
            allSeats: [],
            availableSeats: [],
            availability: null,
            startTime: null,
        };
    }

    componentDidMount() {
        this.populateShowingData();
    }

    componentDidUpdate() {
        this.populateShowingData();
    }

    render() {

        return (
            <>
            <tr key={this.props.showing.id} className={this.state.availability}>
                <td>{this.state.startTime}</td>
                <td>{this.props.showing.movie.title}</td>
                <td>{this.state.availableSeats.length}</td>
                <td>
                        {this.state.availableSeats.length > 0 &&
                            <TicketBooker seats={this.state.allSeats} fetchMovieData={this.props.fetchMovieData}/>
                    }
                </td>
                </tr>
            </>
        );
    }

    async populateShowingData() {
        const response = await fetch(`api/seat/${this.props.showing.id}`);
        const seatsData = await response.json();
        const filteredSeats = seatsData.filter(seat => seat.isBooked === false);

        const formattedStartTime = new Date(this.props.showing.startTime).toLocaleTimeString()

        let className = "available";
        if (filteredSeats.length === 0) {
            className = "unavailable";
        }
        else if (filteredSeats.length < seatsData.length / 2) {
            className = "limited";
        }

        this.setState({
            allSeats: seatsData,
            availableSeats: filteredSeats,
            availability: className,
            startTime: formattedStartTime,
        });
    }
}

export default Showing;

