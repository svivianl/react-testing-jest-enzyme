# React testing with Jest and Enzyme

## create-react-app

### Initialization
```
npx create-react-app <folder_name>
cd <folder_name>
rm -rf node_modules
yarn install
npm i ajv
npm i --save-dev enzyme jest-enzyme enzyme-adapter-react-16
```

.env
`SKIP_PREFLIGHT_CHECK=true`

### Remove data-test attributes
```
npm i --save-dev babel-plugin-react-remove-properties
npm run eject
```

`npm run eject` only if you are working with `create-react-app`. It makes the configuration files editable and this action is permanent.

google **npm babel plugin-react-remove-properties** copy what is in **Usage>with properties** and paste inside `babel` in `package.json` before `presents`.

`npm run build`
if you don't have a static server, you will need to `npm i -g serve` (it will give you a message in case you don't have it after you run `npm run build`)
`serve -s build` to run the app

### Prop-types

```
npm i --save prop-types
npm i --save-dev check-prop-types
```

### Extract Enzyme setup to setupTests.js

setupTests.js file has the configuration that you want to run for each test file

If you have an app that wasn't created using create-react-app, you need to edit the jestConfig.js file and insert `setupTestFrameworkScriptFile: '<rootDir>/test/setupTests.js',` inside of `module.exports` and before `moduleNameWrapper`.

### Test run
Run `npm test`
