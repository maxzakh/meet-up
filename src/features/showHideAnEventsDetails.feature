Feature: Show/hide event information when clicked

Scenario: An event element is collapsed by default
  Given the User has chosen a location
  When the user views the entire (collapsed) list of events
  Then the user sees a list of collapsed events

Scenario: User can expand an event to see its details
  Given user opens the app
  When the user clicks on an event details button
  Then the user should see more information on that event

Scenario: User can collapse an event to hide its details
  Given user opens the app
  And the event details are already showing
  When the user clicks on an event details button again
  Then the event detail should collapse