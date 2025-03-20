const { Person, Network } = require('../../src/shouty');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is, not, contains, equalTo } = require('hamjest');

const DEFAULT_RANGE = 100;

Before(function () {
    this.network = new Network(DEFAULT_RANGE);
    this.people = {};
    this.messagesShoutedBy = {};
})

Given("the range is {int}", function(range){
    this.network.range = range;
})

//hear_shout.feature
Given("{person} is located at {int}", function(person, location){
    person.moveTo(location);
})

//hear_shout.feature
//premium_account.feature
// Given('people are located at', function (dataTable) {
//     const peopleData = dataTable.hashes(); // [{ name: "Sean", location: "0" }, { name: "Lucy", location: "100" }]
//     this.people = {};

//     peopleData.forEach(person => {
//         this.people[person.name] = { location: parseInt(person.location, 10) };
//     });
// });


Given("people are located at", function (dataTable) {
    dataTable.rows().forEach(([name, location]) => {
        this.people[name] = new Person(this.network, parseInt(location, 10), name);
        console.log("name:" ,name, "location",location)
        this.messagesShoutedBy[name] = [];
    });
});

// Given("people are located at", function (dataTable) {
//     // dataTable.rows() を利用して、ヘッダーをスキップして位置情報を処理
//     const rows = dataTable.rows().slice(1); // ヘッダー行を除く

//     rows.forEach(row => {
//         const name = row[0]; // 名前は1列目
//         const location = parseInt(row[1], 10); // 位置は2列目

//         // デバッグ用に名前と位置を表示
//         console.log(`Creating person: ${name} at location: ${location}`);
        
//         // 名前と位置を使ってPersonを作成
//         this.people[name] = new Person(this.network, location, name);
//         this.messagesShoutedBy[name] = [];

//         // 作成された情報をログに出力
//         console.log(`Person ${name} created with location ${location}`);
//     });
// });




//premium_account.feature
Given("{person} has bought {int} credits", function(person, credits){
    person.credits = credits;
})

When("{person} shouts", function (shouter) {
    const message = "Hello, world";
    // this.shout({ from: shouter, message });
    this.people[shouter.name].shout(message);
    this.messagesShoutedBy[shouter.name].push(message);
  })

//premium_account.feature
When("{person} shouts {string}", function (shouter, message) {
    console.log(`${shouter.name} is shouting: "${message}"`);
    this.shout({ from: shouter, message });
    console.log("Messages shouted so far:", this.messagesShoutedBy);
    this.messagesShoutedBy[shouter.name].push(message);
    })
    
//premium_account.feature
When("{person} shouts {int} messages containing the word {string}",
function (shouter, count, word) {
    for (let i = 0; i < count; i++) {
    const message = `A message containing the word ${word}`
    this.shout({ from: shouter, message })
    this.messagesShoutedBy[shouter.name].push(message);
    }
}
)

//premium_account.feature
When("{person} shouts {int} over-long messages", function (shouter, count) {
for (let i = 0; i < count; i++) {
    const baseMessage = `A message from ${shouter.name} that is 181 characters long `;
    const message = baseMessage + "x".repeat(181 - baseMessage.length)
    this.shout({ from: shouter, message })
    this.messagesShoutedBy[shouter.name].push(message);
}
})

When("{person} shouts the following message", function (shouter, message) {
this.shout({ from: shouter, message })
this.messagesShoutedBy[shouter.name].push(message);
})


Then('{person} hears the following messages:', function (listener, expectedMessages) {
    let actualMessages = listener.messagesHeard().map((message) => [message]);
    assertThat(actualMessages, equalTo(expectedMessages.raw()));
});


//hear_shout.feature
Then("{person} should hear {person}'s message", function(listener, shouter) {
    console.log(`${listener.name} heard:`, listener.messagesHeard());
    assertThat(listener.messagesHeard()[0], equalTo(this.messagesShoutedBy[shouter.name][0]));
});

//hear_shout.feature
Then('{person} should hear a shout', function (listener) {
    assertThat(this.people[listener.name].messagesHeard().length, is(1)); // Lucy がメッセージを受信したことを確認
});

//hear_shout.feature
Then('{person} should not hear a shout', function (listener) {
    assertThat(listener.messagesHeard().length, is(0));
});

//premium_account.feature
Then("{person} hears all {person}'s messages", function(listener, shouter) {
    assertThat(listener.messagesHeard(), equalTo(this.messagesShoutedBy[shouter.name]));
});

//premium_account.feature
Then("{person} should have {int} credits", function(person, expectedCredits) {
    assertThat(person.credits, is(expectedCredits));
});