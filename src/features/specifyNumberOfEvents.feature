Feature: Specify number of events

Scenario: Default number of events is 32
  Given the user has not specified the number of events
  When the app loads
  Then the default 32 events are shown

Scenario: User specifies the amount of events to see
  Given the user opens the app
  When the user specifies a number of events
  Then the user sees that number of events or less