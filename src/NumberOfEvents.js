import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        query: 32
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ query: value });
        if (value <= 0) {
            this.setState({
                infoText: 'Cannot be less than 1'
            });
        } else {
            this.setState({
                infoText: ''
            });
        }
        this.props.updateEvents(null, null, value);
    };

    render() {
        return (
            <div className='numberOfEvents'>
                Displaying: {this.state.query} Events
                <input
                    className='number-of-events'
                    type='number'
                    onChange={this.handleInputChanged}
                    value={this.state.query}
                    placeholder='32'
                />
            </div>
        )
    }
}

export default NumberOfEvents;