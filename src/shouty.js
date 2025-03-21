class Person {
    constructor(network, location, name) {
        this.messages = [];
        this.network = network;
        this.location = location;
        this.name = name;
        this.network.subscribe(this); // 自身をリスナーとして登録
    }

    moveTo(newLocation){
        this.location = newLocation;
    }

    shout(message) {
        console.log(`Shouting message: ${message}`);
        this.network.broadcast(message, this.location, this); // Network にメッセージをブロードキャスト
    }

    hear(message) {
        console.log(`${this.name} heard: ${message}`);
        this.messages.push(message); // メッセージを受信
    }

    messagesHeard() {
        return this.messages; // 受信したメッセージを返す
    }
}

class Network {
    constructor(range) {
        this._range = range; // メッセージが届く範囲
        this._listeners = [];
    }

    set range(newRange){
        this._range = newRange;
    }

    // subscribe(listener) {
    //     this._listeners.push(listener); // リスナーを追加
    // }
    subscribe(listener) {
        // 既に登録されている場合は追加しない
        if (!this._listeners.includes(listener)) {
            this._listeners.push(listener); 
        }
    }

    // broadcast(message, shouterLocation, shouter) {
    //     console.log(`Broadcasting message: "${message}" from ${shouter.name} at ${shouterLocation}`);
    //     console.log(`Listeners registered: ${this._listeners.map(l => l.name).join(', ')}`);
        
    //     this._listeners.forEach(listener => {
    //         console.log(`Checking listener: ${listener.name} at ${listener.location}`);
            
    //         const withinRange = Math.abs(listener.location - shouterLocation) <= this._range;
    //         console.log(`Within range? ${withinRange}`);
    
    //         if (withinRange) {
    //             listener.hear(message);
    //         }
    //     });
    // }

    // broadcast(message, shouterLocation, shouter) {
    //     console.log(`Broadcasting message: "${message}" from ${shouter.name} at ${shouterLocation}`);
    //     console.log(`Listeners registered: ${this._listeners.map(l => l.name).join(', ')}`);
    
    //     this._listeners.forEach(listener => {
    //         console.log(`Checking listener: ${listener.name} at ${listener.location}`);
    //         const withinRange = Math.abs(listener.location - shouterLocation) <= this._range;
    //         console.log(`Within range? ${withinRange}`);
    
    //         if (withinRange) {
    //             listener.hear(message);
    //         }
    //     });
    // }
   
    
    broadcast(message, shouterLocation, shouter) {
        console.log(`Broadcasting message:\n "${message}" from ${shouter.name} at ${shouterLocation}`);
        console.log(`Listeners registered:\n ${this._listeners.map(l => l.name).join(', ')}`);
        
        this._listeners.forEach(listener => {
            // shouterがlistenerでない場合のみ処理
            if (listener !== shouter) {
                console.log(`Checking listener:\n ${listener.name} at ${listener.location}`);
                const withinRange = Math.abs(listener.location - shouterLocation) <= this._range;
                console.log(`Within range?\n ${withinRange}`);
            
                if (withinRange) {
                    console.log(`${listener.name} hears:\n ${message}`); // リスナーがメッセージを受け取った場合のログ
                    listener.hear(message);
                }
            }
        });
    }

    _deductCredits(shortEnough, message, shouter){
        if(!shortEnough) shouter.credits -= 2;
        shouter.credits -= (message.match(/buy/gi) || []).length * 5;
    }
}



module.exports = { 
    Person,
    Network
};