This project requires `node` >= 6 and `npm` >= 5 and [yarn](https://yarnpkg.com/en/).

To start this project:
  
  1. cd into the root directory
  2. install the dependencies `yarn`
  3. start it `yarn start`

To build production version:

  1. `yarn build`
  2. find result in the `/build` folder

To deploy this project to firebase:

  1. Build `yarn build`
  2. Deploy `firebase deploy`

Hygen templates commands:
```
  yarn hygen component simple --name Test
  yarn hygen component simple --name Test --styles
  yarn hygen component container --name Test
  yarn hygen component container --name Test --styles
```

Architecture is based on <a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" target="_blank">Presentational and Container Components</a> pattern

This project is built upon <a href="https://github.com/facebook/create-react-app" target="_blank">create-react-app</a>
