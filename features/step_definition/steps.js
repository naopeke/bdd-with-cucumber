const { Person, Network } = require('../../src/shouty');
const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { assertThat, is, not, contains } = require('hamjest');
const assert = require('assert');

const default_range = 100;

Before(function () {
    this.network = new Network(default_range);
    this.people = {}; // people オブジェクトを初期化
});

Given('the range is {int}', function (range) {
    this.network = new Network(range); // 範囲を設定
});

Given('a person named {word}', function (name) {
    this.people[name] = new Person(this.network, 0); // 初期位置を 0 として Person インスタンスを作成
});

Given('a person named {word} is located at {int}', function (name, location) {
    this.people[name] = new Person(this.network, location); // Person インスタンスを作成し、位置を設定
});

Given('people are located at', function (dataTable) {
    dataTable.transpose().hashes().map((person) => {
        this.people[person.name] = new Person(this.network, person.location);
    });
});

When('Sean shouts', function () {
    this.people['Sean'].shout('Hello world'); // Sean がメッセージを叫ぶ
});

When('Sean shouts {string}', function (message) {
    this.people['Sean'].shout(message); // Sean がメッセージを叫ぶ
    this.messageFromSean = message;
});

Then('Lucy should hear a shout', function () {
    assertThat(this.people['Lucy'].messagesHeard().length, is(1)); // Lucy がメッセージを受信したことを確認
});

Then('Larry should not hear a shout', function () {
    assertThat(this.people['Larry'].messagesHeard(), not(contains(this.messageFromSean))); // Larry がメッセージを受信していないことを確認
});

Then('Lucy hears Sean\'s message', function () {
    assertThat(this.people['Lucy'].messagesHeard(), is([this.messageFromSean])); // Lucy が Sean のメッセージを受信したことを確認
});

Then('Larry should not hear Sean\'s message', function () {
    assertThat(this.people['Larry'].messagesHeard(), is([this.messageFromSean])); // Larry が Sean のメッセージを受信していないことを確認
});

Then('Lucy hears the following messages:', function (expectedMessages) {
    let actualMessages = this.people['Lucy'].messagesHeard();
    assert.deepEqual(actualMessages, expectedMessages.raw().flat()); // メッセージを比較
});