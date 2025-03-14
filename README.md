# bdd-with-cucumber
```
npm install -D @cucumber/cucumber@latest
npm install -D hamjest
```
## Filtering
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
  
Using @focus  
hear_shout.feature
```
@focus
Scenario: ...
```
cucumber.js
```
module.exports = { default: '--tags @focus'}
```
## LOLCAT
```
npm test -- --i18n-languages
```
cucumber.js
```
module.exports = { default: '--order random' }
```
help command
```
npm test -- --help
npm test -- -h
```