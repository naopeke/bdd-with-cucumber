const { Person, Network } = require('../../src/shouty');
const { Given, Before } = require('@cucumber/cucumber');

const DEFAULT_RANGE = 100;

Before(function () {
    this.network = new Network(DEFAULT_RANGE);
    this.people = {};
    this.messagesShoutedBy = {};
})

Given("the range is {int}", function(range){
    this.network.range = range;
})

//hear_shout.feature
Given("{person} is located at {int}", function(person, location){
    person.moveTo(location);
})

Given("people are located at", function (dataTable) {
    dataTable.rows().forEach(([name, location]) => {
        this.people[name] = new Person(this.network, parseInt(location, 10), name);
        // console.log("name:" ,name, "location",location)
        this.messagesShoutedBy[name] = [];
    });
});

//premium_account.feature
Given("{person} has bought {int} credits", function(person, credits){
    person.credits = credits;
    console.log(`${person.name} initially has ${credits} credits.`);
})