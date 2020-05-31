import React, { Component } from 'react';

class Event extends Component {
    state = {
        showDetails: false,
    }

    handleShowDetails = () => {
        if (this.state.showDetails === false) {
            this.setState({ showDetails: true });
        }
        else {
            this.setState({ showDetails: false });
        }
    }

    render() {
        const { event } = this.props;

        return (
            <div className='event'>
                <div className='eventName'>{event.name}</div>
                <div className='eventDate'>{event.local_date}</div>
                <div className='eventTime'>{event.local_time}</div>
                <div className='eventLocationAddress'>{event.venue.address_1}</div>
                <div className='eventLocationCity'>{event.venue.city}</div>
                <button className='eventDetailsButton' onClick={this.handleShowDetails}>Show Details</button>
            </div>
        );
    }
}

export default Event;