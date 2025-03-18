class Person {
    constructor(network, location) {
        this.messages = [];
        this.network = network;
        this.location = location; // 初期位置を設定
        this.network.subscribe(this); // 自身をリスナーとして登録
    }

    shout(message) {
        this.network.broadcast(message, this.location); // Network にメッセージをブロードキャスト
    }

    hear(message) {
        this.messages.push(message); // メッセージを受信
    }

    messagesHeard() {
        return this.messages; // 受信したメッセージを返す
    }
}

class Network {
    constructor(range) {
        this.range = range; // メッセージが届く範囲
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener); // リスナーを追加
    }

    broadcast(message, shouterLocation) {
        const shortEnough = message.length <= 180;
        this._deductCredits(shortEnough, message, shouter);
        this.listeners.forEach(listener =>{
            const withinRange = Math.abs(listener.location - shouterLocation) <= this.range;
            if(withinRange && (shortEnough || shouter.credits >= 0)){
                listener.hear(message)
            }
        })
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