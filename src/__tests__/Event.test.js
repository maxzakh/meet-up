import React from 'react'
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from './Event.test.MockData';

describe('<App /> component', () => {
    let EventWrapper;
    beforeEach(() => {
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

    test('1234 click on event should change state', () => {
        EventWrapper.find('.eventDetailsButton').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
    });
});
