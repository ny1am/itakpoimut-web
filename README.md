# Itakpoimut web app &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ny1am/itakpoimut-web/blob/master/LICENSE) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Web client for itakpoimut project which is a catalogue of ukrainian companies that do not follow law in terms of translating all related media to ukrainian language

## Developing

### Built With

React, Redux, Redux Saga, Webpack

### Prerequisites

This project requires `node` >= 6 and `npm` >= 5 and [yarn](https://yarnpkg.com/en/)

### Setting up Dev

```shell
git clone https://github.com/ny1am/itakpoimut-web.git
cd itakpoimut-web/
yarn
yarn start
```

Clone repo and then install project dependencies with `yarn` and run developer environment with `yarn start`

### Hygen templates

```shell
yarn hygen component simple --name Test
yarn hygen component simple --name Test --styles
yarn hygen component container --name Test
yarn hygen component container --name Test --styles
```

Commands generate components with specified name to `/_tmp`. You may move them to another folder then

### Deploying

CI is configured on `master` branch.
To deploy this app somewhere else you may use:

```shell
yarn build
firebase deploy
```

Builds project to `/build` folder and deploys to firebase

## Style guide

Please install [prettier plugin](https://prettier.io/) for your IDE

Please install [eslint plugin](https://eslint.org/) for your IDE

Architecture is based on [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern

This project is built upon [create-react-app](https://github.com/facebook/create-react-app). Has been ejected already

## Contributing

Please follow [git flow](http://nvie.com/posts/a-successful-git-branching-model/) with creating PR to `develop` branch
