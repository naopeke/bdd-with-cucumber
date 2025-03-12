const Person = require('../../src/shouty.js');
const { Given, When, Then } = require('@cucumber/cucumber');
const { assertThat, is } = require('hamjest');

Given('Lucy is located {int}m from Sean', function (distance){
    this.lucy = new Person();
    this.sean = new Person();
    this.lucy.moveTo(distance);
    console.log(distance);
    // return 'pending'
})

When('Sean shouts {string}', function (message){
    this.sean.shout(message, this.lucy);
    this.message = message;
})

Then('Lucy hears Sean\'s message', function(){
    assertThat(this.lucy.messagesHeard(), is([this.message]));
})