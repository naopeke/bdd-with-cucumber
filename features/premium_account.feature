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