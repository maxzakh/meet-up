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
                <div>{event.local_date} {event.local_time}</div>
                <div className='eventName name'>{event.name}</div>
                {event.group && event.group.name && <div className='group-name'>Group: {event.group.name}</div>}
                <div className='eventLocationAddress'>{(event.venue && event.venue.address_1) || ''}</div>
                <div className='eventLocationCity'>{(event.venue && event.venue.city) || ''}</div>
                <button className='eventDetailsButton details-btn' onClick={this.handleShowDetails}>Show Details</button>
            </div>
        );
    }
}

export default Event;