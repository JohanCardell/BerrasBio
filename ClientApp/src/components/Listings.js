﻿import React, { Component } from 'react';
import Showing from './Showing';

export class Listings extends Component {
    static displayName = Listings.name;

    constructor(props) {
        super(props);
        this.state = {
            showings: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateListingsData();
    }

    static renderShowingsTable(showings) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Starts at</th>
                        <th>Title</th>
                        <th>Available Seats</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showings.map(showing =>
                        <tr key={showing.id}
                            className={` ${showing.seats.filter(seat => seat.isBooked === false).length === 0 ? "unavailable" : null}`}
                        >
                            <Showing showing={showing} />
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Listings.renderShowingsTable(this.state.showings);

        return (
            <div>
                <h1 id="tabelLabel" >Current showings</h1>
                {contents}
            </div>
        );
    }

    AvailabilityCheck(showing) {
        const filteredSeats = showing.seats.filter(seat => seat.isBooked === false);

        let className = "available";
        if (filteredSeats.length === 0) {
            className = "unavailable";
        }
        else if (filteredSeats.length <= showing.seats.length / 2) {
            className = "limited";
        }

        return className;
    }

    async populateListingsData() {
        const response = await fetch('api/Showing');
        const data = await response.json();

        console.log(data);
        this.setState({
            showings: data,
            loading: false
        });


    }

}


//function Showing(props) {
//    let formattedTime = new Date(props.showing.startTime).toLocaleTimeString();
//    let availableSeats = (props.showing.seats.filter(seat => seat.isBooked === false)).length;
//    let background = "available";
//    if (availableSeats === 0) {
//        background = "unavailable";
//    }

//    return (
//        <React.Fragment>
//            <td>{formattedTime}</td>
//            <td>{props.showing.movie.title}</td>
//            <td className={background}>{availableSeats}</td>
//        </React.Fragment>
//    );
//}
