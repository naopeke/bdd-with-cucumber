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
        // this.listeners.forEach(listener => {
        //     if (Math.abs(listener.location - shouterLocation) <= this.range) {
        //         listener.hear(message); // 範囲内のリスナーにメッセージを送信
        //     }
        // });
        this.listeners.forEach(listener =>{
            let withinRange = Math.abs(listener.location - shouterLocation) <= this.range;
            let shortEnough = message.length <= 180;

            if(withinRange)
                if(shortEnough)
                    listener.hear(message);
        })
    }
}



module.exports = { 
    Person,
    Network
};