const { Person, Network } = require ('../../src/shouty');
const { defineParameterType } = require('@cucumber/cucumber');

defineParameterType({
    name: 'person',
    regexp: /Lucy|Sean/,
    transformer: function (name){
        return name;
    }
})