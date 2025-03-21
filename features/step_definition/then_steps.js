const { Person, Network } = require('../../src/shouty');
const { Then, Before } = require('@cucumber/cucumber');
const { assertThat, is, not, contains, equalTo } = require('hamjest');

const DEFAULT_RANGE = 100;

Before(function () {
    this.network = new Network(DEFAULT_RANGE);
    this.people = {};
    this.messagesShoutedBy = {};
})

Then('{person} hears the following messages:', function (listener, expectedMessages) {
    let actualMessages = listener.messagesHeard().map((message) => [message]);
    assertThat(actualMessages, equalTo(expectedMessages.raw()));
});


//hear_shout.feature
Then("{person} should hear {person}'s message", function(listener, shouter) {
    // console.log(`${listener.name} heard:`, listener.messagesHeard());
    assertThat(listener.messagesHeard()[0], equalTo(this.messagesShoutedBy[shouter.name][0]));
});

//hear_shout.feature
Then('{person} should hear a shout', function (listener) {
    assertThat(this.people[listener.name].messagesHeard().length, is(1)); // Lucy がメッセージを受信したことを確認
});

//hear_shout.feature
Then('{person} should not hear a shout', function (listener) {
    assertThat(listener.messagesHeard().length, is(0));
});

//premium_account.feature
Then("{person} hears all {person}'s messages", function(listener, shouter) {
    // console.log(`Listener's messages: ${listener.messagesHeard()}`);
    // console.log(`Shouter's messages: ${this.messagesShoutedBy[shouter.name]}`);
    assertThat(listener.messagesHeard(), equalTo(this.messagesShoutedBy[shouter.name]));
});

//premium_account.feature
Then("{person} should have {int} credits", function(person, expectedCredits) {
    console.log(`${person.name} should have ${person.credits} credits, expected: ${expectedCredits}`);
    assertThat(person.credits, is(expectedCredits));
});