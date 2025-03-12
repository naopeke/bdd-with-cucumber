class Person {

    constructor(){
        this.location = 0;
        this.messages = [];
    }

    moveTo(distance){
        this.location = distance;
    }

    shout(message, listener){
        if (listener && Math.abs(listener.location - this.location) <= 15) {
            listener.messages.push(message);
        }
    }

    messagesHeard(){
        // return ["Free bagels at Sean's"]
        return this.messages;
    }
}



module.exports = Person;