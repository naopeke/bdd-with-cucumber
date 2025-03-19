const { Person, Network } = require('../../src/shouty');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is, not, contains } = require('hamjest');
const assert = require('assert');

const DEFAULT_RANGE = 100;

Given('{person} is located {int} metre(s) from Sean', function (distance){
    this.network = new Network();
    this.lucy = new Person(this.network);
    this.sean = new Person(this.network);
    this.lucy.moveTo(distance);
    console.log("distance: ", distance);
});


Given("the range is {int}", function(range){
    this.network.range = range;
})

Given("{person} is located at {int}", function(person, location){
    person.moveTo(location);
})

Given("{person} has bought {int} credits", function(person, credits){
    person.credits = credits;
})

// When('{person} shouts', function (shouter) {
//     const message = "Hello, world";
//     this.shout({from: shouter, message});
// });

// When('{person} shouts {string}', function(shouter, message){
//     this.shout({from: shouter, message});
//     this.messagesShoutedBy[shouter.name].push(message);
// })

// When('{person} shouts a message containing the word {string}', function(shouter, word){
//     const message = `A message containing the word ${word}`;
//     this.shout({from: shouter, message});
//     this.messagesShoutedBy[shouter.name].push(message);
// });

// When('{person} shouts {int} messages containing the word {string}', function(shouter, count, word){
//     for(let i=0; i<count; i++){
//         const message = `A message containing the word ${word}`;
//         this.shout({from: shouter, message});
//         this.messagesShoutedBy[shouter.name].push(message);
//     }
// });

// When('{person} shouts a long message', function(shouter){
//     const longMessage =`A message from ${shouter.name}\nthat spans multiple lines`;
//     this.shout({from: shouter, longMessage});
//     this.messagesShoutedBy[shouter.name].push(longMessage);
// })

// When('{person} shouts an over-long message', function(shouter) {
//     const baseMessage = "A message from ${shouter.name} that is 181 characters long ";
//     const longMessage = baseMessage + "x".repeat(181 - baseMessage.length); // 変数名を変更
//     this.shout({from: shouter, longMessage});
//     this.messagesShoutedBy[shouter.name].push(longMessage);
// });

// When('{person} shouts {int} over-long messages', function(shouter, count){
//     for(let i = 0; i < count; i++){
//         const baseMessage = "A message from {shouter.name} that is 181 characters long ";
//         const longMessage = baseMessage + "x".repeat(181 - baseMessage.length); // 変数名を変更
//         this.shout({from: shouter, longMessage});
//         this.messagesShoutedBy["Sean"].push(longMessage);
//     }
// });

// When('{person} shouts the following message', function(shouter, message){
//     this.shout({from: shouter, message});
//     this.messagesShoutedBy[shouter.name].push(message);
// })

Then('{person} should hear a shout', function (listener) {
    assertThat(this.people[listener.name].messagesHeard().length, is(1)); // Lucy がメッセージを受信したことを確認
});

Then('{person} should not hear a shout', function (listener) {
    assertThat(listener.messagesHeard().length, is(0));
});

Then('Lucy hears Sean\'s message', function(){
    assertThat(this.lucy.messagesHeard(), is([this.message]));
});

Then('{person} hears the following messages:', function (listener, expectedMessages) {
    let actualMessages = listener.messagesHeard().map((message) => [message]);
    assertThat(actualMessages, is(expectedMessages.raw())); // 修正
});

Then("{person} hears all {person}'s messages", function(listener, shouter){
    assertThat(listener.messagesHeard(), equalTo(this.messagesShoutedBy[shouter.name]));
})

Then("{person} should hear {person}'s message", function(listener, shouter){
    assertThat(listener.messagesHeard()[0], equalTo(this.messagesShoutedBy[shouter.name][0]))
})

Then("{person} should have {int} credits", function(person, expectedCredits){
    assertThat(person.credits, is(expectedCredits))
})