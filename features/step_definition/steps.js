const { Person, Network } = require('../../src/shouty');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is } = require('hamjest');

Before(function(){
    this.network = new Network();
})

Given('Lucy is located {int} metre(s) from Sean', function (distance){
    this.network = new Network();
    this.lucy = new Person(this.network);
    this.sean = new Person(this.network);
    this.lucy.moveTo(distance);
    console.log("distance: ", distance);
    // return 'pending'
})

Given('a person named Lucy', function(){
    this.lucy = new Person(this.network);
})

Given('a person named Sean', function(){
    this.sean = new Person(this.network)
})

When('Sean shouts {string}', function (message){
    sean = new Person(this.network);
    this.sean.shout(message, this.lucy);
    this.messageFromSean = message;
})

Then('Lucy hears Sean\'s message', function(){
    assertThat(this.lucy.messagesHeard(), is([this.messageFromSean]));
})