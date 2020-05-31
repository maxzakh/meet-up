import React from 'react'
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<App /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event />);
    });

    test('Event has rendered', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('check state of showDetails to be false initially', () => {
        expect(EventWrapper.state('showDetails')).toBe(false)
    });

    test('check for eventDetailsButton to have loaded', () => {
        expect(EventWrapper.find('.eventDetailsButton')).toHaveLength(1);
    })

    test('click on event should change state', () => {
        EventWrapper.setState({
            event: [
                {
                    "created": 1588354757000,
                    "duration": 5400000,
                    "id": "dsfxrrybcjbcb",
                    "name": "Mon, Wed & Fri River Walkers Rancho Cordova (Rossmoor & Ambassador)",
                    "date_in_series_pattern": false,
                    "status": "upcoming",
                    "time": 1591023600000,
                    "local_date": "2020-06-01",
                    "local_time": "08:00",
                    "updated": 1588354757000,
                    "utc_offset": -25200000,
                    "waitlist_count": 0,
                    "yes_rsvp_count": 3,
                    "venue": {
                        "id": 25896393,
                        "name": "Rossmoor Bar Park",
                        "lat": 38.62213134765625,
                        "lon": -121.2992172241211,
                        "repinned": false,
                        "address_1": "1950 Rossmoor Drive",
                        "city": "Rancho Cordova ",
                        "country": "US",
                        "localized_country_name": "USA"
                    },
                    "is_online_event": false,
                    "group": {
                        "created": 1285616834000,
                        "name": "Hikers and Company",
                        "id": 1713568,
                        "join_mode": "open",
                        "lat": 38.619998931884766,
                        "lon": -121.5,
                        "urlname": "hikersandcompany",
                        "who": "Adventurers",
                        "localized_location": "Sacramento, CA",
                        "state": "CA",
                        "country": "us",
                        "region": "en_US",
                        "timezone": "US/Pacific"
                    },
                    "link": "https://www.meetup.com/hikersandcompany/events/dsfxrrybcjbcb/",
                    "description": "<p>We'll meet at Rossmoor and Ambassador Drive at Rossmoor Bar entrance sign. We'll be walking on a mix of asphalt and dirt trail for 1.5 hours departing at 9:05 am winter hours and 8:05 for Summer as of May 1st, 2020. It's mainly flat. We'll alternate the route each time between walking to El Manto and walking to just past Hagan Park just to spice it up a bit. We'll walk the pace of the group, quick is preferred.</p> <p>Please come prepared with water, sunscreen, layered clothing and walking shoes. Dogs and friends welcomed!</p> <p>Feel free to call or text Ingrid if late at[masked] otherwise change your attendance here on Meetup so we're not waiting. I always check attendance and comments at 8 or 9am respectively :-)</p> ",
                    "how_to_find_us": "We meet right at the entrance gate and sign to Rossmoor Bar. Park right before the gate anywhere on the street for free.",
                    "visibility": "public",
                    "member_pay_fee": false
                }
            ]
        });

        EventWrapper.find('.eventDetailsButton').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
    });
});
