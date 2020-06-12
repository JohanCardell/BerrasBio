import React, { Component } from 'react';

export class Showing extends Component {
    static displayName = Showing.name;

    constructor(props) {
        super(props);
        this.state = {
            showing: null,
            title: null,
            availableSeats: [],
            isFullIndicator: null,
            formattedStartTime: null,
            loading: true
        };
    }

    componentDidMount() {
        this.populateShowingData();
    }

    render() {
        return (
            <React.Fragment>
                <td className={this.state.isFullIndicator}>{this.state.formattedStartTime}</td>
                <td className={this.state.isFullIndicator}>{this.state.title}</td>
                <td className={this.state.isFullIndicator}>{this.state.availableSeats.length}</td>
            </React.Fragment >
        );
    }

    populateShowingData() {
        const formattedTime = new Date(this.props.showing.startTime).toLocaleTimeString()
        const filteredSeats = this.props.showing.seats.filter(seat => seat.isBooked === false);
        let className;
        if (filteredSeats.length === 0) {
            className = "unavailable";
        } else {
            className = "available";
        }
        console.log(className);
        this.setState({
            showing: this.props.showing,
            title: this.props.showing.movie.title,
            availableSeats: filteredSeats,
            isFullIndicator: className,
            formattedStartTime: formattedTime,
            loading: false
        });
    }

   
}
export default Showing;

//function FormattedStartTime(props) {
//    const formattedTime = new Date(props.time).toLocaleTimeString();
//    return <td>{formattedTime}</td>;
//}
