const Person = require('../../src/shouty.js');
const { Given, When, Then } = require('@cucumber/cucumber');
const { assertThat, is } = require('hamjest');

Given('{person} is located {int} metre(s) from Sean', function (lucy, distance){
    this.lucy = new Person();
    this.sean = new Person();
    this.lucy.moveTo(distance);
    console.log("distance: ", distance);
    // return 'pending'
})

When('Sean shouts {string}', function (message){
    this.sean.shout(message, this.lucy);
    this.message = message;
})

Then('Lucy hears Sean\'s message', function(){
    assertThat(this.lucy.messagesHeard(), is([this.message]));
})