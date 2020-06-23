import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SeatGrid from './SeatGrid';

export class TicketBooker extends Component {
    static displayName = TicketBooker.name;
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedSeatsList: []
        };

        this.bookSeats = this.bookSeats.bind(this);
    }

    onSeatClick = (selectedSeat) => {
        const { selectedSeatsList } = this.state;

        const indexOfSelectedSeat = selectedSeatsList.map(function (seat) {
            return seat.id;
        }).indexOf(selectedSeat.id);

        let updatedList = new Array(...selectedSeatsList);

        if (indexOfSelectedSeat < 0) {
            updatedList.push(selectedSeat);
        }
        else {
            updatedList.splice(indexOfSelectedSeat, 1);
        }

        this.setState({ selectedSeatsList: updatedList });
    }
     
    bookSeats() {
        const { selectedSeatsList } = this.state;
        const { showing } = this.props;

        this.updateDabase(selectedSeatsList);

        let sortedSeats = selectedSeatsList.sort(function (a, b) {
            return a.number - b.number;
        });

        let tickets = sortedSeats.map(function(seat) {
            return `Row: ${seat.row} Seat: ${seat.number}\n`;
        });

        alert(`Booking confirmed!\n${showing.movie.title} at ${new Date(showing.startTime).toLocaleTimeString()} \n${tickets.join('')}`);
    }
   
    handleClose = () => {
        this.setState({
            showModal: false,
            selectedSeatsList: []
        })
    }

    handleShow = () => {
        this.setState({
            showModal: true
        })
    }

    render() {
        const { selectedSeatsList, showModal } = this.state;

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Ticket Booking
                </Button>

                <Modal className="align-items-center text-centered" centered="true" show={showModal} onHide={this.handleClose} animation={true}>
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
                        <Button variant="primary" hidden={selectedSeatsList.length === 0} onClick={() => {
                            this.handleClose();
                            this.bookSeats(this, selectedSeatsList);
                        }}>
                            Confirm
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    async updateDabase(seats) {
        const response = await fetch(`api/seat`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(seats)
        });
        console.log(response);
    }
}

export default TicketBooker;
