# bdd-with-cucumber
```
npm install -D @cucumber/cucumber@latest
npm install -D hamjest
```
Tells Cucumber to only run scenarios with a name that matches the string provided
```
npm test -- --name "range"
```
```
npm test -- features/hear_shout.feature:36
```
```
npm test -- features/hear_shout.feature:26:36
```
cucumber.jsに追加してフィルターも可能
```
module.exports = { default: '--name range'}
```