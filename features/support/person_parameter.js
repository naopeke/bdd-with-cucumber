const { Person, Network } = require ('../../src/shouty');
const { defineParameterType } = require('@cucumber/cucumber');

// defineParameterType({
//     name: 'person',
//     regexp: /Lucy|Sean|Larry/,
//     transformer: function (name){
//         this.people = this.people || {}
//         return this.people[name] = this.people[name] || new Person(name, this.network, 0)
//     }
// })

defineParameterType({
    name: 'person',
    regexp: /Lucy|Sean/,
    transformer: name => new Person(new Network())
});