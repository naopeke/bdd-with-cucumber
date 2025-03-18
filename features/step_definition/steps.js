const { Person, Network } = require('../../src/shouty');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is, not, contains } = require('hamjest');
const assert = require('assert');

const default_range = 100;

Before(function () {
    this.network = new Network(default_range);
    this.people = {}; // people オブジェクトを初期化
});

Given("Sean has bought {int} credits", function(credits){
    this.people["Sean"].credits = credits;
})

When('Sean shouts', function () {
    this.people['Sean'].shout('Hello world'); // Sean がメッセージを叫ぶ
});

When('Sean shouts {string}', function (message) {
    this.people['Sean'].shout(message); // Sean がメッセージを叫ぶ
    if(!this.messagesShoutedBy["Sean"]) 
        this.messagesShoutedBy["Sean"] =[]
    this.messagesShoutedBy["Sean"].push(message);
});

When('Sean shouts a message containing the word {string}', function(word){
    const message = `A message containing the word ${word}`;
    this.people['Sean'].shout(message);
    if(!this.messagesShoutedBy["Sean"]) 
        this.messagesShoutedBy["Sean"] =[]
    this.messagesShoutedBy["Sean"].push(message);
});

When('Sean shouts a message', function(message){
    const mesasge = "A message from Sean";
    this.people['Sean'].shout(message);
    if(!this.messagesShoutedBy["Sean"]) 
        this.messagesShoutedBy["Sean"] =[]
    this.messagesShoutedBy["Sean"].push(message);
})

When('Sean shouts a long message', function(message){
    const mesasge =["A message from Sean", "that spans multiple lines"].join("\n") 
    this.people['Sean'].shout(message);
    if(!this.messagesShoutedBy["Sean"]) 
        this.messagesShoutedBy["Sean"] =[]
    this.messagesShoutedBy["Sean"].push(message);
})

When('Sean shouts the following message', function(message){
    this.people['Sean'].shout(message);
    if(!this.messagesShoutedBy["Sean"]) 
        this.messagesShoutedBy["Sean"] =[]
    this.messagesShoutedBy["Sean"].push(message);
})

Then('Lucy should hear a shout', function () {
    assertThat(this.people['Lucy'].messagesHeard().length, is(1)); // Lucy がメッセージを受信したことを確認
});

Then('{word} should not hear a shout', function (name) {
    assertThat(this.people[name].messagesHeard(), not(contains(this.messageFromSean))); // Larry がメッセージを受信していないことを確認
});

Then('Lucy hears Sean\'s message', function () {
    assertThat(this.people['Lucy'].messagesHeard(), is([this.messageFromSean])); // Lucy が Sean のメッセージを受信したことを確認
});

Then('Larry should not hear Sean\'s message', function () {
    assertThat(this.people['Larry'].messagesHeard(), is([this.messageFromSean])); // Larry が Sean のメッセージを受信していないことを確認
});

Then('Lucy hears the following messages:', function (expectedMessages) {
    let actualMessages = this.people['Lucy'].messagesHeard();
    assert.deepEqual(actualMessages, expectedMessages.raw().flat()); // メッセージを比較
});