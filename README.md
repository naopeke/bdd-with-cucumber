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
  
## Formatter plugins
```
npm test -- --format html:report.html
npm test -- --format json:report.json
npm test -- --format progress
npm test -- -f html:report.html -f json:report.json -f progress
```
Rerun and make a txt file with the failed scenarios
```
npm test -- -f rerun:@rerun.tx
```
  
## Cucumber report
cucumber.js
```
module.exports = { default: '--publish' }
```