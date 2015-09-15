An introduction to TDD style in a Backbone application project
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

####Tutorial
#####1) Create a project layout directory structure

#####2) Package management with Bower: Create the config file ```bower.json```

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

Note: The ignore property in the bower.json file does not ignore files when you do a bower install. Installing bower components with "bower install" will unanonymously copy the whole Git repository of this component. The ignore property comes into play if you commit your code to Git. This is the time when your ignore settings are evaluated.

#####3) Create a basic testrunner html file for running your unit tests

In a Single Page Application (SPA) you usually have only one html file which is called index.html. This file loads all your Javascript and CSS files for running your application. It does not contain any unit testing modules like Jasmine, Sinon, Karma, PhantomJS and so on. Since testing happens independantly from running your application, a seperate .html file is necessary which specifies not only your application modules but also your testing frameworks and test (spec) files. In our example, we put this html file into the test subdirectory of our project and call it test.html.
````<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Backbone Testing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <!-- Distribution libraries -->
    <!-- Application modules - your javascript app files to be included
    here-->
    <!-- DevDependencies for testing -->
    <link rel="shortcut icon" type="image/png" href="../bower_components/jasmine/images/jasmine_favicon.png">
    <link rel="stylesheet" href="../bower_components/jasmine/lib/jasmine-core/jasmine.css"/>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/boot.js"></script>
    <!-- Spec files - javascript test files to be added here-->
    <script src="js/spec/namespace.spec.js"></script>
</head>
<body>
</body>
</html>````

#####4) Write your first test against the project's namespace and watch them fail
This simple test makes sure that you defined your javascript namespace in the global namespace. The namespace we want to use in this tutorial is "App" for our Backbone classes and "app" for object instancies. In case any other javascript module/library that we use employs variables with the same name, the following code will merge our namespace with it, hopefully not breaking anything in the foreign module's functionality. In most cases, these two variables are for our exclusive use, so they are undefined at the beginning. As you can see, we already reserve
sub-namespaces for our Backbone components; 
Model
Collection
View
Router
