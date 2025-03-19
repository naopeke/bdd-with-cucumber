Feature: Hear shout

 Shouty allows users to "hear" other users "shouts" as long as they are close enough to each other.

 Rule: Shouts can be heard by other users

 Scenario: Listener hears a message
  Given the range is 100
  And a person named Sean is located at 0
  And a person named Lucy is located at 50
  When Sean shouts "Free bagels at Sean's"
  Then Lucy should hear Sean's message

  Scenario: Listener hears a message
    Given the range is 100
    And a person named Sean is located at 0
    And a person named Lucy is located at 50
    When Sean shouts "Free coffee"
    Then Lucy should hear Sean's message

  Rule: Shouts should only be heard if listener is within range

  Scenario: Listener is within range
      Given the range is 100
      And a person named Sean is located at 0
      And a person named Lucy is located at 50
      When Sean shouts
      Then Lucy should hear a shout

  Scenario: Listener is out of range
    Given the range is 100
    And a person named Sean is located at 0
    And a person named Larry is located at 150
    When Sean shouts
    Then Larry should not hear a shout

Feature: Premium account

Questions:
* What about the one where the same message is both over-long and contains the word "buy"?
* What happens if Sean runs out of credits?

  Background:
    Given the range is 100
    And people are located at
      | name     | Sean | Lucy |
      | location | 0    | 100  |

  @todo
  Scenario: BUG #2789
    Given Sean has bought 30 credits
    When Sean shouts "buy, buy buy!"
    Then Sean should have 25 credits
  
  Rule: Mention the word "buy" and you lose 5 credits
    Scenario: Sean shouts some messages containing the word "buy"
      Given Sean has bought 30 credits 
      When Sean shouts 3 messages containing the word "buy"
      Then Lucy hears all Sean's messages
      And Sean should have 15 credits

  Rule: Over-long messages const 2 credits
    Scenario: Sean shouts some over-long messages
      Given Sean has bought 30 credits 
      When Sean shouts 2 over-long messages
      Then Lucy hears all Sean's messages
      And Sean should have 26 credits