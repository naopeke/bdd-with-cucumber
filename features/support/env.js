const { setWorldConstructor } = require("@cucumber/cucumber");
const { Network } = require('../../src/shouty');
const DEFAULT_RANGE = 100;

class ShoutyWorld {
    constructor() {
        this._network = new Network(DEFAULT_RANGE);
        this._messagesShoutedBy = {};
        this.people = {};
    }
    
    get messagesShoutedBy(){
        return (this._messagesShoutedBy = this._messagesShoutedBy || {})
    }

    get network() {
        return (this._network = this._network || new Network(DEFAULT_RANGE))
      }

    shout({ from: shouter, message}){
        shouter.shout(message);
        if(!this.messagesShoutedBy[shouter.name]) 
            this.messagesShoutedBy[shouter.name] =[]
        this.messagesShoutedBy[shouter.name].push(message);
    }
}

setWorldConstructor(ShoutyWorld);