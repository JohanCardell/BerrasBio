import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class Showing extends Component {
    static displayName = Showing.name;

    constructor(props) {
        super(props);
        this.state = {
            showing: null,
            title: null,
            availableSeats: [],
            //availability: null,
            startTime: null,
        };
    }

    componentDidMount() {
        this.populateShowingData();
    }

    render() {

        return (
            <>
                <td>{this.state.startTime}</td>
                <td>{this.state.title}</td>
                <td>{this.state.availableSeats.length}</td>
                <td>
                    {this.state.availableSeats.length > 0 &&
                        <TicketBooking seats={this.state.availableSeats} />
                    }
                </td>
            </>
        );
    }

    populateShowingData() {
        const formattedStartTime = new Date(this.props.showing.startTime).toLocaleTimeString()
        const filteredSeats = this.props.showing.seats.filter(seat => seat.isBooked === false);

        //let className = "available";
        //if (filteredSeats.length === 0) {
        //    className = "unavailable";
        //}
        //else if (filteredSeats.length <= this.props.showing.seats.length / 2) {
        //    className = "limited";
        //}

        this.setState({
            showing: this.props.showing,
            title: this.props.showing.movie.title,
            availableSeats: filteredSeats,
            //availability: className,
            startTime: formattedStartTime,
        });
    }

   
}


function TicketBooking(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Ticket Booking
      </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Showing;

