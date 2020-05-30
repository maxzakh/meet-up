import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        query: 32
    };

    render() {
        return (
            <div>{this.state.query}</div>
        )
    }
}

export default NumberOfEvents;