# TDD_BowerBackboneJasminePhantomjsKarma
An introduction to TDD style in a Backbone applcation project
==================

Building a Backbone application from grounds up using TDD
....with Jasmine !

####Introduction
This page will introduce you to common project layouts and best practice when developing an application from grounds up. In this example, we'll
use the Test Driven Development approach, which basically enforces you to write tests firsts before coding your app modules. The workflow
described in this wiki article can be applied to all your Backbone applications which need a package manager to handle your Javascript libraries
(Bower). For the TDD approach we'll use Jasmine as our unt testing framework. Therefore, our project implementation steps look like this:
#####1) Create a project layout directory structure
#####2) Define the required Javascript libraries/frameworks and put them in a bower.json config file.
#####3) Create a basic testrunner html file for running your unit tests
#####4) Write your first test against the project's namespace and watch them fail.
#####5) Define the project's namespace in your first app file and make your tests pass.
#####6) Write your first Backbone model test and watch them fail.
#####7) Write your Backbone model file and see your tests succeed.
#####8) Do the same with collections
#####9) Our first Backbone view tests
#####10) The Backbone view needs a template
#####11) Migrate the project for running under Karma
You may have noticed that the steps above don't tell you much about the actual application we have in mind. Thats because we initially focus on
the Backbone boilerplate code and development patterns, as well as the common/best practice of Jasmine unit testing. All of this does not depend
much on the application's business logic. Nevertheless, the first details on the "Notes" example application which we cover in this article can be
found in chapter 6.

####Prerequisites
Install nodejs from http://nodejs.org/

Install bower globally (````npm install -g bower````)

1) Create a project layout directory structure

2) Package management with Bower: Create the config file ```bower.json```

Bowers main configuration file is called bower.json. Make sure you put the bower.json file in the project's root folder as in the example
project layout above. The two most important attributes in bower.json are dependencies and devDependencies. As long as you are in the
development process, you probably need both dependencies and devDependencies resolved. This means, if you do a "bower install",
bower will copy the corresponding Git repositories into the bower-components folder which is created if it doesn't already exist in your project
folder. If you want Bower to use another directory to store the dependant javascript libraries to, just create a .bowerrc file and specify a directory.
If your final module will be used by another development team, make sure you put all testing and other non-app libraries or frameworks into the
devDependencies section. The modules listed in there will not be installed when you enter the bower install command with the -p or --production
parameter. Examples:

````bower install -p  // will install only the modules listed under dependendies````

````bower install  // will install all modules listed under both dependencies and devDependencies````
