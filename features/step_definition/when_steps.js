const { When } = require("@cucumber/cucumber");

When("{person} shouts", function (shouter) {
    const message = "Hello, world";
    // this.shout({ from: shouter, message });
    this.people[shouter.name].shout(message);
    this.messagesShoutedBy[shouter.name].push(message);
  })

//premium_account.feature
When("{person} shouts {string}", function (shouter, message) {
    // console.log(`${shouter.name} is shouting: "${message}"`);
    this.shout({ from: shouter, message });
    // console.log("Messages shouted so far:", this.messagesShoutedBy);
    this.messagesShoutedBy[shouter.name].push(message);
    })
    
When("{person} shouts {int} messages containing the word {string}", function (shouter, count, word) {
    for (let i = 0; i < count; i++) {
        const message = `A message containing the word ${word}`;
        // console.log(`${count} shouting messages: "${message}"`);
        // 発信者 (shouter) を指定して、shout メソッドを呼び出し
        shouter.shout(message);
        // 発信者の名前とメッセージを記録
        this.messagesShoutedBy[shouter.name] = this.messagesShoutedBy[shouter.name] || [];
        this.messagesShoutedBy[shouter.name].push(message);
    }
});

//premium_account.feature
When("{person} shouts {int} over-long messages", function (shouter, count) {
for (let i = 0; i < count; i++) {
    const baseMessage = `A message from ${shouter.name} that is 181 characters long `;
    const message = baseMessage + "x".repeat(181 - baseMessage.length)
    console.log(`Shout ${i + 1}: ${message.length} characters`); 
    shouter.shout(message);
    this.messagesShoutedBy[shouter.name].push(message);
}
})

When("{person} shouts the following message", function (shouter, message) {
this.shout({ from: shouter, message })
this.messagesShoutedBy[shouter.name].push(message);
})
