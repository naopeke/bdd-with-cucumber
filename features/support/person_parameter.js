const { Person, Network } = require ('../../src/shouty');
const { defineParameterType } = require('@cucumber/cucumber');

defineParameterType({
    name: 'person',
    regexp: /Lucy|Sean|Larry/,
    transformer: function (name) {
        this.people = this.people || {};
        this.network = this.network || new Network(100); 
        return this.people[name] = this.people[name] || new Person(this.network, 0, name); // nameを渡す
    }
});