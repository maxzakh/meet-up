import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import mockData from './Event.test.MockData.json';

describe('<App /> component', () => {
    test('ZOO render correct number of events', () => {
        const localData = mockData;
        // const localData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        const EventListWrapper = shallow(<EventList events={localData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(4);
    });
});
