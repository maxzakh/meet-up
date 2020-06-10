import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import mockData from '../__tests__/Event.test.MockData.json';
import NumberOfEvents from '../NumberOfEvents';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Default number of events is 32', ({ given, when, then }) => {
        given('the user has not specified the number of events', () => {

        });

        let AppWrapper;

        when('the app loads', () => {
            AppWrapper = mount(<NumberOfEvents />);
        });

        then('the default 32 events are shown', () => {
            AppWrapper.update();
            expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);
        });
    });
    
    test('User specifies the amount of events to see', ({ given, when, then }) => {
        let AppWrapper;
        given('the user opens the app', () => {
            AppWrapper = mount(<App />)
        });

        when('the user specifies a number of events', () => {
            AppWrapper.find('.number-of-events').simulate('change', { target: { value: 20 }});
        });

        then('the user sees that number of events or less', () => {
            AppWrapper.find(NumberOfEvents).setState({ query: 20 });
            expect(AppWrapper.find(NumberOfEvents).state('query')).toBe(20);
        });
    });
    
});
