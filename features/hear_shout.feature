Feature: Hear shout
    shouty allows users to "hear" other users "shouts" as long as they are close enought to each other.

    To do:
        - only shout to people within a certain distance

    Background:
        Given a person named Lucy
        And a person named Sean
    
    Rule: Shouts can be heard by other users

        Scenario: Listener is within range
            When Sean shouts "Free bagels at Sean's"
            Then Lucy hears Sean's message

        Scenario: Listener is within range
            When Sean shouts "Free coffee"
            Then Lucy hears Sean's message

Rule: Shouts should only be heard if listener is within range
    Scenario: Listener is within range
    Scenario: Listener is out of range