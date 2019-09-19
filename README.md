# React testing with Jest and Enzyme

## create-react-app

```
npx create-react-app <folder_name>
cd <folder_name>
rm -rf node_modules
yarn install
npm i ajv
npm i --save-dev enzyme jest-enzyme enzyme-adapter-react-16
npm i --save-dev babel-plugin-react-remove-properties
npm run eject
```

.env
`SKIP_PREFLIGHT_CHECK=true`

Run `npm test`

`npm run eject` only if you are working with `create-react-app`. It makes the configuration files editable and this action is permanent.