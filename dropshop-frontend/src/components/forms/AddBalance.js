import React, {Component, useState} from 'react';
import {topUpBalance} from "../../api/userApi";


class AddBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconute'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('You successfully added money to your balance: ' );
        event.preventDefault();
        this.props.fetchData();
    }


    render() {


        function onSubmit(data) {
            topUpBalance(data).then(() => {

            })
        }


        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <select onChange={this.handleChange}>
                        {this.props.creditCards.map((card) =>
                            <option value={card.name}>{card.number}</option>
                        )}
                    </select>
                </label>
                <button type="submit" value="Submit" disabled={this.props.creditCards.length === 0} onClick={() => onSubmit(parseInt(this.props.balance))}>Submit</button>
                <input value={this.props.balance} name="balance"
                       onChange={e => this.props.balanceValue(e.target.value)}/>
            </form>
        );
    }
}


export default AddBalance;