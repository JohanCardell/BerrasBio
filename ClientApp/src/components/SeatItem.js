import React, { Component, } from 'react';
import Button from 'react-bootstrap/Button';


export class SeatItem extends Component {
    static displayName = SeatItem.name;

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

   
    setSelected = () => {
        this.setState({
            isSelected: !this.state.isSelected
        })
    }

    render() {
        const { seat } = this.props;
        return (
            <button
                type="button"
                disabled={seat.isBooked}
                className={` mr-2 seat ${this.state.isSelected ? 'selected' : ''} ${seat.isBooked ? 'booked' : ''} `}
                onClick={() => {
                    this.props.onSeatClick(seat);
                    this.setSelected();
                }}
            >
                {seat.number}
            </button>
        )
    }
}

export default SeatItem;



