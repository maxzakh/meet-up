import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    page: null,
    offlineText: '',
  }

  componentDidMount() {
    this.updateEvents();
    window.addEventListener('online', this.offLineAlert());
  }

  offLineAlert = () => {
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          'No internet connetion, please reconnect to update event information. This is a cached list',
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  };


  updateEvents = (lat, lon, page) => {
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events =>
        this.setState({ events, lat, lon })
      );
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events =>
        this.setState({ events, page })
      );
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events =>
        this.setState({ events })
      );
    }
  }

  render() {
    return (
      <div className="App">
        {!window.navigator.online
          ?
          (<OfflineAlert text={this.state.offlineText} />)
          :
          (<CitySearch updateEvents={this.updateEvents} />)
        }
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;