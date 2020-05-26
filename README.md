# GeoCode Frontend
[![build status](https://img.shields.io/travis/maartenvn/geocode)](https://travis-ci.org/maartenvn/GeoCode)
[![license](https://img.shields.io/github/license/maartenvn/geocode)](https://github.com/maartenvn/GeoCode/blob/master/LICENSE)

Frontend for GeoCode written in Vue 2 and Typescript. GeoCode was written as project for the course Web Development 2020 at the [University of Ghent](https://ugent.be)

## What is GeoCode?
Find & create amazing locations to explore and share with others. GeoCode is the new way of Geocaching you have been dreaming of.

## Getting started

### Prerequisites
You will need to install [node.js](https://nodejs.org). Make sure that your Node.js installation includes [NPM](https://www.npmjs.com/)

You will also need to install [yarn](https://yarnpkg.com/). You either install it from the official website, your package manager, or use the NPM command:

```
npm install yarn -g
```

You will also need to install the [Vue CLI](https://cli.vuejs.org/)

```
npm install -g @vue/cli
```

### Installing

1. Clone the repository.
2. Enter the created directory.
3. Execute the following command to install the projects dependencies:

```
yarn install
```
4. Copy the `.env.template` file and name it `.env.local` or `.env`. Make sure to apply the correct settings inside the created file.

### Running
To start a development server, run:

```
yarn serve
```

This should start an instance of the server on a given port.

### Building
To compile the production build, run:

```
yarn build --mode production
```

### Code Style and formatting
This project relies heavily on [ESLint][eslint] and [Prettier][prettier] to enforce consistent 
formatting and coding styles. A [pre-commit-hook][precommit] runs every time you try to commit,
linting and reformatting the staged files. This allows you to basically forget about formatting,
prettier is much better at it anyway.

> Tip: you can setup your editor to run eslint --fix on save, to see the 
> formatting changes sooner. This allows you to write code like an absolute monster, 
> all on one line even, hit save, and watch the magic happen.
 
Some of the eslint rules may seem a bit harsh. If there is one that particularly annoys you,
please open an issue to discuss it.

### Styling
We try to follow the [BEM conventions](http://getbem.com/naming/) for naming css classes.

Inline styling should be avoided at all cost!
