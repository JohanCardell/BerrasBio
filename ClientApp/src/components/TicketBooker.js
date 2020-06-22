import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SeatGrid from './SeatGrid';

import Form from 'react-bootstrap/Form';

export class TicketBooker extends Component {
    static displayName = TicketBooker.name;
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedSeatsList: [],
            //confirmationMessage: "Tickets\n"
        };
        this.commitBooking = this.commitBooking.bind(this);
        //this.concatSeatDetails = this.concatSeatDetails.bind(this);
    }

    onSeatClick = (selectedSeat) => {
        const { selectedSeatsList } = this.state;
        const indexOfSelectedSeat = selectedSeatsList.indexOf(selectedSeat);
        let updatedList = new Array(...selectedSeatsList);
        if (indexOfSelectedSeat < 0) {
            updatedList.push(selectedSeat)
        }
        else {
            updatedList.splice(indexOfSelectedSeat, 1)
        }
        this.setState({ selectedSeatsList: updatedList });
        console.log(selectedSeatsList);
    }
     
    commitBooking() {
        this.bookTickets(this.state.selectedSeatsList);
        //this.state.selectedSeatsList.forEach(this.concatSeatDetails);
        //this.state.selectedSeatsList.map(this.concatSeatDetails);
        //this.props.fetchMovieData();
        let tickets = this.state.selectedSeatsList.map(function(seat) {
            return `Row: ${seat.row} Number: ${seat.number}\n`;
        });
        alert(`Booking successful! Here are your tickets: \n${this.props.showing.movie.title} at ${new Date(this.props.showing.startTime).toLocaleTimeString()} \n${tickets.join('')}`);
        this.setState({
            selectedSeatsList: []
        })
    }

    //concatSeatDetails(seat) {
    //    if (this.state.confirmationMessage === null) {
    //        this.setState({
    //            confirmationMessage: "Tickets\n"
    //        });
    //    }
    //    let updatedMessage = this.state.confirmationMessage + `Row: ${seat.row} Number: ${seat.number} \n`;
    //    console.log(updatedMessage);
    //    this.setState({
    //        confirmationMessage: updatedMessage
    //    });
    //}

    concatSeas(seat) {
        return `Row: ${seat.row} Number: ${seat.number} \n`;
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    render() {
    
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Ticket Booking
                </Button>

                <Modal className="align-items-center text-centered" centered={true} show={this.state.showModal} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select seats</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SeatGrid seats={this.props.seats} onSeatClick={this.onSeatClick} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={() => {
                            this.handleClose();
                            this.commitBooking(this, this.state.selectedSeatsList);
                        }}>
                            Confirm
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    async bookTickets(seats) {
        const response = await fetch(`api/seat`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seats
                //id: seat.Id,
                //number: seat.Number,
                //row: seat.Row,
                //isBooked: true,
                //showingId: seat.ShowingId
                )
        });
    }
}

export default TicketBooker;
