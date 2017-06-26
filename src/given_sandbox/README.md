# hack4tk Sandbox Application
> Welcome to the Sandbox Application

## Installation

* Clone the repository to your local environment

        git clone git@hack4tk.westeurope.cloudapp.azure.com:agents/base.git

* Make sure your have node.js and npm installed. (https://nodejs.org/en/download/)
* `npm install` to install all dependencies (this can take a few minutes)

## Development

* `npm start` to build the app
* in a second terminal window use `npm watch` to build the app incrementally (much faster than the intial build via `npm start`) 

* If you're writing less-code you need to compile it to CSS. 
    If you have gulp installed you can run `gulp less:watch` for watching or `gulp less:all` for compiling all *.less files at once.
    If you dont have gulp installed you need to run `./node_modules/.bin/gulp less:watch`

## How To

### Linking

* Linking happens with the link-components like `internal-link.component` or `external-link.component` (or other). The target of the link has to be the same as the ID of the page defined in the mock data of the page. `
* The ID of the startpage is `mock-content/startpage` which means that the following mock-data will result in a link to the startpage

        {
          "className": "link-internal",
          "element": {
            "link": "mock-content/startpage",
            "text": "Home",
            "follow": "true",
            "target": "_self"
          }
        }
      
### Content

Content comes from mock-data in this sandbox. Please check out the directory `src/mock/content`.
To create a new page, you need a few fields for the page itself, and multiple (or one) elements. 
The easiest way is to copy the `index.json` and edit it as you like.
Most of these elements have been created already. Feel free to use (or adapt) those.

There is a lot of json-content provided in the content-project. 
If you want to use a component which exists already, you can copy & adapt the json for it.

### Create Component

1. Create Controller (`*.component.ts`), Template (`*.component.html`) and, if necessary, Style-File (`*.less*`)
1. The component has to be registered for auto-resolving using `component-registry.ts`
1. Add it to the angular-components so it can get bootstrapped by angular in `editorial-components.const.ts`
