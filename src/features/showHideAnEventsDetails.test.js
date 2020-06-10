import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import mockData from '../__tests__/Event.test.MockData.json';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the User has chosen a location', () => {

        });

        let AppWrapper;
        when('the user views the entire (collapsed) list of events', () => {
            AppWrapper = mount(<App />);
        });

        then('the user sees a list of collapsed events', () => {
            expect(AppWrapper.find('.eventDetailsButton')).toHaveLength(0)
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;

        given('user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicks on an event details button', () => {
            AppWrapper.update()
            AppWrapper.find('.eventDetailsButton').at(0).simulate('click');
        });

        then('the user should see more information on that event', () => {
            expect(AppWrapper.find('.eventDetailsButton')).toHaveLength(mockData.length)
        });
    });


    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        let AppWrapper;
        given('user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        and('the event details are already showing', () => {
            AppWrapper.update()
            AppWrapper.find('.eventDetailsButton').at(0).simulate('click');
            expect(AppWrapper.find('.eventDetailsButton')).toHaveLength(mockData.length)
        });

        when('the user clicks on an event details button again', () => {
            AppWrapper.find('.eventDetailsButton').at(0).simulate('click');
        });

        then('the event detail should collapse', () => {
            expect(AppWrapper.find('.eventDetailsButton')).toHaveLength(mockData.length)
        });
    });

});