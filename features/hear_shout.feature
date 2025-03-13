Feature: Hear shout
    shouty allows users to "hear" other users "shouts" as long as they are close enought to each other.

    To do:
        - only shout to people within a certain distance
    
    Rule: Shouts should only be heard if listener is within range

        Scenario: Listener is within range
            Given the range is 100
            And people are located at
            | name     | Sean | Lucy |
            | location |  0   | 50   |
            When Sean shouts
            Then Lucy should hear a shout

        Scenario: Listener is out of range
            Given the range is 100
            And people are located at
            | name     | Sean | Larry |
            | location |  0   | 150   |
            When Sean shouts
            Then Larry should not hear a shout

    Rule: Listener should be able to hear multiple shouts
        Scenario: Two shouts
            Given a person named Sean
            And a person named Lucy
            When Sean shouts "Free bagles!"
            And Sean shouts "Free toast!"
            Then Lucy hears the following messages:
                | Free bagles! |
                | Free toast!  |