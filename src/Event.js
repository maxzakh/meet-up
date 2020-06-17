import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Line, Tooltip } from 'recharts';

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

    getData = () => {
        const taken = this.props.event.yes_rsvp_count;
        const limit = this.props.event.rsvp_limit;
        const available = limit - this.props.event.yes_rsvp_count;

        return [
            { name: "Spots Taken", value: taken },
            { name: "Spots available", value: available },
        ];
    }

    render() {
        const { event } = this.props;
        const colors = ["#505160", "#AEBD38"];

        return (
            <div className='event'>
                <div>{event.local_date} {event.local_time}</div>
                <div className='eventName name'>{event.name}</div>
                {event.group && event.group.name && <div className='group-name'>Group: {event.group.name}</div>}
                <div className='eventLocationAddress'>{(event.venue && event.venue.address_1) || ''}</div>
                <div className='eventLocationCity'>{(event.venue && event.venue.city) || ''}</div>
                {event.rsvp_limit && (
                    <ResponsiveContainer height={200} width={200}>
                        <PieChart>
                            <Pie data={this.getData()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={32} label >
                                {
                                    this.getData().map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index]} />))
                                }
                            </Pie>
                            <Legend layout="vertical" verticalAlign="bottom" align="center" />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                <button className='eventDetailsButton details-btn' onClick={this.handleShowDetails}>Show Details</button>
                {this.state.showDetails && (
                    <div className='eventDescription' dangerouslySetInnerHTML={{ __html: event.description }}></div>)}
            </div>
        );
    }
}

export default Event;