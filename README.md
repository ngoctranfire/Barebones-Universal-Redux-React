# Isomorphic React App (Server Side Rendering Included)
### Basic Command to get Started
1. npm run dev
    a. This command runs index.js, which starts the webpack-dev-server, express server side rendering. Notice that it has to register babel so that we can call on server.js, since server.js
has a jsx syntax, we need the babel-register in order to allow `src/server.js` to utilize it.

### This app is a basic setup that enables the following components for your isomorphic / universal React App.
* Redux -> it's a state container that can help simplify your app as the logic gets a lot more complicated.
* React -> Just do a google search for React.js and see what this is and how powerful it can really be. 
* ReactDOM -> This enables us to have a virtual DOM on the node.js server side, that allows us to then render the html back to the client.
* Webpack -> We use webpack to do a lot of magic for us, for instance, allowing us to use react-hot-loader, as well as building our production project.
* React-Hot-Loader -> This kind of ties in with Webpack. We enable the hot loader so that changes get updated immediately as we make changes in our own code. If you want to try it,
go to src/common/components/ComponentCounter.js and add some text to the stateless Counter Component. It will show up immediately to the browser.
* Express -> We actually proxy the webpack dev server to express. This way we can have all the amazing features of the webpack-dev-server, such as enabling us to hot-reload, but also
utilize Express and apply other middleware that we want to our application.

### App Structure
+ root
    + src
        - client
        - common
        - server
    + test
        - TODO: Some tests should be included and a sample template so we can advise people on how to write tests. That would be pretty nice.
    + webpack 
        - dev configurations
        - prod configurations
        - isomorphic tools????/ Not sure what to do with this one yet
        - webpack-dev-server This is start the webpack dev server.
    + .babelrc
        - This is crucial to making sure that our code, which uses babel has the correct configurations and we get to try out all the latest ES6/ES7 features
    + .eslintrc
        - This is lint for our project.