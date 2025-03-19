const assert = require('assert');
const sinon = require('sinon');
const { Person, Network } = require('../src/shouty');

describe('Person', ()=>{
    let network, message
    beforeEach(()=>{
        const range = 100;
        network = new Network(range);
        const message = "Free bagles!"
    })

    it ('broadcasts a message to a listener within range', function(){
        const shouterLocation = 0;
        const listenerLocation = 90;
        const lucy = new Person(network, listenerLocation);
        const lucyStub = sinon.spy(lucy);

        network.subscribe(lucy);
        network.broadcast(message, shouterLocation);

        assert.strictEqual(lucyStub.hear.getCall(0).args[0], message);
    })

    it('broadcasts a message to a listener out of range', function () {
        const shouterLocation = 0
        const listenerLocation = 90
        const lucy = new Person(network, listenerLocation)
        const lucyStub = sinon.spy(lucy)
    
        network.subscribe(lucy)
        network.broadcast(longMessage, shouterLocation)
    
        assert(lucyStub.hear.notCalled)
      })

      it("can change the range", function(){
        const sean = new Person("Sean", network, 0);
        const laura = new Person("Laura", network, 10);

        network.broadcast(message, sean);
        assert.deepEqual(laura.messagesHeard(), [message]);

        network.range = 5;
        network.broadcast(message, sean);
        assert.deepEqual(laura.messagesHeard(), [message]);

      })
})