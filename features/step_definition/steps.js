const { Given, When, Then } = require('@cucumber/cucumber');

Given('Lucy is located {int} metres from Sean', function (distance){
    console.log(distance);
    return 'pending'
})

When('Sean shouts {string}', function (string){
    return 'pending'
})

Then('Lucy hears Sean\'s message', function(){
    return 'pending'
})