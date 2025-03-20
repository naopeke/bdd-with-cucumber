Feature: Hear shout

  Shouty allows users to "hear" other users "shouts" as long as they are close enough to each other.

  Rule: Shouts can be heard by other users

    Scenario: Listener hears a message
      Given the range is 100
      And people are located at
      | name     | Location | 
      | Sean     |  0       |
      | Lucy     |  50      |      
      When Sean shouts "Free bagels at Sean's"
      Then Lucy should hear Sean's message

    Scenario: Listener hears a message
      Given the range is 100
      And people are located at
      | name     | Location | 
      | Sean     |  0       |
      | Lucy     |  50      |  
      When Sean shouts "Free coffee"
      Then Lucy should hear Sean's message

  Rule: Shouts should only be heard if listener is within range

    Scenario: Listener is within range
      Given the range is 100
      And people are located at
      | name     | Location | 
      | Sean     |  0       |
      | Larry    |  50      |  
      When Sean shouts
      Then Larry should hear a shout

    Scenario: Listener is out of range
      Given the range is 100
      And people are located at
      | name     | Location | 
      | Sean     |  0       |
      | Larry    |  150     |  
      When Sean shouts
      Then Larry should not hear a shout
