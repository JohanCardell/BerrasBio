import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Showing from './Showing';

export class Listings extends Component {
    static displayName = Listings.name;

    constructor(props) {
        super(props);
        this.state = {
            showings: [],
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchMovieData = this.fetchMovieData.bind(this);
    }

    handleChange(e) {
        this.setState({ showings: e.target.value });
    }
    componentDidMount() {
        this.fetchMovieData();
    }

    static renderShowingsTable(showings) {
        return (
            <Table className="striped bordered hover" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Starts at</th>
                        <th>Title</th>
                        <th>Available Seats</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showings.map((showing, index) =>
                        <Showing key={index} showing={showing} fetchMovieData={this.fetchMovieData}/>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Listings.renderShowingsTable(this.state.showings);

        return (
            <div>
                <h1 id="tabelLabel" >Berras bio</h1>
                {contents}
            </div>
        );
    }

    async fetchMovieData() {
        this.setState({ loading: true })
        const response = await fetch('api/showing');
        const data = await response.json();
        this.setState({
            showings: data,
            loading: false
        });

    }
}
