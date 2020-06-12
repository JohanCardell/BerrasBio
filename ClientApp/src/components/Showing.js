import React, { Component } from 'react';

export class Showings extends Component {
    static displayName = Showings.name;

    constructor(props) {
        super(props);
        this.state = {
            showing: null,
            selectedShowing: null,
            loading: true
        };
    }

    
    render() {
            return (
                        {props.showings.map(showing =>
                            <tr key={showing.id}>
                                <td>{showing.startTime}</td>
                                <td>{showing.movie.title}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
    }

    async populateShowingsData() {
        const response = await fetch('api/Showing');
        const data = await response.json();
        console.log(data);
        this.setState({
            showings: data,
            loading: false
        });
    }

}

function FormattedDate(props) {
    return <td{props.date.toLocaleTimeString()}</td>;
    }
