class Person {

    constructor(network){
        // this.location = 0;
        this.messages = [];
        this.network = network;
        this.network.subscribe(this);
    }

    moveTo(distance) {

    }

    shout(message, listener){
        this.network.broadcast(message);
    }

    hear(message){
        this.messages.push(message);
    }

    messagesHeard(){
        return this.messages;
    }
}

class Network {
    //broadcasts a message to all listeners
    constructor(){
        this.listeners = [];
    }

    subscribe(listener){
        this.listeners.push(listener);
    }

    broadcast(message){
        this.listeners.forEach(listener =>{
            listener.hear(message);
        })
    }
}



module.exports = { Person, Network };